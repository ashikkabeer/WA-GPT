const ask = require('./chat')
const qrcode = require('qrcode-terminal');
const { Client,LocalAuth} = require('whatsapp-web.js');
require('dotenv').config()
const client = new Client({
    puppeteer: {
		args: ['--no-sandbox'],
	},
    authStrategy: new LocalAuth({
        clientId: "client-one"
      }),
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
client.on('ready', () => {
    console.log('Client is ready!'); 
})

client.on('message', async message => {
    try {
        if(message.from === process.env.MESSAGE_FROM){
            if (message.body.startsWith("?")) {
                const prompt = message.body.substring(1) 
                ask(prompt).then((response) => {
                    message.reply(response)
                }).catch(err => console.log(err))
            }
        }
        
    } catch (error) {
        console.log(error);
    }
})

client.initialize();
