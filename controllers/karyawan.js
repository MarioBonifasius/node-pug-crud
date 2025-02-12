// const Karyawan = require("../models/Karyawan");
const { Sequelize, Op, where } = require("sequelize");
const karyawanModel = require("../models/Karyawan");
var fs = require('fs').promises;
const path = require('path');

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
      { where: { id: req.body.id } }
    )
    // })
    res.redirect('../read')
  },

  searchDo: async (req, res) => {
    console.log(req);
    const karyawans = await karyawanModel.findOne(
      { where: { id: req.params.id } }
    )
    console.log(karyawans);
    res.render('datafind', { karyawans })
  },
  apiTest: async (req, res) => {
    const karyawans = [
      {
        nama: "wawan",
        email: "sarapban"
      },
      {
        nama: "bondan",
        email: "sarapban"
      },
      {
        nama: "miftah",
        email: "sarapban"
      },
      {
        nama: "umar",
        email: "sarapban"
      }
    ]

    // const karyawans = {
    //   nama: "Saripudin",
    //   email: "sarapbanget@gmail.com",
    //   phone : [{
    //     operator: "XL",
    //     number: "08123456789"
    //   },
    //   {
    //     operator: "Telkomsel",
    //     number: "08113456789"
    //   },
    //   {
    //     operator: "Indosat",
    //     number: "08563456789"
    //   }]
    // }
    res.send(karyawans)
  },


  apiImage: async (req, res) => {
    // read binary data
    // var bitmap = fs.readFileSync(file);

    // // convert binary data to base64 encoded string
    // return new Buffer(bitmap).toString('base64');

    // const bitmap = fs.readFileSync('./public/labeled_images/bondan/1.png', { encoding: 'base64' });
    // res.send(bitmap)

    var bitmap
    var image1 = '../public/labeled_images/'+req.params.folder+'/'+req.params.sequence;
    // bitmap = fs.readFileSync(image1, { encoding: 'base64' });

    // const data = await fs.readFile(image1);
    // bitmap = "data:image/png;base64, "+Buffer.from(data, 'binary').toString('base64');

    // res.


    // // // var base64Img = require('base64-img');
    // var base64Img = fs.readFileSync(image1);
    // // var imageData1 = base64Img.base64Sync(image1);
    // var base64Data = base64Img.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    // var bitmap = Buffer.from(base64Data, 'base64');
    // // var bitmap = "data:image/jpeg;base64,"+Buffer.from(image1, 'base64');

    res.sendFile(path.join(__dirname, image1));

    // res.writeHead(200, {
    //   'Content-Type': 'image/png',
    //   'Content-Length': bitmap.length
    // });
    // res.end(bitmap);

    // const stream = Buffer.from(bitmap)
    // res.send();
    // res.writeHead(200, {
    //   'Content-Type': 'image/png',
    //   'Content-Length': stream.length
    // });

    // console.log(bitmap)
    // res.end(stream);

  },
}
