const fs = require('fs');

const locPath = 'src/pages/Location.jsx';
const discPath = 'src/pages/Discover.jsx';

let locStr = fs.readFileSync(locPath, 'utf8');
let discStr = fs.readFileSync(discPath, 'utf8');

// 1. Move CONNECTIVITY_STORIES array
const storyRegex = /const CONNECTIVITY_STORIES = \[[\s\S]*?\];\n/m;
const storyMatch = locStr.match(storyRegex);
if (storyMatch) {
    locStr = locStr.replace(storyMatch[0], '');
    discStr = discStr.replace(/const HIGHLIGHT_CARDS = \[/, storyMatch[0] + '\nconst HIGHLIGHT_CARDS = [');
} else {
    console.log("Could not find CONNECTIVITY_STORIES in Location.jsx");
}

// 2. Move refs and useEffect
const hooksRegex = /  const scrollSectionRef = useRef\(null\);\n  const scrollImgRef = useRef\(null\);\n  const scrollOverlayRef = useRef\(null\);\n  const connectivityRowRefs = useRef\(\[\]\);\n\n  useEffect\(\(\) => \{[\s\S]*?  \}, \[\]\);\n/m;
const hooksMatch = locStr.match(hooksRegex);
if (hooksMatch) {
    locStr = locStr.replace(hooksMatch[0], '');
    discStr = discStr.replace(/export default function Discover\(\) \{\n/, "export default function Discover() {\n" + hooksMatch[0] + "\n");
} else {
    console.log("Could not find hooks in Location.jsx");
}

// 3. Move JSX
const jsxRegex = /      \{\/\* ===== CONNECTIVITY CARDS ===== \*\/\}[\s\S]*?      <\/section>\n/m;
const jsxMatch = locStr.match(jsxRegex);
if (jsxMatch) {
    locStr = locStr.replace(jsxMatch[0], '');
    discStr = discStr.replace(/      \{\/\* ===== CONNECTED LIVING ECOSYSTEM ===== \*\/\}[\s\S]*?<ConnectedEcosystemSection \/>/, jsxMatch[0] + '\n' + "$&");
} else {
    console.log("Could not find JSX in Location.jsx");
}

fs.writeFileSync(locPath, locStr);
fs.writeFileSync(discPath, discStr);
console.log('Location.jsx and Discover.jsx updated successfully');

const locCssPath = 'src/pages/Location.css';
const discCssPath = 'src/pages/Discover.css';

let locCssStr = fs.readFileSync(locCssPath, 'utf8');
let discCssStr = fs.readFileSync(discCssPath, 'utf8');

// Move CSS main block
const cssRegex = /\/\* ============================================================\n   CONNECTIVITY STORIES\n   ============================================================ \*\/[\s\S]*?(?=\/\* ============================================================\n   FUTURE GROWTH\n   ============================================================ \*\/)/m;
const cssMatch = locCssStr.match(cssRegex);
if (cssMatch) {
    locCssStr = locCssStr.replace(cssMatch[0], '');
    discCssStr += '\n' + cssMatch[0];
} else {
    console.log("Could not find CONNECTIVITY STORIES CSS in Location.css");
}

// Move Scroll Map Transition CSS
const scrollCssRegex = /\/\* ============================================================\n   SCROLL MAP TRANSITION\n   ============================================================ \*\/[\s\S]*?@keyframes pulseMarker \{\n  0% \{ transform: scale\(0\.8\); opacity: 1; \}\n  100% \{ transform: scale\(3\.5\); opacity: 0; \}\n\}\n/m;
const scrollCssMatch = locCssStr.match(scrollCssRegex);
if (scrollCssMatch) {
    locCssStr = locCssStr.replace(scrollCssMatch[0], '');
    discCssStr += '\n' + scrollCssMatch[0];
} else {
    console.log("Could not find SCROLL MAP TRANSITION CSS in Location.css");
}

// Move specific responsive rules
const res900 = /  \.connectivity-overview \{[\s\S]*?  \}\n  \.connectivity-story-image \{\n    height: 320px;\n  \}\n/m;
const res900Match = locCssStr.match(res900);
if(res900Match) {
    locCssStr = locCssStr.replace(res900Match[0], '');
    discCssStr += '\n@media (max-width: 900px) {\n' + res900Match[0] + '}\n';
}

const res640 = /  \.connectivity-overview-track \{[\s\S]*?  \}\n  \.connectivity-story-image \{\n    height: 260px;\n  \}\n/m;
const res640Match = locCssStr.match(res640);
if(res640Match) {
    locCssStr = locCssStr.replace(res640Match[0], '');
    discCssStr += '\n@media (max-width: 640px) {\n' + res640Match[0] + '}\n';
}

fs.writeFileSync(locCssPath, locCssStr);
fs.writeFileSync(discCssPath, discCssStr);
console.log('Location.css and Discover.css updated successfully');
