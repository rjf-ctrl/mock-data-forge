import React from "react";

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
        value={field.type || ""}
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
        <option value="string">String</option>
        <option value="integer">Integer</option>
        <option value="float">Float</option>
        <option value="boolean">Boolean</option>
        <option value="array">Array</option>
        <option value="object">Object</option>
      </select>

      {/* Min/Max for primitives */}
      {(field.type === "string" || field.type === "integer" || field.type === "float") && (
        <div className="min-max-container">
          <input
            placeholder="Min"
            value={field.min || ""}
            onChange={e => setField({ ...field, min: e.target.value })}
          />
          <input
            placeholder="Max"
            value={field.max || ""}
            onChange={e => setField({ ...field, max: e.target.value })}
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
