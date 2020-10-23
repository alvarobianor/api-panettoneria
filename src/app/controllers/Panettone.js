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

  async show(req, res) {
    const { filter } = req.query;

    if (filter === 'nunhum') {
      return await Panettone.find();
    }
    const panettones = await Panettone.find(
      { brand: filter },
      { urlImg: 1, name: 1, brand: 1 }
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

    // console.log(uniqueArray);

    return res.status(200).json({ brands: uniqueArray });
  }
}

module.exports = new PanettoneController();
