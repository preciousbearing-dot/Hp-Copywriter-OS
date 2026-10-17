const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const files = [
  'assets/js/skill-registry.js',
  'assets/js/brief-analyzer.js',
  'assets/js/provider-manager.js',
  'assets/js/app.js'
];
let failed = false;
for (const file of files) {
  try {
    const source = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
    new vm.Script(source, { filename: file });
    console.log('PASS syntax:', file);
  } catch (error) {
    failed = true;
    console.error('FAIL syntax:', file, error.message);
  }
}
if (failed) process.exit(1);
