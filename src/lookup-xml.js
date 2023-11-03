const path = require("path");
const { XMLParser, XMLBuilder } = require("fast-xml-parser");
const { readFile } = require("./utils");

const XMLParse = (rawXML) => {
  const parserOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: "__",
  };
  const parser = new XMLParser(parserOptions);
  return parser.parse(rawXML);
};

/**
  get path of opf from META-INF/container.xml
**/
const lookupOPFPath = (target) => {
  const containerXMLPath = path.join(target.path, "META-INF", "container.xml");
  const rawXML = readFile(containerXMLPath);
  const xml = XMLParse(rawXML);
  const opfPath = xml.container.rootfiles.rootfile["__full-path"];
  return opfPath;
};

const lookupXHTMLPaths = (target, opfPath) => {
  const opfFullPath = path.join(target.path, opfPath);
  const rawOPF = readFile(opfFullPath);
  const opf = XMLParse(rawOPF);

  const manifest = opf.package.manifest.item;

  const itemsWithMediaType = manifest.filter(
    (item) => item["__media-type"] === "application/xhtml+xml"
  );
  return itemsWithMediaType.map((item) => item["__href"]);
};

module.exports = { lookupOPFPath, lookupXHTMLPaths };
