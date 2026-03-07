import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: 'service-account.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = '1HrOUhMWGmY2A_eqsyMmBid1ChWNxtVA9TBwFPVNLxPk';
const sitePath = '../sites/de-schaar-site';

async function seedSheet() {
  console.log("🚀 Seeding Google Sheet from local JSON data...");

  const tables = [
    { name: 'basis', file: 'basis.json' },
    { name: 'paginastructuur', file: 'paginastructuur.json' },
    { name: 'social_media', file: 'social_media.json' },
    { name: 'teamleden', file: 'teamleden.json' },
  ];

  for (const table of tables) {
    const dataPath = path.join(sitePath, 'src/data', table.file);
    if (!fs.existsSync(dataPath)) continue;
    
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    if (!data.length) continue;

    console.log(`📤 Seeding table: ${table.name}...`);
    
    // Convert JSON array of objects to rows
    const headers = Object.keys(data[0]);
    const rows = [headers, ...data.map(row => headers.map(h => {
        const val = row[h];
        return (typeof val === 'object' && val !== null) ? (val.text || JSON.stringify(val)) : val;
    }))];

    try {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${table.name}!A1`,
        valueInputOption: 'RAW',
        requestBody: { values: rows }
      });
      console.log(`✅ ${table.name} seeded successfully.`);
    } catch (err) {
      console.error(`❌ Error seeding ${table.name}:`, err.message);
    }
  }
}

seedSheet();
