const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');

dotenv.config();

const categories = [
  { name: 'صفحۂ اول', slug: 'first-page' },
  { name: 'تازہ ترین', slug: 'latest-news' },
  { name: 'پاکستان', slug: 'pakistan' },
  { name: 'بین الاقوامی', slug: 'international' },
  { name: 'کھیل', slug: 'sports' },
  { name: 'شوبز', slug: 'showbiz' },
  { name: 'کاروبار', slug: 'business' },
  { name: 'صحت', slug: 'health' },
  { name: 'سائنس اور ٹیکنالوجی', slug: 'science-technology' },
  { name: 'دلچسپ اور عجیب', slug: 'interesting-and-weird' },
  { name: 'زیرو پوائنٹ', slug: 'zeropoint' },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await Category.deleteMany(); // Optional
    await Category.insertMany(categories);
    console.log('Categories inserted successfully');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    mongoose.disconnect();
  });
