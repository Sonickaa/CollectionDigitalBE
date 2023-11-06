const Collection = require("../schemas/Collection");
const User = require("../schemas/User");

//get all
const getAllCollections = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate({
      path: "collections",
      populate: { path: "items" },
    });

    if (!user || !user.collections || user.collections.length === 0) {
      res.status(200).json({ msg: "No collections for the user" });
    } else {
      res.status(200).json({ collections: user.collections });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//get one
const getOneCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collections = await Collection.findById(id).populate("items");

    if (!collections) {
      res.status(200).json({ msg: "No collections in the DB " });
    } else {
      res.status(200).json({ collections });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//create new
const createCollection = async (req, res) => {
  try {
    const { name, description } = req.body;

    const cloudinaryUrl = req.body.cloudinaryUrl;

    console.log("@@@@@@@@ CLOUDINARY URL", cloudinaryUrl);

    const collection = await Collection.create({
      name,
      description,
      cloudinaryUrl,
    });

    const userID = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { $push: { collections: collection._id } },
      { new: true }
    ).populate({ path: "collections", populate: { path: "items" } });

    res.status(201).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

//update collection
const UpdateCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    const collection = await Collection.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      {
        new: true,
      }
    );
    if (!collection) {
      res.status(404).json({ msg: "I don't know this collection" });
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
      res.status(404).json({ msg: "I don't know this collection" });
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
