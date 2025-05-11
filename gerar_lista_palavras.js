const fs = require('fs');
const https = require('https');

https.get('https://raw.githubusercontent.com/pythonprobr/palavras/master/palavras.txt', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const palavras5 = data
      .split('\n')
      .map(w => w.trim().toLowerCase())
      .filter(w => w.length === 5 && /^[a-záâãàéêíóôõúç]+$/.test(w));

    const conteúdo = 'module.exports = [\n  ' +
      palavras5.map(p => `"${p}"`).join(',\n  ') +
      '\n];\n';

    fs.writeFileSync('palavras5.js', conteúdo, 'utf8');
    console.log(`Geradas ${palavras5.length} palavras de 5 letras em palavras5.js`);
  });
}).on('error', err => console.error(err));
