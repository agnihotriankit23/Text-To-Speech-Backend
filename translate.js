const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

// Your credentials
const CREDENTIALS = JSON.parse(process.env.GOOGLE_TRANSLATE_KEY);
//console.log(CREDENTIALS);
// Configuration for the client
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

const detectLanguage = async (text) => {
  try {
    let response = await translate.detect(text);
    return response[0].language;
  } catch (error) {
    console.log(`Error at detectLanguage --> ${error}`);
    return 0;
  }
};

// detectLanguage("need")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const translateText = async (text, targetLanguage) => {
  try {
    let [response] = await translate.translate(text, targetLanguage);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return 0;
  }
};

// translateText(text, code)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = translateText;
