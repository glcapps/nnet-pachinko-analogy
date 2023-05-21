//utility functions
function makeQuickNumberedArray(Count) {
    return Array.apply(null, { length: Count }).map(Number.call, Number);
}
function getStringBetween(str, start, end) {
    let startoutset = str.indexOf(start),
        endoutset = str.indexOf(end, startoutset + start.length);
    if (startoutset == 0 || startoutset > endoutset) return "";
    return str.slice(startoutset + start.length, endoutset);
}
function shuffleArray(array) {
    return array.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}
function getHereDocFromCodeBlock(func) {
    return getStringBetween(func.toString().replace("/*" + here, "{{{start " + here + " }}}").replace(here + "*/", "{{{end " + here + " }}}"), "{{{start " + here + " }}}", "{{{end " + here + " }}}");
}