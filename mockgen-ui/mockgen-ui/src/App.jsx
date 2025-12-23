import {useState} from "react";
import './App.css';
import FieldEditor from "./FieldEditor";
import buildSchema from './BuildSchema';


function App() {
  const [fields, setFields] = useState([]);
  const [schema, setSchema] = useState({});
  const [mockData, setMockData] = useState(null);


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
        setFields([...fields, {id: Date.now(), name: "", type: "string", min: "", max: "", item: null, fields: [] }]);
        }
      }
    >
      Add Field
    </button>
  

    {fields.map(field => (
      <FieldEditor
        key={field.id}
        field={field}
        setField={updatedField =>
          setFields(fields.map(f => f.id === field.id ? updatedField : f))
        }
      />
    ))}

    <button
      className="button button-generate"
      onClick={async () => {
      const newSchema = {};
      fields.forEach(field => {
        if (!field.name) return;
        newSchema[field.name] = buildSchema(field);
      });

      setSchema(newSchema);

      const res = await fetch("http://localhost:3001/generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchema)
      });

      const data = await res.json();
      setMockData(data);

      }}
    >
      Generate Mock Data
    </button>

    </div>
     
    <div className="json-column">
      <h3>Mock Data</h3>
      {mockData && (
      <pre>{JSON.stringify(mockData, null, 2)}</pre>
    )}

    </div>
    </div>
    </div>
    
  )
}

export default App;
