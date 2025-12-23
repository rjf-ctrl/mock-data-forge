import React from "react";

function buildSchema(field) {
  let schema = { type: field.type };

  // For primitives
  if (field.type !== "array" && field.type !== "object" && field.type !== "boolean") {
    if (field.min !== "") schema.min = Number(field.min);
    if (field.max !== "") schema.max = Number(field.max);

    if (field.choices && field.choices.trim() !== "") {
      schema.choices = field.choices.trim().split(/\s+/);
    }

    return schema;
  }

  // For arrays
  if (field.type === "array") {
    schema.min = field.min !== "" ? Number(field.min) : undefined;
    schema.max = field.max !== "" ? Number(field.max) : undefined;
    if (field.item) schema.items = buildSchema(field.item);

    // If the array itself has choices (rare, but possible), include them
    if (field.choices && field.choices.trim() !== "") {
      schema.choices = field.choices.trim().split(/\s+/);
    }

    return schema;
  }

  // For objects
  if (field.type === "object") {
    schema.properties = {};
    field.fields.forEach(child => {
      if (!child.name) return;
      schema.properties[child.name] = buildSchema(child);
    });

    // If the object itself has choices (rare), include them
    if (field.choices && field.choices.trim() !== "") {
      schema.choices = field.choices.trim().split(/\s+/);
    }

    return schema;
  }
}

export default buildSchema;
