const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb+srv://maityraktim90:Abc123@cluster0.3dc363l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('nopass', 10);

  const admin = new User({
    name: 'Taj Mahal Palace',
    email: 'tajpalace@exploremore.com',
    password: hashedPassword,
    role: 'hotel'
  });

  await admin.save();
  console.log('✅ Hotel Admin created');
  mongoose.disconnect();
}

createAdmin();
