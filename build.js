const { fontSplit } = require('cn-font-split');
const path = require('path');
const fs = require('fs-extra'); // Using fs-extra for easier directory management

const sourceDir = path.join(__dirname, 'source');
const distDir = path.join(__dirname, 'dist');
const fontsDistDir = path.join(distDir, 'fonts');

async function build() {
    // Ensure directories exist
    await fs.ensureDir(sourceDir);
    await fs.ensureDir(fontsDistDir);

    // Get all font files
    const files = await fs.readdir(sourceDir);
    const fontFiles = files.filter(file => /\.(ttf|otf|woff2?)$/i.test(file));

    console.log(`Found ${fontFiles.length} font(s) in source directory.`);

    for (const file of fontFiles) {
        const fontName = path.parse(file).name;
        const fontPath = path.join(sourceDir, file);
        const fontOutputDir = path.join(fontsDistDir, fontName);

        console.log(`Processing ${fontName}...`);

        const config = {
            input: fontPath,
            outDir: fontOutputDir,
            targetType: 'woff2',
            css: {
                // We'll rename the family to the filename for consistency if needed,
                // or let cn-font-split extract it.
                // However, usually users want the class name to match the file/repo name.
                fontFamily: fontName,
                fontWeight: 'bold' // You might want to detect this dynamically or config it if you add more fonts with different weights
            },
            testHtml: false, // We don't need testHtml for every sub-font in distribution
            chunkSize: 70 * 1024,
            previewImage: {},
            reporter: false
        };

        try {
            await fontSplit(config);

            // Post-processing: Move and rewrite CSS
            const cssPath = path.join(fontOutputDir, 'result.css'); // cn-font-split usually outputs result.css
            if (await fs.pathExists(cssPath)) {
                let cssContent = await fs.readFile(cssPath, 'utf8');

                // Rewrite URLs to point to the fonts subdirectory
                // The CSS will be moved to dist/, so relative path to fonts is ./fonts/{fontName}/
                const relativeFontPath = `./fonts/${fontName}/`;
                cssContent = cssContent.replace(/url\("\.\//g, `url("${relativeFontPath}`);

                // Save to dist root with the font name
                await fs.writeFile(path.join(distDir, `${fontName}.css`), cssContent);
                console.log(`Generated CSS: dist/${fontName}.css`);
            } else {
                console.warn(`Warning: No CSS generated for ${fontName}`);
            }

        } catch (e) {
            console.error(`Error processing ${fontName}:`, e);
        }
    }

    console.log('All builds completed!');
}

build();
