import {useState} from "react";
import './App.css';

function App() {
  const [fields, setFields] = useState([]);
  const [schema, setSchema] = useState({});

  return (
    <div className="app-container">
      <header className="header">
        Mock Data Forge
      </header>
    <div className="main-content">
    <div className="form-column">
  
    <button
      className= "button button-add"
      onClick={() => {
        setFields([...fields, {id: Date.now(), name: "", type: "string", min: "", max: ""}]);
        }
      }
    >
      Add Field
    </button>
  

    {fields.map(field => (
      <div 
        key={field.id} className="field-card">
        <input
          className="field-input"
          placeholder="Field Name"
          value={field.name}
          onChange = {e => {
            setFields(fields.map(f => {
              return f.id === field.id ? {...f, name: e.target.value} : f;
            }));
            }
          }
        >
        </input>
        <select
          className="field-select"
          value={field.type}
          onChange={e => {
            setFields(fields.map(f =>
             f.id === field.id ? { ...f, type: e.target.value } : f
            ));
          }}
        >
          <option value="string">String</option>
          <option value="integer">Integer</option>
          <option value="float">Float</option>
          <option value="boolean">Boolean</option>
          <option value="array">Array</option>
          <option value="object">Object</option>
        </select>

        {(field.type === "string" || field.type === "integer" || field.type === "float") && (
            <div className="min-max-container">
            <input
              placeholder="Min"
              value={field.min}
              onChange={e=> {
                setFields(fields.map(f => 
                  f.id === field.id ? {...f, min: e.target.value} : f
                ));
              }}
            />

            <input
              className="min-max-input"
              placeholder="Max"
              value={field.max}
              onChange={e => {
                setFields(fields.map(f =>
                  f.id === field.id ? { ...f, max: e.target.value } : f
                ));
              }}
            />

            </div>
        )}
        
      </div>
    ))}

    <button
      className="button button-generate"
      onClick={() => {
        const newSchema = {};
        fields.forEach(f => {
          newSchema[f.name] = {
            type: f.type,
            ...(f.min!="" && { min: Number(f.min) }),
            ...(f.max !== "" && { max: Number(f.max) })
          };
        });
        setSchema(newSchema);
        console.log(schema);
      }}
    >
      Generate Schema
    </button>
    </div>
     
    <div className="json-column">
      <pre>{JSON.stringify(schema, null, 2)}</pre>
    </div>
    </div>
    </div>
    
  )
}

export default App;
