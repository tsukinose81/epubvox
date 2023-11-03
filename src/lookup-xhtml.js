const { JSDOM } = require("jsdom");
const path = require("path");
const { readFile } = require("./utils");

const lookupPTag = (target, XHTMLPath) => {
  const XHTMLFullPath = path.join(target.path, XHTMLPath);
  const rawXHTML = readFile(XHTMLFullPath);
  const dom = new JSDOM(rawXHTML);
  const document = dom.window.document;
  let text = "";
  let texts = [];

  const ps = Array.from(document.getElementsByTagName("p"));
  ps.forEach((p, index) => {
    const rubys = Array.from(p.getElementsByTagName("ruby"));
    rubys.forEach((ruby) => {
      const rts = Array.from(ruby.getElementsByTagName("rt"));
      rts.forEach((rt) => ruby.removeChild(rt));
    });
    text += p.textContent;
    if ((index + 1) % 10 === 0) {
      texts.push(text);
      text = "";
    }
  });

  console.log(texts);
  // if ((pTags.length = 0)) throw new Error("pTags not found");
  return texts;
};

module.exports = { lookupPTag };
