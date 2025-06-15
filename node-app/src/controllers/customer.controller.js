const prisma = require('../utils/prisma');

exports.createCustomer = async (req, res, next) => {
  try {
    const { email, password_hash, name, phone, street, city, state, postalCode, country, image_url } = req.body;
    const customer = await prisma.customer.create({
      data: {
        email,
        password_hash,
        name,
        phone,
        street,
        city,
        state,
        postalCode,
        country,
        image_url
      }
    });
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
};

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

exports.getCustomerById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const customer = await prisma.customer.findUnique({ where: { customer_id: id } });
    if (!customer) return res.status(404).json({ message: 'Not found' });
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

exports.updateCustomer = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const { name, phone, street, city, state, postalCode, country, image_url } = req.body;
    const updated = await prisma.customer.update({
      where: { customer_id: id },
      data: {
        name,
        phone,
        street,
        city,
        state,
        postalCode,
        country,
        image_url
      }
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.customer.delete({ where: { customer_id: id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
