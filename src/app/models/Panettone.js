const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const PanettoneSchema = new mongoose.Schema(
  {
    urlImg: { type: String },

    name: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },

    about: { type: String, required: true },

    // read: { type: Boolean, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);
PanettoneSchema.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator',
  message: 'Error, expected {PATH} to be unique.',
});

PanettoneSchema.virtual('url_img').get(function () {
  return `http://localhost:${process.env.PORT}/files/${this.urlImg}`;
});

module.exports = mongoose.model('Panettone', PanettoneSchema);
