// Quick script to check if .env file is set up correctly
import { readFileSync } from 'fs';
import { existsSync } from 'fs';

console.log('🔍 Checking environment setup...\n');

if (!existsSync('.env')) {
  console.error('❌ .env file not found!');
  console.log('📝 Please create a .env file in the root directory with:');
  console.log('   VITE_OPENAI_API_KEY=your_api_key_here\n');
  process.exit(1);
}

console.log('✅ .env file exists\n');

try {
  const envContent = readFileSync('.env', 'utf-8');
  const lines = envContent.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
  
  const apiKeyLine = lines.find(line => line.startsWith('VITE_OPENAI_API_KEY='));
  
  if (!apiKeyLine) {
    console.error('❌ VITE_OPENAI_API_KEY not found in .env file');
    console.log('📝 Please add: VITE_OPENAI_API_KEY=your_api_key_here\n');
    process.exit(1);
  }
  
  const apiKey = apiKeyLine.split('=')[1]?.trim();
  
  if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey === '') {
    console.error('❌ API key is not set (still has placeholder value)');
    console.log('📝 Please replace "your_openai_api_key_here" with your actual API key\n');
    process.exit(1);
  }
  
  if (apiKey.length < 20) {
    console.warn('⚠️  API key seems too short. Make sure it\'s complete.');
  }
  
  console.log('✅ VITE_OPENAI_API_KEY is configured');
  console.log(`   Key length: ${apiKey.length} characters`);
  console.log(`   Key prefix: ${apiKey.substring(0, 10)}...`);
  console.log('\n✅ Environment setup looks good!');
  console.log('⚠️  Remember: You need to RESTART the dev server for changes to take effect.');
  console.log('   Run: npm run dev\n');
  
} catch (error) {
  console.error('❌ Error reading .env file:', error.message);
  process.exit(1);
}

