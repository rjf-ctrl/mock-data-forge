const fs = require("fs");
const name = JSON.parse(fs.readFileSync("names.json", "utf-8"));
const {
    randomPerson,
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
            result[field] = randomPerson(name).First;
        }

        if (type === "last name") {
            result[field] = randomPerson(name).Last;
        }

        if (type === "middle name") {
            result[field] = randomPerson(name).Mid;
        }

        if (type === "full name") {
            result[field] = randomPerson(name).Full;
        }

        if (type === "uuid") {
        result[field] = Math.random().toString(36).substring(2,10);
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
            result[field] = randomPerson(name).Email;
        }

        if (type === "phone") {
            result[field] = randomPerson(name).Phone;
        }

        if (type === "image") {
            result[field] = randomImageUrl();
        }

         if (type === "file") {
            result[field] = randomFileUrl();
        }
    } return result;
}

const schema = {
    id: "uuid",
    age: "integer",
    decimal: "float",
    gibberish: "string",
    first_name: "first name",
    last_name: "last name",
    middle_name: "middle name",
    full_name: "full name",
    email: "email",
    phone: "phone",
    is_active: "boolean",
    image: "image",
    file: "file"
};

const output = generateData(schema);
console.log(output);