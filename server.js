const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/api/account/:accountId', async (req, res) => {
  const accountId = req.params.accountId;
  const url = `https://api.opensea.io/api/v1/account/${accountId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
