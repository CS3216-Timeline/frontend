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
  },
  latitude: 1.359237,
  longitude: 103.98934,
}

// returns memory data
export const getMemoryById = (id) => {
  return {
    ...mockMemoryData,
    memory_id: id
  }
}
