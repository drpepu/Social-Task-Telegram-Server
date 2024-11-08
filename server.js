const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();  

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

app.post('/check-membership', async (req, res) => {
  const { userId } = req.body;

  try {
    const response = await axios.get(`https://api.telegram.org/bot${botToken}/getChatMember`, {
      params: {
        chat_id: chatId,
        user_id: userId,
      },
    });

    const memberStatus = response.data.result.status;
    
    if (memberStatus === 'member' || memberStatus === 'administrator' || memberStatus === 'creator') {
      return res.json({ isMember: true });
    } else {
      return res.json({ isMember: false });
    }
  } catch (error) {
    console.error('Error checking membership:', error);
    return res.status(500).json({ error: 'Error checking membership' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
