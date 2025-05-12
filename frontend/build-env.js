// A simple script to modify next.config.mjs for different environments
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'next.config.mjs');
let configContent = fs.readFileSync(configPath, 'utf8');

// Get environment from command line argument
const env = process.argv[2] || 'dev';

if (env === 'prod') {
  // Production configuration with basePath
  configContent = configContent.replace(
    /basePath:.*?,/,
    "basePath: '/petition-system',");
  configContent = configContent.replace(
    /assetPrefix:.*?,/,
    "assetPrefix: '/petition-system/',");
  console.log('✅ Set configuration for PRODUCTION environment');
} else {
  // Development configuration without basePath
  configContent = configContent.replace(
    /basePath:.*?,/,
    "basePath: '',");
  configContent = configContent.replace(
    /assetPrefix:.*?,/,
    "assetPrefix: '',");
  console.log('✅ Set configuration for DEVELOPMENT environment');
}

fs.writeFileSync(configPath, configContent);