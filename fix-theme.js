const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

const replacements = [
  [/bg-\[#101013\]/g, 'bg-[var(--bg-color)]'],
  [/text-white(?=["'\s/>])/g, 'text-[var(--text-color)]'],
];

// Only replace bg-[#101013] in mobile-specific sections
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const fp = path.join(dir, f);
  let c = fs.readFileSync(fp, 'utf8');
  const original = c;
  
  // Only replace bg-[#101013] -> bg-[var(--bg-color)]
  c = c.replace(/bg-\[#101013\]/g, 'bg-[var(--bg-color)]');
  
  if (c !== original) {
    fs.writeFileSync(fp, c);
    console.log('Fixed bg-[#101013]:', f);
  }
});

console.log('Done!');
