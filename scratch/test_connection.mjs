import { createClient } from '@supabase/supabase-js';
import ImageKit from 'imagekit';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log('Testing Supabase Connection...');
console.log('Supabase URL configured:', Boolean(supabaseUrl), supabaseUrl ? supabaseUrl.replace(/https?:\/\//, '').split('.')[0] : 'none');
console.log('Anon/Publishable key configured:', Boolean(supabaseAnonKey));

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tablesToCheck = [
  'media',
  'site_settings',
  'homepage_sections',
  'hero_slides',
  'destinations',
  'trips',
  'itinerary_days',
  'testimonials',
  'team_members',
  'enquiries',
  'chatbot_nodes',
  'whatsapp_settings',
  'activity_logs'
];

async function checkDatabase() {
  const results = {};
  for (const table of tablesToCheck) {
    try {
      const { data, error, status } = await supabase.from(table).select('*').limit(1);
      if (error) {
        results[table] = { status: 'ERROR', code: error.code, message: error.message, httpStatus: status };
      } else {
        results[table] = { status: 'OK', count: data.length, httpStatus: status };
      }
    } catch (err) {
      results[table] = { status: 'EXCEPTION', message: err.message };
    }
  }
  return results;
}

async function testImageKit() {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  console.log('\nTesting ImageKit...');
  console.log('Public Key configured:', Boolean(publicKey));
  console.log('Private Key configured:', Boolean(privateKey));
  console.log('Endpoint configured:', Boolean(urlEndpoint), urlEndpoint ? urlEndpoint : 'none');

  if (!publicKey || !privateKey || !urlEndpoint) {
    return { status: 'FAIL', reason: 'Missing keys' };
  }

  try {
    const ik = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
    // Test listing files
    const files = await ik.listFiles({ limit: 3 });
    return { status: 'OK', fileCountListed: files.length };
  } catch (err) {
    return { status: 'ERROR', message: err.message };
  }
}

async function run() {
  const dbResults = await checkDatabase();
  console.log('\n--- SUPABASE TABLE CHECK RESULTS ---');
  console.log(JSON.stringify(dbResults, null, 2));

  const ikResults = await testImageKit();
  console.log('\n--- IMAGEKIT RESULT ---');
  console.log(JSON.stringify(ikResults, null, 2));
}

run();
