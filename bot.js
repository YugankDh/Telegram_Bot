const TelegramBot = require('node-telegram-bot-api');
const quote_apiurl = "https://zenquotes.io/api/random"
const fact_apiurl = "https://uselessfacts.jsph.pl/api/v2/facts/random"
const meme_url = "https://meme-api.com/gimme"
require('dotenv').config()
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

async function getFact() {
    try {
        const factResponse = await fetch(fact_apiurl)
        let factData = await factResponse.json()
        return factData.text
    } catch (error) {
        return "error occured"
    }

}

async function getQuote() {
    try {
        const response = await fetch(quote_apiurl)
        let data = await response.json()
        return data[0].q
    } catch (error) {
        return "error occured"
    }

}

async function memeTitle() {
    try {
        const meme_titleresponse = await fetch(meme_url)
        let data = await meme_titleresponse.json()
        // console.log(data.title);
        return data.title
    } catch (error) {
        return "error occured"
    }


}

async function memeImg() {
    try {
        const memeresponse = await fetch(meme_url)
        let data = await memeresponse.json()
        return data.url
    } catch (error) {
        return "error occured"
    }


}


// Listen for any kind of message.
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    if (msg.text.toLocaleLowerCase() == "$quote") {
        const quote = await getQuote()
        bot.sendMessage(chatId, quote)
    }

    if (msg.text.toLocaleLowerCase() == "$fact") {
        const fact = await getFact()
        bot.sendMessage(chatId, fact)
    }
    if (msg.text.toLocaleLowerCase() == "$meme") {
        const meme = await memeImg()
        // console.log(meme);
        const memetitle = await memeTitle()
        // console.log(memetitle);
        bot.sendMessage(chatId, memetitle)
        bot.sendPhoto(chatId, meme)
    }

});