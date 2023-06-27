const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const convertTextToMp3 = require("./utils");
const translateText = require("./translate");

const app = express();
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server running successfully" });
});

app.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      throw new Error("Text cannot be empty");
    }

    const translatedText = await translateText(text, "hi");
    const success = await convertTextToMp3(translatedText);
    if (!success) {
      throw new Error("Audio file could not be generated");
    }
    res.status(201).json({
      success,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
