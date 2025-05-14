const fs = require('fs');
const path = require('path');

// Directory containing schema files
const SCHEMAS_DIR = './app/lib/models';

// Function to parse schema file and find duplicate indexes
function findDuplicateIndexes(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Find fields with index: true in schema definition
    const schemaIndexes = new Set();
    const schemaRegex = /(\w+):\s*{[^}]*index:\s*true[^}]*}/g;
    let match;
    
    while ((match = schemaRegex.exec(content)) !== null) {
        const fieldMatch = match[1].match(/(\w+):/);
        if (fieldMatch) {
            schemaIndexes.add(fieldMatch[1]);
        }
    }
    
    // Find schema.index() calls
    const explicitIndexes = new Set();
    const indexRegex = /schema\.index\(\s*{\s*['"](\w+)['"]\s*:/g;
    
    while ((match = indexRegex.exec(content)) !== null) {
        explicitIndexes.add(match[1]);
    }
    
    // Find duplicates
    const duplicates = [...schemaIndexes].filter(field => explicitIndexes.has(field));
    
    return {
        filePath,
        duplicates,
        content
    };
}

// Function to remove duplicate schema.index() calls
function removeDuplicateIndexes(file) {
    if (file.duplicates.length === 0) {
        console.log(`No duplicate indexes found in ${file.filePath}`);
        return;
    }
    
    let content = file.content;
    const indexRegex = /schema\.index\(\s*{\s*['"](\w+)['"]\s*:[^}]*}\s*\);/g;
    
    // Remove schema.index() calls for duplicate fields
    content = content.replace(indexRegex, (match, field) => {
        if (file.duplicates.includes(field)) {
            console.log(`Removing duplicate index for ${field} in ${file.filePath}`);
            return '';
        }
        return match;
    });
    
    // Write the modified content back to the file
    fs.writeFileSync(file.filePath, content);
    console.log(`Updated ${file.filePath}`);
}

// Main function
function main() {
    // Get all schema files
    const schemaFiles = fs.readdirSync(SCHEMAS_DIR)
        .filter(file => file.endsWith('.js'))
        .map(file => path.join(SCHEMAS_DIR, file));
    
    // Process each schema file
    schemaFiles.forEach(filePath => {
        const file = findDuplicateIndexes(filePath);
        removeDuplicateIndexes(file);
    });
}

// Run the script
main(); 