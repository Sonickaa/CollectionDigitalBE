const Collection = require("../schemas/Collection");
const Item = require("../schemas/Item");

//get all
const getAllItems = async (req, res) => {
  const userId = req.user._id;

  try {
    const items = await Item.find(userId);

    if (!items.length) {
      res.status(200).json({ msg: "No items in the DB " });
    } else {
      res.status(200).json({ items });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//get one
const getOneItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (item) {
      return res.status(200).json({ item });
    }
    res.status(404).json({ msg: "I did not find this item." });
  } catch (error) {
    res.status(500).json(error);
  }
};

//create new
const createItem = async (req, res) => {
  try {
    const { object_type, primary_date, artist_maker, origin } = req.body;
    const item = await Item.create({
      object_type,
      primary_date,
      artist_maker,
      origin,
    });

    const collectionID = req.body.collection_ID;

    const updatedCollection = await Collection.findByIdAndUpdate(
      collectionID,
      {
        $push: { items: item._id },
      },
      { new: true }
    ).populate({ path: "items" });

    res.status(201).json({ collection: updatedCollection });
  } catch (error) {
    res.status(500).json(error);
  }
};

//update item
const UpdateItem = async (req, res) => {
  try {
    const { object_type, primary_date, artist_maker, origin } = req.body;
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(
      id,
      {
        object_type,
        primary_date,
        artist_maker,
        origin,
      },
      {
        new: true,
      }
    );
    if (!item) {
      res.status(404).json({ msg: "I don´t know this item" });
    } else {
      res.status(200).json({ msg: "Item updated successfully", item });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete item
const deleteOneItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      res.status(404).json({ msg: "I don´t know this item" });
    } else {
      res.status(200).json({ msg: "Item deleted  successfully", item });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllItems,
  getOneItem,
  createItem,
  UpdateItem,
  deleteOneItem,
};
