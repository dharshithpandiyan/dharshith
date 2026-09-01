const fs = require('fs');
const code = fs.readFileSync('js_dump.js', 'utf8');
const regex = /"([^"]{10,100})"/g;
let match;
let results = new Set();
while ((match = regex.exec(code)) !== null) {
    if (match[1].includes(' ') || match[1].includes('<')) {
        results.add(match[1]);
    }
}
fs.writeFileSync('strings.txt', Array.from(results).join('\n'));
