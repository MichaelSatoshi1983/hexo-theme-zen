const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

test('theme config exposes code highlight copy button settings', () => {
  const config = read('_config.yml');

  assert.match(config, /^code_highlight:\s*$/m);
  assert.match(config, /^\s{2}copy_button:\s*true\s*$/m);
  assert.match(config, /^\s{2}copy_text:\s*复制\s*$/m);
  assert.match(config, /^\s{2}copied_text:\s*已复制\s*$/m);
});

test('layout loads the code copy script when copy button support is enabled', () => {
  const layout = read('layout/layout.ejs');

  assert.match(layout, /theme\.code_highlight/);
  assert.match(layout, /js\/code-copy\.js/);
});

test('copy script enhances highlight blocks and uses clipboard api with fallback', () => {
  const script = read('source/js/code-copy.js');

  assert.match(script, /\.highlight/g);
  assert.match(script, /navigator\.clipboard\.writeText/);
  assert.match(script, /document\.execCommand\('copy'\)/);
  assert.match(script, /copy_text/);
  assert.match(script, /copied_text/);
});

test('theme stylesheet includes copy button styles for highlighted code blocks', () => {
  const stylesheet = read('source/css/style.min.css');

  assert.match(stylesheet, /\.highlight-copy-button/);
  assert.match(stylesheet, /\.highlight-header/);
  assert.match(stylesheet, /\.highlight\s+pre/);
});
