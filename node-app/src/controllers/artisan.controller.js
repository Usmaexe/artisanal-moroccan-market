const prisma = require('../utils/prisma');

exports.getAllArtisans = async (req, res, next) => {
  try {
    const artisans = await prisma.artisan.findMany({
      include: { products: true }
    });
    res.json(artisans);
  } catch (err) {
    next(err);
  }
};

exports.getArtisanById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const artisan = await prisma.artisan.findUnique({
      where: { artisan_id: id },
      include: { products: true }
    });
    if (!artisan) return res.status(404).json({ message: 'Not found' });
    res.json(artisan);
  } catch (err) {
    next(err);
  }
};

exports.createArtisan = async (req, res, next) => {
  try {
    const { name, bio, image_url, location } = req.body;
    const artisan = await prisma.artisan.create({
      data: { name, bio, image_url, location }
    });
    res.status(201).json(artisan);
  } catch (err) {
    next(err);
  }
};

exports.updateArtisan = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const artisan = await prisma.artisan.update({
      where: { artisan_id: id },
      data: req.body
    });
    res.json(artisan);
  } catch (err) {
    next(err);
  }
};

exports.deleteArtisan = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.artisan.delete({ where: { artisan_id: id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};