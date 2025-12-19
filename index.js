const names = ["Alice", "Bob", "Charlie", "Diana"];

function generateData(schema) {
    const result = {};

    for(const field in schema) {
        const type = schema[field];

        if(type === "boolean") {
            result[field] = Math.random() <0.5;
        }

        if (type === "name") {
            result[field] = names[Math.floor(Math.random() * names.length)];
        }

        if (type === "uuid") {
        result[field] = Math.random().toString(36).substring(2,10);
        }

    } return result;
}

const schema = {
    id: "uuid",
    full_name: "name",
    is_active: "boolean",
};

const output = generateData(schema);
console.log(output);