const fs = require('fs');

const discPath = 'src/pages/Discover.jsx';
const mpPath = 'src/pages/MasterPlan.jsx';

let discStr = fs.readFileSync(discPath, 'utf8');
let mpStr = fs.readFileSync(mpPath, 'utf8');

const regex = /const CLE_CX = 440, CLE_CY = 440;[\s\S]*?  return \{ x: CLE_CX \+ CLE_R \* Math\.cos\(r\), y: CLE_CY \+ CLE_R \* Math\.sin\(r\) \};\n\}\n\n/m;
const match = discStr.match(regex);
if (match) {
    discStr = discStr.replace(match[0], '');
    mpStr = mpStr.replace('// Cross-browser rounded rect helper', match[0] + '// Cross-browser rounded rect helper');
} else {
    console.log("Could not find CLE variables");
}

fs.writeFileSync(discPath, discStr);
fs.writeFileSync(mpPath, mpStr);
console.log("Moved CLE variables");
