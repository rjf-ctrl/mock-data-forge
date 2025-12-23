import React from "react";
import { DATA_TYPES } from "./dataTypes";


function FieldEditor({ field, setField }) {
  return (
    <div className="field-card" data-type={field.type}>
      {/* Field Name */}
      <input
        className="field-input"
        placeholder="Field Name"
        value={field.name || ""}
        onChange={e => setField({ ...field, name: e.target.value })}
      />

      {/* Type Selector */}
        <select
        className="field-select"
        value={field.type}
        onChange={e => {
            const newType = e.target.value;

            setField({
            ...field,
            type: newType,
            min: "",
            max: "",
            item: newType === "array" ? field.item : null,
            fields: newType === "object" ? field.fields : []
            });
        }}
        >
        {DATA_TYPES.map(t => (
            <option key={t.value} value={t.value}>
            {t.label}
            </option>
        ))}
        </select>


      {/* Min/Max for primitives */}
      {["string", "integer", "float", "array"].includes(field.type) && (
        <div className="min-max-container">
          <input
            placeholder={field.type === "array" ? "Min items" : "Min"}
            value={field.min || ""}
            onChange={e => setField({ ...field, min: e.target.value })}
          />
          <input
            placeholder={field.type === "array" ? "Max items" : "Max"}
            value={field.max || ""}
            onChange={e => setField({ ...field, max: e.target.value })}
          />

        </div>
      )}

          {/*After your Type Selector & Min/Max section*/}
        {field.type !== "array" && field.type !== "object" && (
        <div className="choices-container">
            <input
            placeholder="Choices (space-separated)"
            value={field.choices || ""}
            onChange={e => setField({ ...field, choices: e.target.value })}
            />
        </div>
        )}


      {/* Array Item (recursive) */}
      {field.type === "array" && (
        <div className="nested-schema">
            <strong>Array Item</strong>

            {field.item ? (
            <FieldEditor
                field={field.item}
                setField={item => setField({ ...field, item })}
            />
            ) : (
            <button
                onClick={() =>
                setField({
                    ...field,
                    item: {
                    id: Date.now(),
                    name: "",
                    type: "string",
                    min: "",
                    max: "",
                    item: null,
                    fields: []
                    }
                })
                }
            >
                Add Array Item
            </button>
            )}
        </div>
        )}




      {/* Object Fields (recursive) */}
      {field.type === "object" && (
        <div className="nested-schema">
            {field.fields.map(child => (
            <FieldEditor
                key={child.id}
                field={child}
                setField={updatedChild => {
                const updatedFields = field.fields.map(f =>
                    f.id === child.id ? updatedChild : f
                );
                setField({ ...field, fields: updatedFields });
                }}
            />
            ))}
            <button
            onClick={() =>
                setField({
                ...field,
                fields: [...field.fields, { id: Date.now(), name: "", type: "string", min: "", max: "", item: null, fields: [] }]
                })
            }
            >
            Add Field
            </button>
        </div>
        )}

    </div>
  );
}

export default FieldEditor;
