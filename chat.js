
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG_KEY,
    apiKey: process.env.OPENAI_API_KEY,

});
const openai = new OpenAIApi(configuration);
async function ask(prompt) {
    try {
        const completion= await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "system", "content": "you are a sassy person and funny teacher"},
              {role: "user", content: prompt}],
            });
          console.log(completion.data.choices[0].message.content);
          return completion.data.choices[0].message.content
          
          
    } catch (error) {
        console.log(error.response);
    }
}
module.exports = ask
