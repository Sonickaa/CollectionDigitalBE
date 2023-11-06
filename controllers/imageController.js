const Image = require("../schemas/Image");

const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    if (!images.length) {
      return res.status(200).json({ msg: "No images found" });
    } else {
      return res.status(200).json(images);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const uploadImage = async (req, res) => {
  try {
    if (req.file && req.file.path) {
      const image = new Image({
        url: req.file.path,
        description: req.body.desc,
      });

      await image.save();

      const cloudinaryUrl = req.file.path.replace("public/", "");

      await Image.findByIdAndUpdate(image._id, { url: cloudinaryUrl });

      return res
        .status(200)
        .json({ msg: "Image saved successfully", cloudinaryUrl });
    } else {
      console.log(req.file);
      res.status(422).json({ msg: "Image format is invalid" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

module.exports = { getImages, uploadImage };
