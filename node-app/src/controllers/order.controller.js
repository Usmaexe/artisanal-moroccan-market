const prismaOrder = require('../utils/prisma');

exports.getAllOrders = async (req, res, next) => {
  try {
    const { customerId } = req.query;
    
    // If customerId is provided, filter orders by customer_id
    const where = customerId ? { customer_id: parseInt(customerId, 10) } : {};
    
    const orders = await prismaOrder.order.findMany({ 
      where,
      include: { items: true },
      orderBy: { created_at: 'desc' } // Sort by newest first
    });
    
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const order = await prismaOrder.order.findUnique({
      where: { order_id: id },
      include: { items: { include: { product: true } } }
    });
    if (!order) return res.status(404).json({ message: 'Not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { customer_id, items, total } = req.body;
    
    // Transform items to match the OrderItem schema
    const transformedItems = items.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price // Include the price field as it's now required in the schema
    }));
    
    const order = await prismaOrder.order.create({
      data: {
        customer_id,
        total,
        items: { create: transformedItems }
      },
      include: { items: true }
    });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const order = await prismaOrder.order.update({
      where: { order_id: id },
      data: req.body
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prismaOrder.order.delete({ where: { order_id: id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};