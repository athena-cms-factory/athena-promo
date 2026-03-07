import { google } from 'googleapis';
import fs from 'fs';

const auth = new google.auth.GoogleAuth({
  keyFile: 'service-account.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = '1HrOUhMWGmY2A_eqsyMmBid1ChWNxtVA9TBwFPVNLxPk';

async function fixSheetMeta() {
  console.log("🛠️ Fixing Google Sheet Meta-Data (IDs & Header Row)...");

  try {
    // 1. Fix 'section_settings' IDs
    const sectionData = [
       ['id', 'title', 'subtitle', 'visible', 'padding'],
       ['hero', 'Onze Passie', 'Kappers met hart voor haar', 'TRUE', '40'],
       ['missie', 'Onze Missie', 'Waar we voor staan', 'TRUE', '40'],
       ['locatie', 'Onze Locatie', 'Breng ons een bezoek', 'TRUE', '40'],
       ['stylist_gradatie', 'Stylist Gradaties', 'Gediplomeerd vakmanschap', 'TRUE', '40'],
       ['team', 'Ons Team', 'De makers van jouw stijl', 'TRUE', '40'],
       ['tarieven', 'Diensten & Tarieven', 'Kwaliteit voor een eerlijke prijs', 'TRUE', '40'],
       ['testimonials', 'Wat klanten zeggen', 'Echte ervaringen', 'TRUE', '40'],
       ['aveda', 'Aveda Filosofie', 'Natuurlijke schoonheid', 'TRUE', '40'],
       ['footer', 'Contact & Info', 'We horen graag van je', 'TRUE', '40']
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'section_settings!A1',
      valueInputOption: 'RAW',
      requestBody: { values: sectionData }
    });
    console.log("✅ section_settings updated with new 'Luxe' IDs.");

    // 2. Add dummy data for 'header' if empty
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'header!A2',
      valueInputOption: 'RAW',
      requestBody: { 
        values: [['logo_schaar.png', 'De Schaar !', 'We care about your hair', 'Diensten', '#tarieven']] 
      }
    });
    console.log("✅ header tab seeded with a row.");

    // 3. Ensure 'footer' tab is clean
    // (User might still have old columns there, we leave it for now but the code will use 'bedrijfsnaam')

  } catch (err) {
    console.error("❌ Error fixing sheet meta:", err.message);
  }
}

fixSheetMeta();
