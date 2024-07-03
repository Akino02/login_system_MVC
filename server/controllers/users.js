const users = require("../models/users");
const User = require("../models/users");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const JWT_SECRET = "qwertzuiopasdfghjklyxcvbnm,.1234567890()[]{}?:_!/"

exports.getAllUsers = async (req, res) => {
  try {
    const result = await User.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Users found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Users not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "User found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "User not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "User deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const data = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
    };
    const result = await User.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "User updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "User was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const data = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
    });
    //zjisteni zda nekdo nepouziva danou emailovou adresu
    const existingEmail = await User.findOne({"email": data.email})

    //pokud takova uz emailova adresa existuje tak to vypise chybu
    if (existingEmail){
      return res.status(500).send({
        msg: "Email is already used"
      })
    }

    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "User created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "User was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signInUser = async (req, res) => {
  try {
    const data = ({
      email: req.body.email,
      password: req.body.password,
    });
    const existingEmail = await User.findOne({"email": data.email})

    if(!existingEmail){
      return res.status(500).send({
        msg: "User does not exist"
      })
    }

    //chyba v tom result
    //const result = await data.save();
    //pokud se heslo bude shodovat s heslem v databazi tak se vytvori token ve kterem bude email a ktery vyprsi za 10ms
    if (existingEmail && await bcrypt.compare(req.body.password, existingEmail.password)) {
      const token = jwt.sign({email: existingEmail.email}, JWT_SECRET, {
        expiresIn: 10,
      })

      //pokud tedy heslo bylo dobre tak se ten token posle na clienta v payloadu
      return res.status(201).send({
        msg: "User exists",
        payload: token,
      });
    }
    else {    //pokud bude heslo spatne tak to vypise chybovou hlasku na stranku a zaroven bude v clientu error v konzoli
      return res.status(500).send({
        msg: "Wrong password"
      })
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUserData = async (req, res) => {
  const data = ({
    token: req.body.token,
  });
  try {
    const user = jwt.verify(data.token, JWT_SECRET, (err, res) => {
      if(err){
        return "token expired"
      }
      return res
    });
    if(user == "token expired"){
      return res.send({
        msg: "No more data",
        payload: "token expired"
      })
    }
    if(user){
      const userData = await User.findOne({"email": user.email})
      
      return res.status(200).send({
        msg: "It is here",
        payload: userData,
      })
    }
    return res.status(500).send({
      msg: "No data"
    })

  } catch (error) {
    res.status(500).send(error);
  }
};