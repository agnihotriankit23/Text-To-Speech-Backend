const fs = require("fs");
const util = require("util");
require("dotenv").config();
const textToSpeech = require("@google-cloud/text-to-speech");

const client = new textToSpeech.TextToSpeechClient();

async function convertTextToMp3(text) {
  const request = {
    input: { text: text },
    voice: { languageCode: "hi-in", ssmlGender: "MALE" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);

  const writeFile = util.promisify(fs.writeFile);

  await writeFile("public/output.mp3", response.audioContent, "binary");

  console.log("Text to speech is Successfully completed");
  return "http://localhost:3000/output.mp3";
}

module.exports = convertTextToMp3;
