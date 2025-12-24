#!/usr/bin/env node

const fs = require("fs");
const { generateData } = require("./generator");

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  console.log("Usage: node mockgen <schema.json> <output.json>");
  process.exit(1);
}

const schema = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
const output = generateData(schema);

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Mock data generated in ${outputPath}`);
