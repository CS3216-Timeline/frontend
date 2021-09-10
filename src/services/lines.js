// Contains services for line component

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

// returns line data
export const getLineById = (id) => {
  return mockLineData
}

// returns memory data
export const getMemoryById = (id) => {
  return {...mockMemoryData, memory_id: id}
}
