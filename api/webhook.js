// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test';

// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api');
// const MomentJS = require('moment')

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        // Create our new bot handler with the token
        // that the Botfather gave us
        // Use an environment variable so we don't expose it in our code
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
        const channelID = ["-1001692848614"]

        // Retrieve the POST request body that gets sent from Telegram
        const {body} = request;
        let durationHumanDiff = '';
        // Ensure that this is a message being sent
        if (body.title) {
            if (body.duration) {
                // const duration = MomentJS.duration(body.duration);
                durationHumanDiff ='\n' + '*Duration:* '+body.duration;
            }
            // Send our new message back in Markdown
            // Will implemet ability to send to multiple ids at a time //
            await bot.sendMessage(channelID[0], body.title + '\n' + body.name + '\n' + body.value + durationHumanDiff + '\n' + body.url, {parse_mode: 'Markdown'});
        }
    } catch (error) {
        // If there was an error sending our message then we
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }

    // Acknowledge the message with Telegram
    // by sending a 200 HTTP status code
    response.send('OK');
};