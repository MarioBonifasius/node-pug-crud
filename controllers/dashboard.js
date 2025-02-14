const personModel = require("../models/person");


module.exports = {
  dashboardView: (req, res) => {

    const person = personModel.findAll(); // Find all users
    console.log('All users:', JSON.stringify(person, null, 2));
    res.render('dashboard');
  }
}