const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');
const notes = require('./asset-notes.cjs');

const root = process.cwd();
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const target = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}
async function main() {
  const inventoryFile = path.join(root, 'context', 'media', 'asset-inventory.json');
  const previous = fs.existsSync(inventoryFile) ? JSON.parse(fs.readFileSync(inventoryFile, 'utf8')).assets : [];
  const priorIds = new Map(previous.map(asset => [asset.path, asset.id]));
  let nextId = Math.max(0, ...previous.map(asset => Number(asset.id.split('-').at(-1)))) + 1;
  const sourceFiles = ['components', 'pages', 'lib', 'data'].flatMap(dir => walk(path.join(root, dir))).filter(file => /\.(?:js|jsx|ts|tsx|json)$/.test(file));
  const references = new Map();
  for (const file of sourceFiles) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const match of line.matchAll(/(?:https:\/\/boldcityiaq\.com)?(\/images\/[^"'`\s\)<>]+\.(?:png|jpg|jpeg|webp|svg|gif))/g)) {
        const key = match[1];
        const list = references.get(key) || [];
        list.push({ file: path.relative(root, file).replaceAll('\\', '/'), line: index + 1, commented: /^\s*(?:\/\/|\*|\{\/\*)/.test(line) });
        references.set(key, list);
      }
    });
  }
  const files = walk(path.join(root, 'public', 'images')).sort();
  const assets = [];
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const data = fs.readFileSync(file);
    const metadata = await sharp(data).metadata();
    const url = '/' + path.relative(path.join(root, 'public'), file).replaceAll('\\', '/');
    const refs = references.get(url) || [];
    const annotation = notes[url] || {};
    assets.push({ id: priorIds.get(url) || `BC-IMG-${String(nextId++).padStart(3, '0')}`, originalFilename: path.basename(file), finalPath: url, path: url, bytes: data.length, width: metadata.width, height: metadata.height, actualFormat: metadata.format, extensionMatchesFormat: path.extname(file).slice(1).toLowerCase().replace('jpg', 'jpeg') === metadata.format, sha256: crypto.createHash('sha256').update(data).digest('hex'), references: refs, actualProjectLocation: 'Unverified; no city, customer, job date, or result assigned', beforeAfterRelationship: null, provenanceClass: 'existing-repository-project-photo', rightsProvenanceStatus: 'Existing company repository asset retained under approved scope; original photographer/release record unavailable', usageStatus: refs.some(ref => !ref.commented) ? 'Referenced in existing source; description/placement reviewed' : 'Unused; retained without forcing placement', verificationNotes: 'Visually inspected 2026-11-01. Describe only visible contents; no project history or outcome inferred.', ...annotation });
  }
  const known = new Set(assets.map(asset => asset.path));
  const missing = [...references].filter(([url, refs]) => !known.has(url)).map(([url, refs]) => ({ path: url, references: refs, activeReference: refs.some(ref => !ref.commented) }));
  const output = { auditedAt: '2026-11-01', assets, missing, duplicates: assets.filter((asset, index) => assets.some((other, otherIndex) => otherIndex < index && other.sha256 === asset.sha256)).map(asset => ({ path: asset.path, duplicateOf: assets.find(other => other.sha256 === asset.sha256).path })) };
  fs.writeFileSync(inventoryFile, JSON.stringify(output, null, 2) + '\n');
  const sheetFiles = [];
  for (let start = 0; process.argv.includes('--sheets') && start < assets.length; start += 16) {
    const subset = assets.slice(start, start + 16);
    const tiles = [];
    for (let i = 0; i < subset.length; i++) {
      const asset = subset[i];
      const file = path.join(root, 'public', asset.path);
      const thumb = await sharp(file).resize(290, 190, { fit: 'contain', background: '#eeeeee' }).flatten({ background: '#eeeeee' }).png().toBuffer();
      const escaped = (asset.id + ' ' + asset.path.replace('/images/', '')).replaceAll('&', '&amp;').replaceAll('<', '&lt;');
      const caption = Buffer.from(`<svg width="310" height="42"><rect width="310" height="42" fill="white"/><text x="6" y="16" font-family="Arial" font-size="11">${escaped.length > 47 ? escaped.slice(0, 47) : escaped}</text><text x="6" y="33" font-family="Arial" font-size="11">${asset.width} x ${asset.height}, ${Math.round(asset.bytes / 1024)} KB</text></svg>`);
      const left = (i % 4) * 310;
      const top = Math.floor(i / 4) * 240;
      tiles.push({ input: thumb, left: left + 10, top });
      tiles.push({ input: caption, left, top: top + 192 });
    }
    const dest = path.join(root, 'context', 'media', `contact-sheet-${1 + start / 16}.png`);
    await sharp({ create: { width: 1240, height: Math.ceil(subset.length / 4) * 240, channels: 3, background: 'white' } }).composite(tiles).png().toFile(dest);
    sheetFiles.push(dest);
  }
  console.log(JSON.stringify({ count: assets.length, missing: missing.filter(item => item.activeReference).map(item => item.path), duplicates: output.duplicates, oversized: assets.filter(item => item.bytes > 500000).map(item => ({ path: item.path, bytes: item.bytes })), sheetFiles }, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
