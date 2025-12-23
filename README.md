# Mock Data Forger

**Mock Data Forger** is an interactive web tool for generating mock JSON data based on customizable schemas. It allows users to design fields, set data types, apply constraints, and instantly generate mock data in the browser. Originally built as a CLI tool, it now offers a full-featured web interface while maintaining CLI compatibility for advanced users.

---

## Features

- **Web Interface**: Create schemas and generate mock data visually.
- **Live Preview**: See your JSON data update in real-time.
- **Flexible Data Types**: Supports strings, numbers, booleans, arrays, and nested objects.
- **Constraints**: Define min/max for numbers, string lengths, array lengths, and optional fields.
- **Schema Export**: Export your schema for CLI use or future reuse.

---

## Technologies Used

- **Frontend**: React, Vite, CSS Modules
- **Clipboard Support**: `navigator.clipboard`
- **JSON Validation & Mocking**: Custom JavaScript logic
- **Development Tools**: ESLint, Prettier
- **Optional CLI Support**: Node.js + Commander/Yargs for command-line generation

---

## Web Usage

1. Open the web app in your browser.
2. Add fields using the UI:
   - Set `name` for the field.
   - Select a `type`: string, number, boolean, array, object.
   - Define optional constraints: `min`/`max`, `length`, `optional`.
3. Click **Generate Mock Data**.
4. Export the schema if needed for CLI or future sessions.

---

## Example Schema (Web Format)

```json
{
  "fields": [
    { "name": "name", "type": "string" },
    { "name": "age", "type": "number", "min": 18, "max": 60 },
    { "name": "isActive", "type": "boolean" },
    { "name": "tags", "type": "array", "itemsType": "string", "length": 3 }
  ]
}
```

## Field Properties

- **name** — Field name (string)  
- **type** — string, number, boolean, array, object  
- **min / max** — Numeric constraints (optional)  
- **length** — String or array length (optional)  
- **itemsType** — Array item type (string, number, boolean, etc.)  
- **optional** — Boolean flag for optional fields (optional)  

---

## CLI Usage (Optional)

While the web version is the main interface, you can still use CLI mode:

```bash
node cli.js generate --schema schema.json --count 10 --output data.json
```
- Accepts the same schema format as the web app.  
- Generates a JSON file with mock data directly from the terminal.  

---

## Development & Setup

```bash
# Clone the repository
git clone <repo-url>
cd mock-data-forger

# Install dependencies
npm install

# Run the web app locally
npm run dev

# Build production version
npm run build
```

## Contribution

Pull requests and issues are welcome.

Follow standard ESLint/Prettier formatting.

Ensure schema compatibility between web and CLI.
