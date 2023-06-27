const fs = require("fs");
const util = require("util");
require("dotenv").config();
const textToSpeech = require("@google-cloud/text-to-speech");

const client = new textToSpeech.TextToSpeechClient();

async function convertTextToMp3(text) {
  try {
    const request = {
      input: { text: text },
      voice: { languageCode: "hi-in", ssmlGender: "MALE" },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);

    const fileName = Date.now().toString();

    const writeFile = util.promisify(fs.writeFile);
    // await writeFile(`public/${fileName}.mp3`, response.audioContent, "binary");

    fs.writeFileSync(`public/${fileName}.mp3`, response.audioContent);

    console.log("Text to speech is Successfully completed");
    return fileName;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = convertTextToMp3;
