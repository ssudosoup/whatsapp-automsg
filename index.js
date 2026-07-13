const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Helper function to generate a random delay (in milliseconds)
const randomDelay = (min, max) => {
    const time = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, time));
};

// Initialize client with automatic session persistence (LocalAuth)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        handleSIGINT: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Display QR Code in terminal for the initial scan
client.on('qr', (qr) => {
    console.log('PLEASE SCAN THIS QR CODE WITH YOUR WHATSAPP APP:');
    qrcode.generate(qr, { small: true });
});

// Indicator when the bot successfully connects
client.on('ready', () => {
    console.log('Your WhatsApp Bot is ready and active!');
});

// Auto-reply message logic
client.on('message', async (msg) => {
    // Prevent the bot from replying to itself or group chats
    if (msg.fromMe || msg.isGroup) return;

    // Convert incoming message to lowercase for flexible keyword matching
    const incomingMessage = msg.body.toLowerCase();

    // Check if the message contains target keywords
    if (incomingMessage.includes('halo') || incomingMessage.includes('p') || incomingMessage.includes('urgent') || incomingMessage.includes('penting')) {

        try {
            // 1. Fetch chat room context
            const chat = await msg.getChat();

            // 2. Trigger "typing..." status to look human
            await chat.sendStateTyping();

            // 3. Wait for a random delay between 3000ms (3s) and 7000ms (7s)
            await randomDelay(3000, 7000);

            // 4. Send the specific reply based on the keyword
            if (incomingMessage.includes('halo') || incomingMessage.includes('p')) {
                await msg.reply('Halo! Saya sedang bekerja saat ini. Pesan Anda telah diterima dan akan saya balas segera setelah saya senggang. Terima kasih! 🙏');
            } else if (incomingMessage.includes('urgent') || incomingMessage.includes('penting')) {
                await msg.reply('Pesan Anda terindikasi penting. Jika ini sangat mendesak, silakan telepon saya langsung.');
            }

            // 5. Turn off typing status after sending the message
            await chat.clearState();

        } catch (error) {
            console.error('Failed to send auto-reply:', error);
        }
    }
});

// Boot up the bot
client.initiate = () => {
    client.initialize().catch(err => console.error('Failed to start the bot:', err));
};

client.initiate();