const fs = require('fs');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

async function build() {
  const inFile = 'src/styles.css';
  const outFile = 'src/tailwind.generated.css';
  const css = fs.readFileSync(inFile, 'utf8');
  const result = await postcss([tailwind({ config: './tailwind.custom.cjs' }), autoprefixer()]).process(css, { from: inFile });
  fs.writeFileSync(outFile, result.css, 'utf8');
  console.log('Wrote', outFile);
}

build().catch((err) => { console.error(err); process.exit(1); });
