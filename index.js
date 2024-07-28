let dotenv  = require('dotenv');
let express = require('express');
let bodyParser = require('body-parser');
let OpenAI = require('openai')
const app = express();
const port = process.env['PORT'] || '';

dotenv.config()
app.use(bodyParser.json());

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'] || '', // This is the default and can be omitted
});

app.get('/', async (req, res) => {    
    let content = await chats();    
    console.log(content)
    res.send(content);
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

async function chats() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: 'You are a helpful assistant' }],
        model: 'gpt-4o-mini',
      });
    return completion.choices[0].message.content;
}

async function showModels() {
    const list = await openai.models.list();
    let arrList = [];

    for await (const model of list) {
        arrList.push(model);
    }

    return arrList; 
}

