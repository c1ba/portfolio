const fs = require('fs');

module.exports = function (source) {
  const svgRegex = /(import \w+ from ('|").*.svg('|"))/gi;
  const matches = source.match(svgRegex);
  if (!matches) {
    return source;
  }
  const callback = this.async();

  try {
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
            // Taking 1st capturing group a.k.a the name of the import;
            const componentName =
              importDeclaration.match(/(?:import )(\w+)/)[1];
            if (!componentName) {
              console.warning(
                'SVG component name could not be extracted. Skipping...',
              );
              return;
            }

            // TODO: refactor regex to include cases like endlines and tabs instead of space
            const svgTag = svgContent.match(/(?:<svg.*)(>)/);
            // Take the match and the first capture group aka closing arrow and add destructured props
            const processedSvgTag = svgTag[0].replace(svgTag[1], '{...props}>');
            // Take the match and replace it with the processed SVG tag
            const processedSvgContent = svgContent.replace(
              svgTag[0],
              processedSvgTag,
            );

            // Export as React component
            const code = `
            import { SVGProps } from "react"
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

    Promise.all(reactSvgs).then((svgs) => {
      const newSource = svgs.join(' ') + source;
      // console.log(svgs.join(' ') + source);
      callback(null, newSource);
    });
    //   console.log(reactComponents);
    //   console.log(reactComponents.join(' ') + source);
    //   return reactComponents.join(' ') + source; // Return the transformed code
  } catch (err) {
    console.error(err);
    return source;
  }
};
