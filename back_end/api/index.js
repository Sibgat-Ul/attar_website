import {google} from 'googleapis';
import {authenticate} from '@google-cloud/local-auth';
import {GoogleAuth} from 'google-auth-library';
import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import express from 'express';
import cors from 'cors';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {createRequire} from 'module';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return GoogleAuth().fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize(scopes) {
  const auth = new GoogleAuth({
    scopes: scopes,
    keyFile: CREDENTIALS_PATH,
  });

  const client = await auth.getClient();
  return client;
}

async function listProducts(auth) {
  try {
    const sheets = google.sheets({version: 'v4', auth});
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: '1gLINrhjGhJKIUBSL7LvAvwZ3SlWtkeFMGrPod0HOlmU',
      range: 'A1:H',
    });

    let rows = res.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return;
    }
    let [headers, ...products] = rows;

    rows = products.map((row) => {
      let obj = {}
      for (let i = 0; i < headers.length; i++) {
        obj[headers[i]] = row[i];
      }
      return obj;
    });

    return rows;
  } catch (err) {
    console.error('The API returned an error: ' + err);
  }
}

async function getSheetData() {
  const auth = await authorize(['https://www.googleapis.com/auth/spreadsheets']);
  const data = await listProducts(auth);
  return data;
}

async function submitOrder(values) {
  try {
    const auth = await authorize(['https://www.googleapis.com/auth/spreadsheets']);
    const service = google.sheets({ version: 'v4', auth });
    const resource = {
      'values': [values]
    };
    const result = await service.spreadsheets.values.append({
      spreadsheetId: "1nrp5Sw11bjtpFu31F3nFU44iU3o7VTaZhOcfirOP_d8",
      range: "Sheet1!A1:L1", // <-- should be a string, not array
      valueInputOption: "RAW",
      resource: resource,
    });
    console.log(`${result.data.updates.updatedCells} cells appended.`);
    return result.data;
  } catch (err) {
    console.error('Error appending data:', err);
    throw err;
  }
}

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  methods: 'GET',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let cachedData = null;

async function refreshData() {
  try {
    cachedData = await getSheetData();
    if (cachedData) {
      console.log('Data refreshed successfully');
    } else {
      console.log('No data found');
    }
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

refreshData();
setInterval(refreshData, 10000);

app.get('/', async (req, res) => {
  res.send("validated")
});

app.get('/api/sheet/read', async (req, res) => {
  try {
    if (cachedData) {
      res.json(cachedData);
    } else {
      const auth = await authorize();
      const data = await listProducts(auth);
      cachedData = data;
      res.json(data);
    }
  }
  catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({error: 'Failed to fetch data'});
  }
});

app.post('/api/sheet/append', async (req, res) => {
  let { values } = req.body;

  if (!Array.isArray(values) || values.length !== 12) {
    return res.status(400).json({ error: 'Invalid order format. Expected 12 fields.' });
  }

  if (values.some(v => v === undefined || v === null || v === "")) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await submitOrder(values);
    res.status(200).json({ message: 'Data appended successfully', result });
  } catch (err) {
    res.status(500).json({ message: 'Failed to append data', details: err.message });
  }
});
const HOST = "192.168.88.48"

app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT} Server is running)`);
});

