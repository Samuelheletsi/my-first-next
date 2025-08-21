#!/usr/bin/env node

/**
 * Utility script to add new image domains to next.config.ts
 * Usage: node scripts/add-image-domain.js <domain>
 * Example: node scripts/add-image-domain.js example.com
 */

const fs = require('fs');
const path = require('path');

const domain = process.argv[2];

if (!domain) {
  console.error('Please provide a domain name');
  console.log('Usage: node scripts/add-image-domain.js <domain>');
  process.exit(1);
}

const configPath = path.join(process.cwd(), 'next.config.ts');

try {
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Check if domain already exists
  if (configContent.includes(`hostname: "${domain}"`)) {
    console.log(`Domain "${domain}" already exists in next.config.ts`);
    process.exit(0);
  }
  
  // Find the last hostname entry and add the new one
  const hostnamePattern = /hostname: "[^"]+",\s*$/gm;
  const matches = [...configContent.matchAll(hostnamePattern)];
  
  if (matches.length === 0) {
    console.error('Could not find hostname entries in next.config.ts');
    process.exit(1);
  }
  
  const lastMatch = matches[matches.length - 1];
  const insertPosition = lastMatch.index + lastMatch[0].length;
  
  const newHostnameEntry = `\n      {\n        protocol: "https",\n        hostname: "${domain}",\n      },`;
  
  configContent = 
    configContent.slice(0, insertPosition) + 
    newHostnameEntry + 
    configContent.slice(insertPosition);
  
  fs.writeFileSync(configPath, configContent);
  
  console.log(`✅ Successfully added domain "${domain}" to next.config.ts`);
  console.log('🔄 Please restart your development server for changes to take effect');
  
} catch (error) {
  console.error('Error updating next.config.ts:', error.message);
  process.exit(1);
} 