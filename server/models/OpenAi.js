const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// require('dotenv').config({ path: '../.env' });

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    endpoint: "https://api.openai.com/v1/chat/completions",
});
console.log(configuration)
const openai = new OpenAIApi(configuration);

module.exports = openai;
