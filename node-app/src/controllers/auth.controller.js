const prismaAuth = require('../utils/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, SALT_ROUNDS, JWT_EXPIRES_IN } = require('../utils/constants');

// Enhanced debug function
function debugAuth(message, data = {}) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] AUTH_DEBUG: ${message}`, JSON.stringify(data, null, 2));
}

// Register function
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Normalize and hash password
    const trimmedName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const passwordHash = await bcrypt.hash(password.trim(), SALT_ROUNDS);

    if (role === 'artisan') {
      // Artisan registration
      const artisan = await prismaAuth.artisan.create({
        data: {
          name: trimmedName,
          email: cleanEmail,
          password_hash: passwordHash,
          bio: 'New artisan',
          image_url: '/images/artisans/default.jpg',
          location: 'Unknown',
        },
      });

      return res.status(201).json({ id: artisan.artisan_id, email: artisan.email, role: 'artisan' });
    } else {
      // Customer registration
      const customer = await prismaAuth.customer.create({
        data: {
          name: trimmedName,
          email: cleanEmail,
          password_hash: passwordHash,
        },
      });

      return res.status(201).json({ id: customer.customer_id, email: customer.email, role: 'customer' });
    }
  } catch (error) {
    console.error('Registration error:', error);

    if (error.code === 'P2002') {
      // Unique constraint failed (email already exists)
      return res.status(400).json({ message: 'Email already exists' });
    }

    return res.status(500).json({ message: 'Registration failed' });
  }
};

// Login function (complete implementation with enhanced debugging)
// Create Admin User
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Normalize and hash password
    const trimmedName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const passwordHash = await bcrypt.hash(password.trim(), SALT_ROUNDS);

    // Check if admin already exists
    const existingAdmin = await prismaAuth.admin.findUnique({
      where: { email: cleanEmail }
    });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Create admin user
    const admin = await prismaAuth.admin.create({
      data: {
        name: trimmedName,
        email: cleanEmail,
        password_hash: passwordHash
      }
    });

    return res.status(201).json({ 
      message: 'Admin created successfully',
      admin: {
        id: admin.admin_id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Admin creation error:', error);
    return res.status(500).json({ message: 'Admin creation failed' });
  }
};

// Modify the login function to also check for admin users
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    debugAuth('Raw login data received', { 
      email: email, 
      password: password ? '[PASSWORD PROVIDED]' : '[NO PASSWORD]',
      emailLength: email ? email.length : 0,
      passwordLength: password ? password.length : 0
    });
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    debugAuth('Cleaned login data', { 
      cleanEmail: cleanEmail,
      cleanEmailLength: cleanEmail.length,
      cleanPasswordLength: cleanPassword.length,
      originalEmail: email,
      emailsMatch: email === cleanEmail
    });

    // First check if user is an admin
    debugAuth('Searching for admin user', { email: cleanEmail });
    
    let user = await prismaAuth.admin.findUnique({
      where: { email: cleanEmail }
    });
    
    let userRole = 'admin';
    
    if (user) {
      debugAuth('Admin user found', { 
        email: cleanEmail,
        userId: user.admin_id
      });
    } else {
      // Check if user exists in Artisan table
      debugAuth('Searching for artisan user', { email: cleanEmail });
      
      user = await prismaAuth.artisan.findUnique({
        where: { email: cleanEmail }
      });
      
      userRole = 'artisan';
      
      debugAuth('Artisan search result', { 
        found: !!user,
        userEmail: user ? user.email : null,
        userId: user ? user.artisan_id : null,
        searchedEmail: cleanEmail,
        exactMatch: user ? (user.email === cleanEmail) : false
      });
      
      // If not found in Artisan table, check Customer table
      if (!user) {
        debugAuth('Searching for customer user', { email: cleanEmail });
        
        user = await prismaAuth.customer.findUnique({
          where: { email: cleanEmail }
        });
        userRole = 'customer';
        
        debugAuth('Customer search result', { 
          found: !!user,
          userEmail: user ? user.email : null,
          userId: user ? user.customer_id : null
        });
      }
    }

    // If user not found in any table
    if (!user) {
      debugAuth('User not found anywhere', { 
        searchedEmail: cleanEmail
      });
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    debugAuth('User found successfully', { 
      email: cleanEmail, 
      role: userRole,
      userId: userRole === 'admin' ? user.admin_id : 
              userRole === 'artisan' ? user.artisan_id : user.customer_id,
      userName: user.name
    });

    // Verify password
    debugAuth('Starting password verification', { 
      email: cleanEmail,
      passwordProvided: !!cleanPassword,
      hashExists: !!user.password_hash,
      hashLength: user.password_hash ? user.password_hash.length : 0
    });

    const isPasswordValid = await bcrypt.compare(cleanPassword, user.password_hash);
    
    debugAuth('Password verification result', { 
      email: cleanEmail,
      isValid: isPasswordValid,
      providedPassword: cleanPassword,
      storedHash: user.password_hash.substring(0, 20) + '...' // Show first 20 chars of hash for debugging
    });
    
    if (!isPasswordValid) {
      debugAuth('Invalid password', { email: cleanEmail });
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    debugAuth('Password verified successfully', { email: cleanEmail });

    // Generate JWT token
    const userId = userRole === 'admin' ? user.admin_id : 
                  userRole === 'artisan' ? user.artisan_id : user.customer_id;
                  
    const token = jwt.sign(
      { 
        id: userId,
        email: user.email,
        role: userRole 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    debugAuth('Login successful', { 
      email: cleanEmail, 
      role: userRole,
      userId: userId
    });

    // Return success response with user data based on role
    const userData = {
      id: userId,
      name: user.name,
      email: user.email,
      role: userRole
    };
    
    // Add role-specific data
    if (userRole === 'artisan') {
      userData.bio = user.bio;
      userData.image_url = user.image_url;
      userData.location = user.location;
    }

    // Return success response
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    debugAuth('Login error', { error: error.message, stack: error.stack });
    return res.status(500).json({ message: 'Login failed' });
  }
};