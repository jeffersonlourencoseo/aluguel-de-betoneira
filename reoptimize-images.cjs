const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = 'public/images';
const files = fs.readdirSync(imagesDir).filter(f => /^blog-\d+\.jpg$/i.test(f));

(async () => {
  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const tmpPath = path.join(imagesDir, file + '.tmp.jpg');
    const statsBefore = fs.statSync(inputPath);

    await sharp(inputPath)
      .resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 75, progressive: true, mozjpeg: true })
      .toFile(tmpPath);

    fs.renameSync(tmpPath, inputPath);
    const statsAfter = fs.statSync(inputPath);
    const reduction = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(1);
    console.log(`${file}: ${(statsBefore.size / 1024).toFixed(1)} KB -> ${(statsAfter.size / 1024).toFixed(1)} KB (${reduction}% smaller)`);
  }
})();
