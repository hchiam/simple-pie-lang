/**
 * 1) go to https://en.wiktionary.org/wiki/Appendix:Proto-Indo-European_Swadesh_list
 * 2) paste this code in dev tools console
 * 3) hit Enter to run
 */

var table = [...$("table")].filter(
  (t) => !t.classList.contains("toccolours")
)[0];

var nonHeaderRows = table.querySelectorAll("tbody > tr");

var entries = [...nonHeaderRows].map((row) => {
  const td = [...row.querySelectorAll("td")];
  const english = td[1].innerText;
  const pie = simplerSpelling(td[2].innerText);
  return [english, pie];
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
