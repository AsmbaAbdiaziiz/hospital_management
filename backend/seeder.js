require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data (Optional, handle with care)
    // await User.deleteMany();
    // await Doctor.deleteMany();

    // Create Default Admin
    const adminExists = await User.findOne({ email: 'admin@hams.so' });
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: 'admin@hams.so',
        phone: '0610000000',
        password: 'password123',
        role: 'admin',
      });
      console.log('✅ Default Admin created: admin@hams.so / password123');
    } else {
      console.log('ℹ️ Admin already exists.');
    }

    // Create Sample Doctor
    const doctorExists = await Doctor.findOne({ name: 'Dr. Sahra Ahmed' });
    if (!doctorExists) {
      await Doctor.create({
        name: 'Dr. Sahra Ahmed',
        specialization: 'Cardiologist',
        phone: '0615551122',
        email: 'sahra@hams.so',
        availability: ['Monday', 'Wednesday', 'Friday'],
        bio: 'Expert in heart health with 10 years experience.',
      });
      console.log('✅ Sample Doctor created.');
    }

    console.log('🚀 Seeding complete!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
