import fs from 'fs';
import path from 'path';

const indexPath = path.resolve('./dist/index.html');
const basisPath = path.resolve('./src/data/basis.json');

try {
  // Read files
  let htmlContent = fs.readFileSync(indexPath, 'utf8');
  const basisData = JSON.parse(fs.readFileSync(basisPath, 'utf8'));
  const siteInfo = basisData[0] || {};

  // Define replacements
  const replacements = {
    '{{META_DESCRIPTION}}': siteInfo.hero_subtekst || 'A beautiful site built with Athena CMS',
    '{{META_KEYWORDS}}': 'athena, cms, jets, archive, history',
  };

  // Perform replacements
  for (const [placeholder, value] of Object.entries(replacements)) {
    htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), value);
  }

  // Write the updated file
  fs.writeFileSync(indexPath, htmlContent, 'utf8');
  console.log('✅ Post-build: Successfully replaced meta placeholders in index.html');

} catch (error) {
  console.error('❌ Post-build error:', error);
  process.exit(1);
}
