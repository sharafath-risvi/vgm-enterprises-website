const fs = require('fs');

const discPath = 'src/pages/Discover.jsx';
const mpPath = 'src/pages/MasterPlan.jsx';
const discCssPath = 'src/pages/Discover.css';
const mpCssPath = 'src/pages/MasterPlan.css';

let discStr = fs.readFileSync(discPath, 'utf8');
let mpStr = fs.readFileSync(mpPath, 'utf8');
let discCssStr = fs.readFileSync(discCssPath, 'utf8');
let mpCssStr = fs.readFileSync(mpCssPath, 'utf8');

// 1. Move ConnectedEcosystemSection from Discover to MasterPlan
const cleDataRegex = /const CLE_NODES = \[[\s\S]*?\];\n\n/m;
const cleDataMatch = discStr.match(cleDataRegex);
if (cleDataMatch) {
    discStr = discStr.replace(cleDataMatch[0], '');
    mpStr = mpStr.replace('// Cross-browser rounded rect helper', cleDataMatch[0] + '// Cross-browser rounded rect helper');
}

const cleFuncRegex = /function ConnectedEcosystemSection\(\) \{[\s\S]*?    <\/section>\n  \);\n}\n\n/m;
const cleFuncMatch = discStr.match(cleFuncRegex);
if (cleFuncMatch) {
    discStr = discStr.replace(cleFuncMatch[0], '');
    mpStr = mpStr.replace('export default function MasterPlan', cleFuncMatch[0] + 'export default function MasterPlan');
}

// Remove usage from Discover
discStr = discStr.replace(/      \{\/\* ===== CONNECTED LIVING ECOSYSTEM ===== \*\/}\n      <ConnectedEcosystemSection \/>\n\n/m, '');

// Insert usage into MasterPlan below Interactive Layout
const mpTarget = /      <\/section>\n\n      \{\/\* ===== SPECS GRID ===== \*\/\}/m;
mpStr = mpStr.replace(mpTarget, '      </section>\n\n      {/* ===== CONNECTED LIVING ECOSYSTEM ===== */}\n      <ConnectedEcosystemSection />\n\n      {/* ===== SPECS GRID ===== */}');

// Move CSS
const cleCssRegex = /\/\* ============================================================\n   CONNECTED LIVING ECOSYSTEM\n   ============================================================ \*\/[\s\S]*?(?=\/\* ============================================================\n   LIVING AROUND YOUR PLOT\n   ============================================================ \*\/)/m;
const cleCssMatch = discCssStr.match(cleCssRegex);
if (cleCssMatch) {
    discCssStr = discCssStr.replace(cleCssMatch[0], '');
    mpCssStr += '\n' + cleCssMatch[0];
}

// 2. Remove SustainableLivingShowcase from Discover
const slsDataRegex = /const SUSTAIN_STORIES = \[[\s\S]*?\];\n\n/m;
const slsDataMatch = discStr.match(slsDataRegex);
if (slsDataMatch) {
    discStr = discStr.replace(slsDataMatch[0], '');
}

const slsFuncRegex = /\/\* \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\n   SUSTAINABLE LIVING SHOWCASE — Cinematic Parallax Storytelling\n   \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \*\/[\s\S]*?    <\/div>\n  \);\n}\n\n/m;
const slsFuncMatch = discStr.match(slsFuncRegex);
if (slsFuncMatch) {
    discStr = discStr.replace(slsFuncMatch[0], '');
}

discStr = discStr.replace(/      \{\/\* ===== SUSTAINABLE LIVING SHOWCASE ===== \*\/}\n      <SustainableLivingShowcase \/>\n\n/m, '');

// Remove SustainableLiving CSS
const slsCssRegex = /\/\* ============================================================\n   SUSTAINABLE LIVING SHOWCASE\n   ============================================================ \*\/[\s\S]*?(?=\/\* ============================================================\n   RESPONSIVE\n   ============================================================ \*\/)/m;
const slsCssMatch = discCssStr.match(slsCssRegex);
if (slsCssMatch) {
    discCssStr = discCssStr.replace(slsCssMatch[0], '');
}

// 3. Remove "smart-hero" (Sustainable Living) from Discover
const smartHeroRegex = /      <section className="page-hero smart-hero" aria-label="Smart Living hero">[\s\S]*?      <\/section>\n\n/m;
const smartHeroMatch = discStr.match(smartHeroRegex);
if (smartHeroMatch) {
    discStr = discStr.replace(smartHeroMatch[0], '');
}

// 4. Remove "smart-banner" (Our Commitment) from Discover
const smartBannerRegex = /      \{\/\* ===== INTRO BANNER ===== \*\/}\n      <section className="smart-banner" aria-label="Smart living intro">[\s\S]*?      <\/section>\n\n/m;
const smartBannerMatch = discStr.match(smartBannerRegex);
if (smartBannerMatch) {
    discStr = discStr.replace(smartBannerMatch[0], '');
}

fs.writeFileSync(discPath, discStr);
fs.writeFileSync(mpPath, mpStr);
fs.writeFileSync(discCssPath, discCssStr);
fs.writeFileSync(mpCssPath, mpCssStr);

console.log("Done.");
