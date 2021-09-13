export const filterLines = (searchText, lines) => {
  if (searchText === "") {
    return lines;
  }
  let clonedLines = [...lines];
  clonedLines = clonedLines.filter(line => line.name.includes(searchText));
  return clonedLines;
}