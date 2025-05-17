const prismaRev = require('../utils/prisma');

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await prismaRev.review.findMany({ include: { product: true, customer: true } });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

exports.getReviewById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const review = await prismaRev.review.findUnique({
      where: { review_id: id },
      include: { product: true, customer: true }
    });
    if (!review) return res.status(404).json({ message: 'Not found' });
    res.json(review);
  } catch (err) {
    next(err);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const data = req.body; // expect rating, comment, product_id, customer_id
    const review = await prismaRev.review.create({ data });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

exports.updateReview = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const review = await prismaRev.review.update({ where: { review_id: id }, data: req.body });
    res.json(review);
  } catch (err) {
    next(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prismaRev.review.delete({ where: { review_id: id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
