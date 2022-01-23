/**
 * run the following command in your CLI:
 * node json_to_md.js
 */

const fileName = "entries_swadesh.json"; // TODO: entries_vocab.json

const fs = require("fs");
fs.readFile(fileName, "utf8", function (err, data) {
  if (err) return console.log(err);
  processFileText(data);
});

function processFileText(jsonText) {
  const json = JSON.parse(jsonText);
  const text = jsonHierarchyToMarkdown(json);
  fs.writeFile("entries_swadesh.md", text, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function jsonHierarchyToMarkdown(jsonObject) {
  const entries = jsonObject.entries;
  return entriesToMarkdownTable(entries);
}

function entriesToMarkdownTable(arrayOfEnglishPIEPairs) {
  let tableHeader = "| English | PIE |" + "\n" + "| - | - |" + "\n";
  return (
    tableHeader +
    arrayOfEnglishPIEPairs
      .map((e) => `| ${e[0]} | ${e[1] || "(?)"} |`)
      .join("\n")
  );
}
