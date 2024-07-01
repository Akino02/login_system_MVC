const Cat = require("../models/cats");

exports.getAllCats = async (req, res) => {
  try {
    const result = await Cat.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Cats found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Cats not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCatById = async (req, res) => {
  try {
    const result = await Cat.findById(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Cat found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Cat not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteCat = async (req, res) => {
  try {
    const result = await Cat.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Cat deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCat = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      legs: req.body.legs,
      color: req.body.color,
    };
    const result = await Cat.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "Cat updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Cat was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createCat = async (req, res) => {
  try {
    const data = new Cat({
      name: req.body.name,
      legs: req.body.legs,
      color: req.body.color,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Cat created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Cat was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
