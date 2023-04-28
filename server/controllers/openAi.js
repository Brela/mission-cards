const openai = require('../models/OpenAi');
const axios = require('axios'); // needed to make requests to specific url at OpenAI API
const natural = require('natural'); // used to count tokens in message history

// for conversation history feature (which gives context to conversation), we need to count the tokens
// in this case we use the "natural" package in order to keep as much history as possible. gpt 3.5 token limit - 4096
const TOKEN_LIMIT = 4096;
let tokenCount;

let conversationHistory = [
    { "role": "system", "content": "You are a helpful assistant who is very enthusiastic." },
];

function addUserMessage(content) {
    conversationHistory.push({ "role": "user", "content": content });
}
function addAssistantMessage(content) {
    conversationHistory.push({ "role": "assistant", "content": content });
}

function countTokens(text) {
    const tokenizer = new natural.WordTokenizer(); // Create a new WordTokenizer instance
    const tokens = tokenizer.tokenize(text);
    return tokens.length;
}

function truncateConversationHistory() {
    tokenCount = conversationHistory.reduce((count, message) => count + countTokens(message.content), 0);
    // set this number as a buffer to not hit thte limit
    while (tokenCount >= TOKEN_LIMIT - 1000) {
        if (conversationHistory.length > 2) {
            conversationHistory.splice(1, 2);
        } else {
            break;
        }

        tokenCount = conversationHistory.reduce((count, message) => count + countTokens(message.content), 0);
    }
}

module.exports = {
    async sendPrompt(req, res) {

        const userPrompt = req.body.userPrompt;
        addUserMessage(userPrompt);

        if (!userPrompt) {
            res.status(400).json({
                error: {
                    message: "Please provide a valid userPrompt",
                },
            });
            return;
        }

        truncateConversationHistory(); // call this so that we don't send more than the max tokens

        try {
            const gptResponse = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: conversationHistory,
                    temperature: 0.5,
                    max_tokens: 150,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${openai.configuration.apiKey}`,
                    },
                }
            );
            const extractedGptresponse = gptResponse.data.choices[0].message.content
            addAssistantMessage(extractedGptresponse);

            res.status(200).json(
                {
                    result: extractedGptresponse,
                    tokenCount,
                }
            );
            console.log(conversationHistory)

        } catch (error) {
            if (error.response) {
                console.error(error.response.status, error.response.data);
                res.status(error.response.status).json(error.response.data);
            } else {
                console.error(`Error with OpenAI API request: ${error.message}`);
                res.status(500).json({
                    error: {
                        message: 'An error occurred during your request.',
                    },
                });
            }
        }
    },
};

/* function generatePrompt(inputWord) {
         const capitalizedAnimal =
            animal[0].toUpperCase() + animal.slice(1).toLowerCase(); 
    return `Write 3 sentences describing this: ${inputWord}`;
}
 */