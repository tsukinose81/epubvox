const { lookupOPFPath, lookupXHTMLPaths } = require("./lookup-xml");
const { lookupPTag } = require("./lookup-xhtml");
const { convertVox } = require("./convert-vox");

const exec = (target) => {
  const opfPath = lookupOPFPath(target);
  const XHTMLPaths = lookupXHTMLPaths(target, opfPath);
  let chapter = 1;

  XHTMLPaths.forEach((XHTMLPath) => {
    const texts = lookupPTag(target, XHTMLPath);
    if (!texts.length) return;

    texts.forEach((text, lineIndex) => {
      convertVox(target, text, chapter, lineIndex);
    });
    chapter++;
  });

  return target;
};

module.exports = exec;
