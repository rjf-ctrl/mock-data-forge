const fs = require("fs");
const name = JSON.parse(fs.readFileSync("names.json", "utf-8"));


function randomPerson() {
    return name[Math.floor(Math.random() * name.length)];
}


function randomString(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let str = "";

  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }

  return str;
}


function randomInteger(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min = 0, max = 10, decimals = 2) {
  const num = Math.random() * (max - min) + min;
  return Number(num.toFixed(decimals));
}


function generateData(schema) {
    const result = {};

    for(const field in schema) {
        const type = schema[field];

        if(type === "boolean") {
            result[field] = Math.random() <0.5;
        }

        if (type === "first name") {
            result[field] = randomPerson().First;
        }

        if (type === "last name") {
            result[field] = randomPerson().Last;
        }

        if (type === "middle name") {
            result[field] = randomPerson().Mid;
        }

        if (type === "full name") {
            result[field] = randomPerson().Full;
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
            result[field] = randomPerson().Email;
        }

        if (type === "phone") {
            result[field] = randomPerson().Phone;
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

};

const output = generateData(schema);
console.log(output);