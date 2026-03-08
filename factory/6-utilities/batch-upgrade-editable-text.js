import fs from 'fs';
import path from 'path';

/**
 * Batch Upgrade Utility: EditableText (v8.4)
 * 
 * This script propagates the 'Golden Standard' logic for EditableText.jsx 
 * from the boilerplate to all existing sites in the monorepo.
 * 
 * Usage: node factory/6-utilities/batch-upgrade-editable-text.js
 */

const BOILERPLATE_PATH = 'factory/2-templates/boilerplate/docked/shared/components/EditableText.jsx';

if (!fs.existsSync(BOILERPLATE_PATH)) {
    console.error('❌ Source boilerplate not found at:', BOILERPLATE_PATH);
    process.exit(1);
}

const NEW_CONTENT = fs.readFileSync(BOILERPLATE_PATH, 'utf8');

function getAllEditableTextFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getAllEditableTextFiles(filePath, fileList);
        } else if (file === 'EditableText.jsx') {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const sitesDir = path.join(process.cwd(), 'sites');
const sitetypesDir = path.join(process.cwd(), 'factory/3-sitetypes/docked');

console.log('🔍 Scanning for EditableText.jsx components...');

const filesToUpdate = [
    ...getAllEditableTextFiles(sitesDir),
    ...getAllEditableTextFiles(sitetypesDir)
];

console.log('🚀 Upgrading ' + filesToUpdate.length + ' components...');

let upgradedCount = 0;
let skippedCount = 0;

filesToUpdate.forEach(file => {
    const parentDir = path.dirname(file);
    const isAutonomous = fs.existsSync(path.join(parentDir, 'ui/VisualEditor.jsx')) || fs.existsSync(path.join(parentDir, 'VisualEditor.jsx'));

    if (isAutonomous) {
        console.log('⚠️  Skipping (Autonomous Component): ' + file);
        skippedCount++;
        return;
    }

    try {
        fs.writeFileSync(file, NEW_CONTENT);
        console.log('✅ Upgraded: ' + path.relative(process.cwd(), file));
        upgradedCount++;
    } catch (err) {
        console.error('❌ Error upgrading ' + file + ': ' + err.message);
    }
});

console.log('\n--- Status Report ---');
console.log('✅ Total Upgraded: ' + upgradedCount);
console.log('⚠️  Total Skipped: ' + skippedCount);
console.log('✨ Batch upgrade complete!');
