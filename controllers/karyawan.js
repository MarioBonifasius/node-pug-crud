// const Karyawan = require("../models/Karyawan");
const karyawanModel = require("../models/Karyawan");

module.exports = {
  create: async(req, res) => {
    const { nama, id_karyawan,email, divisi,nomor_hp,nik,alamat,npwp,gdarah} = req.body;
    if(!nama || !id_karyawan || !divisi|| !nomor_hp || !nik|| !alamat|| !npwp || !gdarah) {
        return res.render('register', { error: 'Please fill all fields' });
      }
    await karyawanModel.create({nama, email,id_karyawan, divisi,nomor_hp,nik,alamat,npwp,gdarah});
    // console.log(req.body.email)
    // await User.create({name, email, password: bcrypt.hashSync(password, 8)});
          
    res.redirect('/dashboard');
  },
  read: async(req, res) => {
    const karyawans = await karyawanModel.findAll();
    // console.log(karyawans.every(karyawans => karyawans instanceof karyawanModel)); // true
    // console.log('All karyawans:', JSON.stringify(karyawans, null, 2));
    res.render('view', {karyawans});
  },
  update: (req, res) => {
    
  },
  delete: (req, res) => {
    
  },
}