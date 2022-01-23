/**
 * 1) go to https://en.wikipedia.org/wiki/Indo-European_vocabulary
 * 2) paste this code in dev tools console
 * 3) hit Enter to run
 */

// TODO: multiple tables' DOM, first cell of non-header rows

var tables = [...$(".mw-parser-output > table.wikitable")];

var tablesRows = tables.map((t) => [...t.querySelectorAll("tbody > tr")]);

var notesHeadingIndex = 0;
var derivativesHeadingIndex = 22;
var headings = [...$(".mw-parser-output > h2")]
  .map((h) => h.innerText.replace("[edit]", ""))
  .filter((_, i) => i > notesHeadingIndex && i < derivativesHeadingIndex);

var entries = tablesRows.map((table, index) => {
  const rows = table.filter((row) => row.querySelectorAll("th").length < 2);
  const tableName = headings[index];
  return {
    [tableName]: rows.map((row) => {
      const th = [...row.querySelectorAll("th")];
      const td = [...row.querySelectorAll("td")];
      const hasTH = th.length > 0;
      let english = "";
      let pie = "";
      if (hasTH) {
        english = td[0].innerText;
        pie = th[0].innerText;
      } else {
        english = td[1].innerText;
        pie = td[0].innerText;
      }
      pie = simplerSpelling(pie);
      return [english, pie];
    }),
  };
});

console.log(entries[0]);

copy({ entries });

function simplerSpelling(pie) {
  return pie
    .replaceAll("*", "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll("h₁", "")
    .replaceAll("h₂", "a")
    .replaceAll("h₃", "o")
    .replaceAll("ʷ", "w")
    .replaceAll("ʰ", "h");
}
