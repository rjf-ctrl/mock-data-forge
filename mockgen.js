#!/usr/bin/env node
const fs = require("fs");
const inputPath = process.argv[2];
const outputPath = process.argv[3];

if(!inputPath || !outputPath) {
    console.log("Usage: node mockgen.js <schema.json> <output.json>");
    process.exit(1);
}

const { faker } = require("@faker-js/faker");  // CommonJS
const RandExp = require("randexp");

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
        const cat = schema[field];
        let type, min, max, choices, regex, item;
        type=cat;

        if(typeof cat === "object" && !Array.isArray(cat) && !cat.type) {   
            //a nested object
            result[field]= generateData(cat);
            continue;
        }

        if(typeof cat === "object" && cat.type) {
            type = cat.type;
            min = cat.min;
            max = cat.max;
            choices=cat.choices;
            regex=cat.regex;
            item=cat.item;
        }

        if (type === "array") {
    
            const length = (min !== undefined && max !== undefined) ? Math.floor(Math.random() * (max - min + 1)) + min : 3;
            result[field] = Array.from({ length }, () => {
                if (item === undefined) return null; 
                //  Nested object ({ key1: ..., key2: ... })
                if (typeof item === "object" && !item.type && !Array.isArray(item)) {
                    return generateData(item);
                }
                //Schema object ({ type: "string", min: 3, max: 6 })
                if (typeof item === "object" && item.type) {
                    // Generate a single value from the schema
                    const singleValue = { value: item };
                    return generateData(singleValue).value;
                }
                // Case 3: Primitive string/number
                return generateData({ value: item }).value;
            });

    continue;
}


        if(choices) {
            if (!Array.isArray(choices)) {
            throw new Error(`choices must be an array for field "${field}"`);
    }
            result[field] = choices[Math.floor(Math.random()*choices.length)];
            continue;
        }

        if(regex && type=="string"){
            result[field] = new RandExp(regex).gen();
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
            result[field] = randomString(min ?? 6, max ?? 20);
        }

        else if (type === "integer") {
            result[field] = randomInteger(min ?? 0, max ?? 100);
        }

        else if (type === "float") {
            result[field] = randomFloat(min ?? 0, max ?? 10);
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