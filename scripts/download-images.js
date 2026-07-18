const fs = require('fs');
const path = require('path');
const https = require('https');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

const images = [
  { url: 'https://img1.wsimg.com/isteam/ip/2fb33577-001e-4278-a586-77640575c5d7/logo/temp_logo_1777976760283.png', name: 'logo.png' },
  { url: 'https://img1.wsimg.com/isteam/getty/691073166/:/rs=w:1920,m', name: 'hero.jpg' },
  { url: 'https://img1.wsimg.com/isteam/getty/1269854923/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,cg:true', name: 'our-passion.jpg' },
  { url: 'https://img1.wsimg.com/isteam/getty/833600552/:/', name: 'hat-1.jpg' },
  { url: 'https://img1.wsimg.com/isteam/stock/4182/:/', name: 'hat-2.jpg' },
  { url: 'https://img1.wsimg.com/isteam/getty/2189722091/:/', name: 'hat-3.jpg' },
  { url: 'https://img1.wsimg.com/isteam/getty/841219372/:/', name: 'hat-4.jpg' },
  { url: 'https://img1.wsimg.com/isteam/stock/100592/:/', name: 'hat-5.jpg' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      console.log(`Already exists: ${path.basename(dest)}`);
      resolve();
      return;
    }
    const file = fs.createWriteStream(dest);
    https.get(url, { timeout: 30000 }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, { timeout: 30000 }, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Downloaded: ${path.basename(dest)}`);
            resolve();
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${path.basename(dest)}`);
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  console.log('Downloading images...');
  for (const img of images) {
    const dest = path.join(imagesDir, img.name);
    try {
      await downloadFile(img.url, dest);
    } catch (err) {
      console.error(`Failed to download ${img.name}:`, err.message);
      process.exit(1);
    }
  }
  console.log('All images downloaded.');
}

main();
