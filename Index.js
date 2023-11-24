const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; 

app.use(express.json());
app.get('/scrape', async (req, res) => {
  const { weburl } = req.query;

  if (!weburl) {
    return res.status(400).json({ error: 'Please provide a weburl query parameter' });
  }

  try {
    const response = await axios.get(weburl);
    const htmlContent = response.data;

    
    res.setHeader('Content-Type', 'text/text');
    res.status(200).send(htmlContent);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching HTML content from the provided URL' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
