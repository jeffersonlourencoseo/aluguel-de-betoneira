// Converte JPG -> WebP (qualidade ~80) em public/images e gera og-image.png 1200x630.
// Uso: node reoptimize-images.cjs   (sharp vem junto com o Astro)
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dirs = ['public/images', 'public/images/sobre'];

(async () => {
  for (const dir of dirs) {
    for (const file of fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f))) {
      if (file === 'og-image.jpg') continue; // vira PNG abaixo
      const input = path.join(dir, file);
      const output = path.join(dir, file.replace(/\.jpe?g$/i, '.webp'));
      let img = sharp(input);
      // blog-1 era retrato (800x1358) e e exibido em 16:9: recorte central 800x450
      if (file === 'blog-1.jpg') img = img.resize(800, 450, { fit: 'cover', position: 'centre' });
      await img.webp({ quality: 80, effort: 6 }).toFile(output);
      const a = fs.statSync(input).size, b = fs.statSync(output).size;
      console.log(`${file}: ${(a / 1024).toFixed(1)} KB -> ${(b / 1024).toFixed(1)} KB`);
      fs.unlinkSync(input);
    }
  }
  const og = 'public/images/og-image.jpg';
  if (fs.existsSync(og)) {
    await sharp(og).resize(1200, 630).png({ compressionLevel: 9, palette: true }).toFile('public/images/og-image.png');
    fs.unlinkSync(og);
    console.log('og-image.png gerado', (fs.statSync('public/images/og-image.png').size / 1024).toFixed(1), 'KB');
  }
})();
