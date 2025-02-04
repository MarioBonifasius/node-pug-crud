const personModel = require("../models/person");


module.exports = {
  dashboardView: (req, res) => {

    const person = personModel.findAll(); //model.person.findAll();
    // console.log(person.every(person => person instanceof Person)); // true
    console.log('All users:', JSON.stringify(person, null, 2));
    res.render('dashboard');
  }
}