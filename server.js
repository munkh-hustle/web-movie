require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// Route to get video stream
app.get('/video/:file_id', async (req, res) => {
    try {
        // 1. Get file metadata
        const fileResponse = await axios.get(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${req.params.file_id}`
        );
        
        const filePath = fileResponse.data.result.file_path;
        const fileSize = fileResponse.data.result.file_size;
        
        // 2. Check file size (Telegram bot API limit is 20MB)
        if (fileSize > 20 * 1024 * 1024) {
            return res.status(413).json({
                error: 'File too large',
                solution: 'Use the direct Telegram CDN link instead',
                direct_link: `https://t.me/${req.params.file_id}?embed=1&mode=tme`
            });
        }
        
        // 3. Stream the file
        const videoUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;
        const videoResponse = await axios.get(videoUrl, {
            responseType: 'stream'
        });
        
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        videoResponse.data.pipe(res);
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Failed to load video',
            details: error.response?.data || error.message
        });
    }
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));