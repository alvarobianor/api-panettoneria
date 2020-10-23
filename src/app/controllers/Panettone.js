const Panettone = require('../models/Panettone');

class PanettoneController {
  async store(req, res) {
    const { name, weight, brand, price, about } = req.body;
    const { filename } = req.file;
    const exists = await Panettone.findOne({ name });

    if (exists) {
      return res.status(400).json({ message: 'Panettone already exists' });
    }
    const panettone = await Panettone.create({
      urlImg: filename,
      name,
      brand,
      weight,
      price,
      about,
    });

    await panettone.save();

    return res.status(201).json(panettone);
  }

  async index(req, res) {
    const { filter } = req.query;

    if (filter === 'nenhum') {
      const panettones = await Panettone.find(
        {},
        { name: 1, brand: 1, urlImg: 1 }
      );

      return res.status(200).json(panettones);
    }
    const panettones = await Panettone.find(
      { brand: filter },
      { name: 1, brand: 1, urlImg: 1 }
    );

    return res.status(200).json(panettones);
  }

  async brands(req, res) {
    const brands = await Panettone.find({}, { brand: 1 });
    const uniqueArray = [];
    brands.forEach(({ brand }) => {
      if (uniqueArray.indexOf(brand) >= 0) {
        return;
      }
      uniqueArray.push(brand);
    });

    return res.status(200).json({ brands: uniqueArray });
  }

  async show(req, res) {
    const { name } = req.params;

    const panettone = await Panettone.findOne(
      { name },
      { weight: 1, price: 1, about: 1, urlImg: 1, brand: 1 }
    );

    return res.status(200).json(panettone);
  }
}

module.exports = new PanettoneController();
