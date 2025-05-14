#!/bin/bash

# Find all files containing headers() and add dynamic export
find ./app -type f -name "*.js" -o -name "*.jsx" | while read -r file; do
    if grep -q "headers()" "$file"; then
        # Check if dynamic export already exists
        if ! grep -q "export const dynamic = \"force-dynamic\"" "$file"; then
            # Add dynamic export at the top of the file
            sed -i '1i export const dynamic = "force-dynamic";' "$file"
            echo "Added dynamic export to $file"
        else
            echo "Dynamic export already exists in $file"
        fi
    fi
done 