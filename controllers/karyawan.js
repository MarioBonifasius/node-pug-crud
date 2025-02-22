// const Karyawan = require("../models/Karyawan");
const { Sequelize, Op, where } = require("sequelize");
const karyawanModel = require("../models/Karyawan");
const karyawanLog = require("../models/log");
const karyawanLogOut = require("../models/logout");
var fs = require('fs');
var fsp = require('fs').promises;
const path = require('path');
const { type } = require("os");
const mime = require('mime'); // npm install mime
const { count } = require("console");

module.exports = {
  create: async (req, res) => {
    const { nama, id_karyawan, email, divisi, nomor_hp, nik, alamat, npwp, gdarah, foto1, foto2, foto3 } = req.body;
    if (!nama || !id_karyawan || !divisi || !nomor_hp || !nik || !alamat || !npwp || !gdarah) {
      return res.render('register', { error: 'Please fill all fields' });
    }


    await karyawanModel.create({ nama, email, id_karyawan, divisi, nomor_hp, nik, alamat, npwp, gdarah });
    var folderName = nama
    await fsp.mkdir('./public/labeled_images/' + folderName, { recursive: true });

    var image = req.files.foto1;
    console.log(image);
    var extention = image.mimetype.replace('image/', '');
    image.mv('./public/labeled_images/' + folderName + '/1.' + extention);

    image = req.files.foto2;
    console.log(image);
    extention = image.mimetype.replace('image/', '');
    image.mv('./public/labeled_images/' + folderName + '/2.' + extention);

    var image = req.files.foto3;
    console.log(image);
    extention = image.mimetype.replace('image/', '');
    image.mv('./public/labeled_images/' + folderName + '/3.' + extention);

    res.redirect('/dashboard');
  },

  read: async (req, res) => {
    const karyawans = await karyawanModel.sequelize.query("select * from karyawans where delete_at is null",
      { type: karyawanModel.sequelize.QueryTypes.SELECT }
    )

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
    const karyawans = await karyawanModel.sequelize.query("select * from karyawans where delete_at is null",
      { type: karyawanModel.sequelize.QueryTypes.SELECT }
    )
    res.send(karyawans)
  },


  apiImage: async (req, res) => {
    var imagePath = '../public/labeled_images/' + req.params.folder + '/' + req.params.sequence;
    var imageFile = path.join(__dirname, imagePath)
    console.log(imageFile);

    var extention = '.png';
    if (!fs.existsSync(imageFile + extention)) {
      console.log('file not found :: ' + imageFile + extention);
      extention = '.jpg';
      if (!fs.existsSync(imageFile + extention)) {
        console.log('file not found :: ' + imageFile + extention);
        extention = '.jpeg';
        if (!fs.existsSync(imageFile + extention)) {
          console.log('file not found :: ' + imageFile + extention);
        };
      }
    }
    res.sendFile(imageFile + extention);
  },

  apiGetNewImage: async (req, res) => {
    var personName = 'bondan';
    var imagenum = "1";

    var imagePath = '../public/labeled_images/' + personName + '/' + imagenum;
    var imageFile = path.join(__dirname, imagePath)
    console.log(imageFile);

    var extention = '.png';
    if (!fs.existsSync(imageFile + extention)) {
      console.log('file not found :: ' + imageFile + extention);
      extention = '.jpg';
      if (!fs.existsSync(imageFile + extention)) {
        console.log('file not found :: ' + imageFile + extention);
        extention = '.jpeg';
        if (!fs.existsSync(imageFile + extention)) {
          console.log('file not found :: ' + imageFile + extention);
        };
      }
    }

    var base64File;
    const filemime = extention; //mime.getType(imageFile + extention);
    const filepath = path.resolve(imageFile + extention);

    // read binary data
    var bitmap = fs.readFileSync(filepath);
    base64File = new Buffer(bitmap).toString('base64');
    console.log(base64File);

    var response = {
      type: extention,
      name: personName,
      sequence: imagenum,
      image: base64File
    }
    res.send(response);
  },

  apiAbsentLog: async (req, res) => {
    console.log(req.body);
    const dt = new Date();
    var dateTime = ""
    dateTime += dt.getFullYear() + "-"
    dateTime += dt.getMonth().toString().padStart(2, "0") + "-"
    dateTime += dt.getDate().toString().padStart(2, "0")
    try {
      await karyawanLog.create({ nama: req.body.name, tanggal: dateTime });
      res.send("absen masuk berhasil")
    } catch (error) {
      res.send("sudah absen masuk")
    }
  },


  apiAbsentLogOut: async (req, res) => {
    // const log = await karyawanLog.sequelize.query("select * from logs where nama ='"+req.body.nama+"'and logout_time is null and date(createdAt) = date(now()) order by date(createdAt) desc limit 1",
    //   { type: karyawanLog.sequelize.QueryTypes.SELECT }
    // )
    // res.send(log)

    console.log(req.body);

    // inisialisasi tanggal hari ini
    const dt = new Date();
    var dateTime = ""
    dateTime += dt.getFullYear() + "-"
    dateTime += dt.getMonth().toString().padStart(2, "0") + "-"
    dateTime += dt.getDate().toString().padStart(2, "0")

    var responseToClient = "";

    try {
      // cari data absen masuk yang jam logout nya null
      result = await karyawanLog.sequelize.query("select * from logs where nama ='" + req.body.name + "'and logout_time is null and date(createdAt) = date(now())",
        { type: karyawanLog.sequelize.QueryTypes.SELECT }
      )

      // jika tidak ada data absen masuk yang jam logout nya null
      if (result.length == 0) {
        // kirim response bahwa sudah absen keluar 
        responseToClient = "sudah absen keluar / belum absen masuk";
      } else {

        // jika ada data absen masuk yang jam logout nya null
        // maka update jam logout nya dengan jam saat ini
        result = await karyawanLog.sequelize.query("update logs set logout_time = now() where nama ='" + req.body.name + "'and logout_time is null and date(createdAt) = date(now())",
          { type: karyawanLog.sequelize.QueryTypes.UPDATE }
        )
        // kirim response bahwa absen keluar berhasil
        responseToClient = "absen keluar berhasil";

      }
    } catch (error) {
      // jika proses dalam blok try diatas gagal, maka kirim response bahwa absen keluar gagal
      responseToClient = "absen keluar gagal";
    }

    // kirim response ke client
    res.send(responseToClient);
  },

  getNewData: async (req, res) => {
    const karyawans = await karyawanModel.sequelize.query("select * from karyawans where createdAt > '" + req.params.lastreq + "' order by createdAt asc limit 1",
      { type: karyawanModel.sequelize.QueryTypes.SELECT }
    )
    try {
      var karyawan = karyawans[0];
      b64counter = 0;
      var directory = './public/labeled_images/' + karyawan.nama;
      console.log(directory);
      karyawan.images = [];

      const files = fs.readdirSync(directory);

      files.forEach(async (file) => {
        var bitmap = fs.readFileSync(directory + '/' + file);
        base64File = new Buffer(bitmap).toString('base64');
        imageObject = {
          name: file,
          image: base64File
        }

        console.log(file)
        karyawan.images.push(imageObject);
        karyawan.rc = "0000";
      });

      res.send(karyawan);

    }
    catch (error) {
      var error1 = { rc: "0005" }
      res.send(error1)
    }

  },

  readLogIn: async (req, res) => {
    const LogIn = await karyawanLog.sequelize.query("select nama,DATE_FORMAT(logout_time, '%a, %d %b %Y, %H:%i') as logout_time, DATE_FORMAT(createdAt, '%a, %d %b %Y, %H:%i') as createdAt from logs ",
      { type: karyawanLog.sequelize.QueryTypes.SELECT }
    )

    res.render('log-masuk', { LogIn });
  },

  readLogOut: async (req, res) => {
    const LogOut = await karyawanLogOut.sequelize.query("select DATE_FORMAT(createdAt, '%a, %d %b %Y, %H:%i') as createdAt from logouts ",
      { type: karyawanLogOut.sequelize.QueryTypes.SELECT }
    )

    res.render('view', { LogOut });
  },
}
