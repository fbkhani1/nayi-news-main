const Category = require('../models/Category');

const urduCategories = [
  "صفحۂ اول", "تازہ ترین", "پاکستان", "بین الاقوامی", "کھیل", "شوبز", "کاروبار", "صحت",
  "سائنس اور ٹیکنالوجی", "دلچسپ و عجیب", "زیرو پوائنٹ"
];

const initializeCategories = async () => {
  for (const name of urduCategories) {
    const exists = await Category.findOne({ name });
    if (!exists) {
      await new Category({ name }).save();
    }
  }
};

module.exports = initializeCategories;
