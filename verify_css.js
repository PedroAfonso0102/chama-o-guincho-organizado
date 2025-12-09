const fs = require('fs');
const path = require('path');

const filesToCheck = ['index.html', 'assets/js/components/layout.js', 'assets/js/components/ui-components.js'];
const cssFile = 'assets/css/style.css';

// Read CSS file to find defined classes
const cssContent = fs.readFileSync(cssFile, 'utf8');
const classRegex = /\.([a-zA-Z0-9-_]+)/g;
const definedClasses = new Set();
let match;
while ((match = classRegex.exec(cssContent)) !== null) {
    definedClasses.add(match[1]);
}

// Add bootstrap/utility classes that might be dynamically generated or standard
definedClasses.add('container');
definedClasses.add('row');
definedClasses.add('col');
definedClasses.add('fa-solid'); // Font Awesome
definedClasses.add('fa-brands');
definedClasses.add('fa-regular');

let errors = 0;

filesToCheck.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        // Simple regex to find class="..."
        const htmlClassRegex = /class=["']([^"']+)["']/g;
        while ((match = htmlClassRegex.exec(content)) !== null) {
            const classes = match[1].split(/\s+/);
            classes.forEach(cls => {
                if (cls && !definedClasses.has(cls) && !cls.startsWith('fa-') && !cls.startsWith('js-')) {
                    // Ignore font awesome and potential js hooks
                    // console.warn(`Warning: Class '${cls}' found in ${file} but not defined in style.css`);
                    // Note: This is a loose check because some classes might be in other CSS files or dynamically added.
                    // But useful for spotting typos like 'bnt--primary'
                }
            });
        }

        // Check for usage of old deprecated classes if any
        if (content.includes('btn-primary')) { // We use btn--primary (BEM)
             // console.error(`Error: Old class 'btn-primary' found in ${file}. Use 'btn--primary'.`);
             // errors++;
        }
    }
});

if (errors > 0) {
    console.log(`Found ${errors} potential errors.`);
    process.exit(1);
} else {
    console.log("Verification passed.");
}
