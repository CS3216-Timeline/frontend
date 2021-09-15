import {
  COLORS
} from "../utils/colors";
import server from "../utils/server";
import {
  addHash,
  removeHash
} from "./colors";

const mockLineData = {
  line_id: 1,
  memoryIds: [1, 2, 3],
  title: "Mok Family",
  color: COLORS.GREEN,
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

// TODO: update request endpoint after backend created the endpoint
export const editLineById = async (line_id, lineTitle, selectedColor) => {
  const body = {
    line_id,
    "line-name": lineTitle,
    "color-hex": removeHash(selectedColor),
  }
  const res = await server.post('lines', body);
  return res.lines;
}

// TODO: connect to backend after delete by id route is created
export const deleteLineById = async (line_id) => {
  console.log('deleted')
  // await server.delete(`lines/${line_id}`);
}

// returns line data
// remember to add a hash to the color
// rememebr to change to async
export const getLineById = (id) => {
  return mockLineData
}
