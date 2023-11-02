const express = require("express");

const upload = require("../services/upload");

const { getImages, uploadImage } = require("../controllers/imageController");

const router = express.Router();

router.get("/images", getImages);
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;