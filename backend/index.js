const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app build directory
const reactBuildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(reactBuildPath));

app.post('/api/generate-og-image', async (req, res) => {
  const { title, content } = req.body;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 630 });

    const htmlContent = `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta property="og:title" content="${title}">
          <meta property="og:description" content="${content}">
        </head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>${title}</h1>
          <p>${content}</p>
        </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const imagePath = path.join(__dirname, '../frontend/public', `${Date.now()}_og_image.png`);

    await page.screenshot({ path: imagePath });

    await browser.close();

    res.json({ imageUrl: `/public/${path.basename(imagePath)}` });
  } catch (error) {
    console.error('Error generating OG image:', error);
    res.status(500).json({ error: 'Failed to generate OG image' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(reactBuildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
