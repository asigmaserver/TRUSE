const express = require('express');
const axios = require('axios');
const app = express();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

app.get('/auth/discord/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code provided');
  try {
    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id,
        client_secret,
        grant_type: 'authorization_code',
        redirect_uri,
        code,
        scope: 'identify'
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    const access_token = tokenResponse.data.access_token;

    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    const user = userResponse.data;

    // Redirect to your dashboard (or do whatever you want)
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Discord Auth Failed");
  }
});

app.listen(process.env.PORT || 3000);