import server from "../utils/server";
import {
  addHash,
  removeHash
} from "./colors";

const mockLineData = {
  line_id: 1,
  memoryIds: [1, 2, 3],
  title: "Mok Family",
  color: "blue",
}

export const getAllLinesByUserIdOrderByMostRecentMemory = async () => {
  const res = await server.get('lines');
  let lines = res.data.lines;
  if (lines.length !== 0) {
    lines = lines.map(line => {
      return {
        ...line,
        'colour_hex': addHash(line["colour_hex"]),
      }
    });
  }
  return lines;
}

export const createNewLine = async (lineTitle, selectedColor) => {
  const body = {
    "line-name": lineTitle,
    "color-hex": removeHash(selectedColor),
  }
  const res = await server.post('lines', body);
  return res.lines;
}

// returns line data
export const getLineById = (id) => {
  return mockLineData
}
