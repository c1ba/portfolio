const fs = require('fs');

module.exports = function (source) {
  // Get all the SVG import declarations. If none found, return source as is.
  const svgRegex = /(import \w+ from ('|").*.svg('|"))/gi;
  const matches = source.match(svgRegex);

  if (!matches) {
    return source;
  }

  const callback = this.async();
  try {
    // Create promises for converting the SVGs into React Components.
    const reactSvgs = matches.map((importDeclaration) => {
      const pathRegex = /(('|").*.svg('|"))/i;
      const path = importDeclaration.match(pathRegex)?.[0];
      if (!path) {
        console.warning('SVG path could not be extracted. Skipping...');
        return;
      }
      const sanitizedPath = path.replaceAll(`'`, '');
      return new Promise((resolve, reject) => {
        this.resolve(this.context, sanitizedPath, (err, result) => {
          if (err) {
            reject(err);
          }
          try {
            const svgContent = fs.readFileSync(result, 'utf-8');

            // Taking 1st capturing group a.k.a the name of the import.
            // import SomeSVG from 'svg/path'; => SomeSVG
            const componentName =
              importDeclaration.match(/(?:import )(\w+)/)[1];
            if (!componentName) {
              console.warning(
                'SVG component name could not be extracted. Skipping...',
              );
              return;
            }

            // Take the opening svg tag, where the closing arrow is a capturing group and process it.
            // Then replace the original tag with the processed one.
            const svgTag = svgContent.match(/(?:<svg(.|\n)+?)(>)/);
            const processedSvgTag = svgTag[0].replace(svgTag[1], '{...props}>');
            const processedSvgContent = svgContent.replace(
              svgTag[0],
              processedSvgTag,
            );

            // Export as React component
            const code = `
            import { SVGProps } from "react";
            const ${componentName} = (props: SVGProps<SVGSVGElement>) => {
                return ${processedSvgContent};
            };
        `;
            source.replace(importDeclaration, '');

            resolve(code);
          } catch (err) {
            reject(err);
          }
        });
      });
    });

    // Add all the SVGs to the source. If the process fails, return the original source
    Promise.all(reactSvgs)
      .then((svgs) => {
        const newSource = svgs.join(' ') + source;
        callback(null, newSource);
      })
      .catch((err) => {
        console.error(err);
        callback(null, source);
      });
    //   return source; // Return the transformed code
  } catch (err) {
    console.error(err);
    return source;
  }
};
