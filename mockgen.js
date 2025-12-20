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

        if(typeof type === "object" && !Array.isArray(type)) {
            result[field]= generateData(type);
            continue;
        }

        if(Array.isArray(type)){
            const arrType = type[0]; 
            const length = 3;
            result[field] = Array.from({length}, () => generateData({item: arrType}).item);
            continue;
        }

        if(type === "boolean") {result[field] = Math.random() <0.5;
        }

        else if (type === "first name") {
            result[field] = faker.person.firstName();
        }

        else if (type === "last name") {
            result[field] = faker.person.lastName();
        }

        else if (type === "middle name") {
            result[field] = faker.person.middleName();
        }

        else if (type === "full name") {
            result[field] = faker.person.fullName();
        }

        else if (type === "uuid") {
            result[field] = faker.string.uuid();
        }

        else if (type === "string"){
            result[field] = randomString();
        }

        else if (type === "integer") {
            result[field] = randomInteger();
        }

        else if (type === "float") {
            result[field] = randomFloat();
        }

        else if (type === "email") {
            result[field] = faker.internet.email();
        }

        else if (type === "phone") {
            result[field] = faker.phone.number();
        }

        else if (type === "image") {
            result[field] = randomImageUrl();
        }

        else if (type === "date") {
            result[field] = faker.date.birthdate({ min: 18, max: 60, mode: 'age' });
        }

        else if (type === "file") {
            result[field] = randomFileUrl();
        }
    } return result;
}

const schema = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
const output = generateData(schema);
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Mock data generated in ${outputPath}`);