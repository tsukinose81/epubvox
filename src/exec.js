// const { lookupOPFPath, lookupXHTMLPaths } = require("./lookup-xml");
// const { lookupPTag } = require("./lookup-xhtml");
// const { convertVox } = require("./convert-vox");

// const exec = (target) => {
//   const opfPath = lookupOPFPath(target);
//   const XHTMLPaths = lookupXHTMLPaths(target, opfPath);
//   let chapter = 1;

//   XHTMLPaths.forEach(async (XHTMLPath, xhtmlIndex) => {
//     const texts = lookupPTag(target, XHTMLPath);
//     if (!texts.length) return;

//     texts.forEach(async (text, lineIndex) => {
//       await convertVox(target, text, chapter, lineIndex);
//     });
//     chapter++;
//   });

//   return target;
// };

// module.exports = exec;

const { lookupOPFPath, lookupXHTMLPaths } = require("./lookup-xml");
const { lookupPTag } = require("./lookup-xhtml");
const { convertVox } = require("./convert-vox");

const exec = async (target) => {
  const opfPath = lookupOPFPath(target);
  const XHTMLPaths = lookupXHTMLPaths(target, opfPath);
  let chapter = 1;

  for (const XHTMLPath of XHTMLPaths) {
    const texts = lookupPTag(target, XHTMLPath);
    if (!texts.length) continue;

    for (let lineIndex = 0; lineIndex < texts.length; lineIndex++) {
      await convertVox(target, texts[lineIndex], chapter, lineIndex);
    }
    chapter++;
  }

  return target;
};

module.exports = exec;
