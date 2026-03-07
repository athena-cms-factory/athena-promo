import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: 'service-account.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = '1HrOUhMWGmY2A_eqsyMmBid1ChWNxtVA9TBwFPVNLxPk';

async function upgradeSheet() {
  console.log("🚀 Starting Athena Google Sheet Upgrade...");

  try {
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetNames = meta.data.sheets.map(s => s.properties.title);
    
    // 1. Ensure 'hero' tab exists
    if (!sheetNames.includes('hero')) {
      console.log("➕ Creating 'hero' tab...");
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: 'hero' } } }]
        }
      });
      
      // Add headers and initial data to 'hero'
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'hero!A1:C2',
        valueInputOption: 'RAW',
        requestBody: {
          values: [
            ['title', 'hero_image', 'hero_overlay_opacity'],
            ['De Schaar !', 'hero_de-schaar-1.png', '0.2']
          ]
        }
      });
    } else {
        console.log("✅ 'hero' tab already exists.");
    }

    // 2. Ensure 'site_settings' tab exists (and clean it up if needed)
    if (!sheetNames.includes('site_settings')) {
      console.log("➕ Creating 'site_settings' tab...");
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: 'site_settings' } } }]
        }
      });
    }

    // 3. Get all GIDs for mapping
    const finalMeta = await sheets.spreadsheets.get({ spreadsheetId });
    const mapping = {};
    finalMeta.data.sheets.forEach(s => {
      mapping[s.properties.title] = s.properties.sheetId;
    });

    console.log("\n📊 New GID Mapping for url-sheet.json:");
    console.log(JSON.stringify(mapping, null, 2));

  } catch (err) {
    console.error("❌ Error upgrading sheet:", err.message);
  }
}

upgradeSheet();
