import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LogoGenerator } from '../5-engine/lib/logo-generator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sitesDir = path.resolve(__dirname, '../../sites');

async function run() {
    const sites = fs.readdirSync(sitesDir).filter(f => fs.statSync(path.join(sitesDir, f)).isDirectory());
    
    console.log(`🔍 Checking ${sites.length} sites for missing logos...`);

    for (const site of sites) {
        const sitePath = path.join(sitesDir, site);
        const settingsPath = path.join(sitePath, 'src/data/site_settings.json');
        const allDataPath = path.join(sitePath, 'src/data/all_data.json');
        
        if (!fs.existsSync(settingsPath)) continue;

        let settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        if (Array.isArray(settings)) settings = settings[0] || {};

        const currentLogo = settings.site_logo_image;
        const logoFileExists = currentLogo && fs.existsSync(path.join(sitePath, 'public', currentLogo));

        if (!currentLogo || !logoFileExists || currentLogo === 'athena-icon.svg') {
            console.log(`🎨 Generating logo for: ${site}`);
            
            // Try to get primary color from style_config or fallback
            let primaryColor = '#3b82f6';
            const styleConfigPath = path.join(sitePath, 'src/data/style_config.json');
            if (fs.existsSync(styleConfigPath)) {
                const styleConfig = JSON.parse(fs.readFileSync(styleConfigPath, 'utf8'));
                primaryColor = styleConfig.colors?.primary || primaryColor;
            }

            const logoFile = '/' + LogoGenerator.saveToProject(sitePath, site, primaryColor);
            
            // Update settings
            settings.site_logo_image = logoFile;
            fs.writeFileSync(settingsPath, JSON.stringify(Array.isArray(JSON.parse(fs.readFileSync(settingsPath, 'utf8'))) ? [settings] : settings, null, 2));

            // Also update all_data.json if it exists (for v8 sites)
            if (fs.existsSync(allDataPath)) {
                const allData = JSON.parse(fs.readFileSync(allDataPath, 'utf8'));
                if (allData.site_settings) {
                    if (Array.isArray(allData.site_settings)) {
                        allData.site_settings[0].site_logo_image = logoFile;
                    } else {
                        allData.site_settings.site_logo_image = logoFile;
                    }
                    fs.writeFileSync(allDataPath, JSON.stringify(allData, null, 2));
                }
            }
        }
    }
    console.log('✅ Done! All sites now have a unique logo.');
}

run();
