const { collection } = require("../schemas/Collection");
const Collection = require("../schemas/Collection");
console.log("collection", collection);

//get all
const getAllCollections = async (req, res) => {
  console.log("halloo");
  try {
    const collections = await Collection.findById().populate("owner");

    if (!collections.length) {
      res.status(200).json({ msg: "No collections in the DB " });
    } else {
      res.status(200).json({ collections });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//get one
const getOneCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Collection.findById(id);
    if (collection) {
      return res.status(200).json(collection);
    }
    res.status(404).json({ msg: "I did not find this collection." });
  } catch (error) {
    res.status(500).json(error);
  }
};

//create new
const createCollection = async (req, res) => {
  try {
    const { name, description, owner } = req.body;
    const collection = await Collection.create({
      name,
      description,
      owner,
    });
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update collection
const UpdateCollection = async (req, res) => {
  try {
    const { name, description, owner } = req.body;
    const { id } = req.params;
    const collection = await Collection.findByIdAndUpdate(
      id,
      {
        name,
        description,
        owner,
      },
      {
        new: true,
      }
    );
    if (!collection) {
      res.status(404).json({ msg: "I don´t know this collection" });
    } else {
      res
        .status(200)
        .json({ msg: "Collection updated successfully", collection });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete collection
const deleteOneCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findByIdAndDelete(id);
    if (!collection) {
      res.status(404).json({ msg: "I don´t know this collection" });
    } else {
      res
        .status(200)
        .json({ msg: "Collection deleted  successfully", collection });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllCollections,
  getOneCollection,
  createCollection,
  UpdateCollection,
  deleteOneCollection,
};
