const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext.toLowerCase() !== ".jpg" && ext.toLowerCase() !== ".jpeg" && ext.toLowerCase() !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

//MS Computer Vision Specific
const axios = require("axios").default;
const async = require("async");
const fs = require("fs");
const https = require("https");
const path = require("path");
const createReadStream = require("fs").createReadStream;
const sleep = require("util").promisify(setTimeout);
const ComputerVisionClient =
  require("@azure/cognitiveservices-computervision").ComputerVisionClient;
const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;

require("dotenv").config({ path: "./config/.env" });

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const key = process.env.MS_COMPUTER_VISION_SUBSCRIPTION_KEY;
const endpoint = process.env.MS_COMPUTER_VISION_ENDPOINT;

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
);

//Server Setup
app.set("view engine", "ejs");

//Express Middleware

//serves static files and allows for nested folders in public
app.use(express.static(path.join(__dirname, 'public')));

//serves public/css static files and sets the mime type to text/css
app.use("/public/css", express.static(__dirname + "/public/css", { type: "text/css" }));

//Routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", upload.single("file-to-upload"), async (req, res) => {
  try {
    
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const objectURL = result.secure_url;

    // Analyze a URL image
    console.log("Analyzing objects in image...", objectURL.split("/").pop());
    
    const analysis = await computerVisionClient.analyzeImage(objectURL, {
      visualFeatures: ["Tags", "Description", "Objects"],
    });

    const tags = analysis.tags;
    const description = analysis.description.captions[0].text;

    // Future implementation: Detect Objects to use Detect Location of Objects
    // Detect Objects
    const objects = analysis.objects;
    console.log(objects);

    console.log(`Found ${objects.length} objects:`);
    for (const obj of objects) {
      console.log(`${obj.object} (${obj.confidence.toFixed(2)}) at ${formatRectObjects(obj.rectangle)}`);
    }

    // Formats the bounding box which pinpoints location
    function formatRectObjects(rect) {
      return `top=${rect.y}`.padEnd(10) + `left=${rect.x}`.padEnd(10) + `bottom=${rect.y + rect.h}`.padEnd(12)
        + `right=${rect.x + rect.w}`.padEnd(10) + `(${rect.w}x${rect.h})`;
    }
    console.log();
    //End Detect Objects and Location

    // Check if the image contains tags related to fire
    let fireCount = 0;
    for (const tag of tags) {
      if (tag.name.toLowerCase() === "fire"  || tag.name.toLowerCase() === "flame") {
        fireCount++;
      }
    }

    // Check if the image description contains fire
    if (description.toLowerCase().includes("fire")) {
      fireCount++;
    }

    // Check for tag of "fire" confidence value, 
    // else use tag of "flame" confidence value
    let fireConfidence = 0;
    for (const tag of tags) {
      if (tag.name.toLowerCase() === "fire") {
        fireConfidence = tag.confidence.toFixed(2) * 100;
        break; // exit the loop once you find the first "fire" tag
      } else if (tag.name.toLowerCase() === "flame") {
        fireConfidence = tag.confidence.toFixed(2) * 100;
        break; // exit the loop once you find the first "flame" tag
      }
    }

    console.log(`Number of fire tags and descriptions found: ${fireCount}`);
    console.log(`Confidence rate of "fire" or "flame": ${fireConfidence}`);
    console.log(tags);
    console.log(`AI generated image description: ${description}`);
    console.log(`- - - - - - - - - -`)

    // Render the count, the confidence, the description, and the image to ejs
    res.render("result.ejs", { count: fireCount, img: objectURL, fireConfidence: fireConfidence, description: description });
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT || 8000);
