import React from "react";

function buildSchema(field) {
  // Base schema
  const schema = {
    type: field.type
  };

  // Primitive constraints
  if (field.min !== "") schema.min = Number(field.min);
  if (field.max !== "") schema.max = Number(field.max);

  // Array
  if (field.type === "array" && field.item) {
    schema.items = buildSchema(field.item);
  }

  // Object
  if (field.type === "object") {
    schema.properties = {};
    field.fields.forEach(child => {
      schema.properties[child.name] = buildSchema(child);
    });
  }

  return schema;
}

export default buildSchema;