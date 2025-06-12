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
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hash = await bcrypt.hash(password.trim(), SALT_ROUNDS);
    const cleanEmail = email.trim().toLowerCase();

    if (role === 'artisan') {
      const artisan = await prismaAuth.artisan.create({
        data: {
          name: name.trim(),
          email: cleanEmail,
          password_hash: hash,
          bio: 'New artisan',
          image_url: '/images/artisans/default.jpg',
          location: 'Unknown'
        }
      });
      return res.status(201).json({ 
        id: artisan.artisan_id,
        email: artisan.email,
        role: 'artisan'
      });
    } else {
      // Customer registration logic here
    }
  } catch (error) {
    debugAuth('Registration error', { error: error.message });
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    return res.status(500).json({ message: 'Registration failed' });
  }
};

// Login function (complete implementation with enhanced debugging)
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

    // Check if user exists in Artisan table
    debugAuth('Searching for artisan user', { email: cleanEmail });
    
    // First, let's see all artisans in the database
    const allArtisans = await prismaAuth.artisan.findMany({
      select: { email: true, artisan_id: true, name: true }
    });
    debugAuth('All artisans in database', { artisans: allArtisans });
    
    let user = await prismaAuth.artisan.findUnique({
      where: { email: cleanEmail }
    });
    
    let userRole = 'artisan';
    
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
      
      const allCustomers = await prismaAuth.customer.findMany({
        select: { email: true, customer_id: true, name: true }
      });
      debugAuth('All customers in database', { customers: allCustomers });
      
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

    // If user not found in either table
    if (!user) {
      debugAuth('User not found anywhere', { 
        searchedEmail: cleanEmail,
        totalArtisans: allArtisans.length,
        totalCustomers: allArtisans.length 
      });
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    debugAuth('User found successfully', { 
      email: cleanEmail, 
      role: userRole,
      userId: userRole === 'artisan' ? user.artisan_id : user.customer_id,
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
    const token = jwt.sign(
      { 
        id: userRole === 'artisan' ? user.artisan_id : user.customer_id,
        email: user.email,
        role: userRole 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    debugAuth('Login successful', { 
      email: cleanEmail, 
      role: userRole,
      userId: userRole === 'artisan' ? user.artisan_id : user.customer_id 
    });

    // Return success response
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: userRole === 'artisan' ? user.artisan_id : user.customer_id,
        name: user.name,
        email: user.email,
        role: userRole,
        ...(userRole === 'artisan' && {
          bio: user.bio,
          image_url: user.image_url,
          location: user.location
        })
      }
    });

  } catch (error) {
    debugAuth('Login error', { error: error.message, stack: error.stack });
    return res.status(500).json({ message: 'Login failed' });
  }
};