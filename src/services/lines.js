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

const mockMemoryData = {
  memory_id: 4,
  date: "19 May 2021",
  title: "Mok Family Gathering ",
  description: "This is a mock card description. This is a mock card description. This is a mock card description. This is a mock card description. This is a mock card description.",
  media: {
    type: "IMAGE",
    source: {
      url: "https://www.whiteroomstudio.com.sg/wordpress/wp-content/uploads/2020/05/Big-Family-Photoshoot-Singapore_003.jpg"
    }
  }
}


export const getAllLinesByUserIdOrderByMostRecentMemory = async () => {
  const res = await server.get('/api/lines');
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
  const res = await server.post('/api/lines', body);
  return res.lines;
}

// returns line data
export const getLineById = (id) => {
  return mockLineData
}

// returns memory data
export const getMemoryById = (id) => {
  return {
    ...mockMemoryData,
    memory_id: id
  }
}
