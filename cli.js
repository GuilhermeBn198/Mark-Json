#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { convertMarkdownToJson } = require('./index');

const [,, inputFile, outputFile] = process.argv;

if (!inputFile || !outputFile) {
  console.log('❌ Uso incorreto:');
  console.log('mark-json <input.md> <output.json>');
  process.exit(1);
}

try {
  const inputPath = path.resolve(process.cwd(), inputFile);
  const outputPath = path.resolve(process.cwd(), outputFile);

  const markdown = fs.readFileSync(inputPath, 'utf-8');
  const json = convertMarkdownToJson(markdown);

  fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));

  console.log(`✅ Arquivo convertido com sucesso: ${outputPath}`);
} catch (error) {
  console.error('❌ Erro:', error.message);
}
