// const Karyawan = require("../models/Karyawan");
const {Sequelize, Op, where} = require("sequelize");
const karyawanModel = require("../models/Karyawan");

module.exports = {
  create: async (req, res) => {
    const { nama, id_karyawan, email, divisi, nomor_hp, nik, alamat, npwp, gdarah } = req.body;
    if (!nama || !id_karyawan || !divisi || !nomor_hp || !nik || !alamat || !npwp || !gdarah) {
      return res.render('register', { error: 'Please fill all fields' });
    }
    await karyawanModel.create({ nama, email, id_karyawan, divisi, nomor_hp, nik, alamat, npwp, gdarah });
    // console.log(req.body.email)
    // await User.create({name, email, password: bcrypt.hashSync(password, 8)});

    res.redirect('/dashboard');
  },
  read: async (req, res) => {
    // const karyawans = await karyawanModel.findAll(
    //   {
    //     where : {
    //       delete_at : {
    //         [Op.ne]: null
    //       }
    //     }
    //   }
    // );

    const karyawans = await karyawanModel.sequelize.query("select * from karyawans where delete_at is null",
      { type: karyawanModel.sequelize.QueryTypes.SELECT }
    )

    console.log(karyawans)

    res.render('view', { karyawans });
  },
  update: async (req, res) => {
    console.log(req);
    const karyawans = await karyawanModel.findOne(
      { where: { id: req.params.id } }
    )
    console.log(karyawans);
    res.render('edit', { karyawans })

  },
  updateDo: async (req, res) => {
    console.log(req);
    await karyawanModel.update(
      {
        nama: req.body.name,
        id_karyawan: req.body.id_karyawan
        , email: req.body.email
        , divisi: req.body.divisi
        , nomor_hp: req.body.nomor_hp
        , nik: req.body.nik
        , alamat: req.body.alamat
        , npwp: req.body.npwp
        , gdarah: req.body.gdarah

      },
      { where: { id: req.body.id } }
    )
    // });
    res.redirect('../read')

  },
  deleteDo: async (req, res) => {
    const dt = new Date();
    var dateTime = ""
    dateTime += dt.getFullYear() + "-"
    dateTime += dt.getMonth().toString().padStart(2, "0") + "-"
    dateTime += dt.getDate().toString().padStart(2, "0") + " "
    dateTime += dt.getHours().toString().padStart(2, "0") + ":"
    dateTime += dt.getMinutes().toString().padStart(2, "0") + ":"
    dateTime += dt.getSeconds().toString().padStart(2, "0") + ""

    console.log(dateTime)

    await karyawanModel.update(
      {
        delete_at: dateTime
      },
      { where: { id: req.body.id }}
    ) 
    // })
    res.redirect('../read')
  },
  
  searchDo: async(req,res)=>{
    console.log(req);
    const karyawans = await karyawanModel.findOne(
      { where: { id: req.params.id } }
    )
    console.log(karyawans);
    res.render('datafind', { karyawans })
  }
}
