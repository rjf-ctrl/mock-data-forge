#!/usr/bin/env node

const fs = require("fs");
const inputPath = process.argv[2];
const outputPath = process.argv[3];

if(!inputPath || !outputPath) {
    console.log("Usage: node mockgen.js <schema.json> <output.json>");
    process.exit(1);
}

const { faker } = require("@faker-js/faker");  // CommonJS

const {
    randomString,
    randomInteger,
    randomFloat,
    randomImageUrl,
    randomFileUrl
} = require("./random");



function generateData(schema) {
    const result = {};

    for(const field in schema) {
        const type = schema[field];

        if(type === "boolean") {
            result[field] = Math.random() <0.5;
        }

        if (type === "first name") {
            result[field] = faker.person.firstName();
        }

        if (type === "last name") {
            result[field] = faker.person.lastName();
        }

        if (type === "middle name") {
            result[field] = faker.person.middleName();
        }

        if (type === "full name") {
            result[field] = faker.person.fullName();
        }

        if (type === "uuid") {
            result[field] = faker.string.uuid();
        }

        if (type === "string"){
            result[field] = randomString();
        }

         if (type === "integer") {
            result[field] = randomInteger();
        }

        if (type === "float") {
            result[field] = randomFloat();
        }

        if (type === "email") {
            result[field] = faker.internet.email();
        }

        if (type === "phone") {
            result[field] = faker.phone.number();
        }

        if (type === "image") {
            result[field] = randomImageUrl();
        }

         if (type === "date") {
            result[field] = faker.date.birthdate({ min: 18, max: 60, mode: 'age' });
        }

         if (type === "file") {
            result[field] = randomFileUrl();
        }
    } return result;
}

const schema = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
const output = generateData(schema);
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Mock data generated in ${outputPath}`);