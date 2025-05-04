import { config } from 'dotenv';
import {google} from 'googleapis';
import {authenticate} from '@google-cloud/local-auth';
import {GoogleAuth} from 'google-auth-library';
import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import express from 'express';
import cors from 'cors';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import {createRequire} from 'module';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from the same directory as this file
const envPath = join(__dirname, '.env');
console.log('Loading .env from:', envPath);

// Load environment variables
const env = config({ path: envPath });
if (env.error) {
  console.error('Error loading .env file:', env.error);
} else {
  console.log('.env file loaded successfully');
  // Log the first few characters of each variable to verify they're loaded
  Object.entries(env.parsed).forEach(([key, value]) => {
    console.log(`${key}: ${value ? value.substring(0, 10) + '...' : 'undefined'}`);
  });
}

// Verify environment variables are loaded
if (!process.env.GOOGLE_CLIENT_EMAIL) {
  console.error('GOOGLE_CLIENT_EMAIL is not set in environment variables');
}
if (!process.env.GOOGLE_PRIVATE_KEY) {
  console.error('GOOGLE_PRIVATE_KEY is not set in environment variables');
}

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

// Debug environment variables
console.log('Environment variables:', {
  project_id: process.env.GOOGLE_PROJECT_ID,
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY ? 'PRESENT' : 'MISSING',
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN
});

// Service account credentials from environment variables
const credentials = {
  type: 'service_account',
  project_id: env.parsed?.GOOGLE_PROJECT_ID,
  private_key_id: env.parsed?.GOOGLE_PRIVATE_KEY_ID,
  // Remove quotes from private key if they exist
  // private_key: env.parsed?.GOOGLE_PRIVATE_KEY?.replace(/^"|"$/g, ''), .replace(/\\n/g, '\n')
  private_key: env.parsed?.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: env.parsed?.GOOGLE_CLIENT_EMAIL,
  client_id: env.parsed?.GOOGLE_CLIENT_ID,
  auth_uri: env.parsed?.GOOGLE_AUTH_URI,
  token_uri: env.parsed?.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: env.parsed?.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: env.parsed?.GOOGLE_CLIENT_X509_CERT_URL,
  universe_domain: env.parsed?.GOOGLE_UNIVERSE_DOMAIN
};

// Debug the credentials object
console.log('Credentials object:', {
  ...credentials,
});

// Verify all required fields are present
const requiredFields = ['project_id', 'private_key', 'client_email'];
const missingFields = requiredFields.filter(field => !credentials[field]);
if (missingFields.length > 0) {
  console.error('Missing required fields:', missingFields);
}

async function authorize(scopes) {
  try {
    console.log('Attempting to authorize with scopes:', scopes);
    const auth = new GoogleAuth({
      scopes: scopes,
      credentials: credentials
    });

    const client = await auth.getClient();
    console.log('Authorization successful');
    return client;
  } catch (error) {
    console.error('Authorization error:', error);
    throw error;
  }
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

// Define allowed origins
const allowedOrigins = [
  'https://attar-website.vercel.app',  // Your production frontend URL
  'https://attar-website-git-main-sibgatuls-projects.vercel.app',  // Vercel preview URL
  'https://attar-website-sibgatuls-projects.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
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
setInterval(refreshData, 100000);

app.get('/', async (req, res) => {
  res.send("validated")
});

app.get('/api/sheet/read', async (req, res) => {
  try {
    if (cachedData) {
      res.json(cachedData);
    } else {
      const auth = await authorize(SCOPES);
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

// For Vercel deployment
export default app;

// const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
