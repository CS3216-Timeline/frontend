// import server from "../utils/server"

const mockMemoryData = {
  memory_id: 4,
  date: "19 May 2021",
  title: "Mock Memory Title",
  description: "This is a mock card description. This is a mock card description. This is a mock card description. This is a mock card description. This is a mock card description.",
  media: {
    type: "IMAGE",
    source: {
      url: "https://images.megapixl.com/2485/24853666.jpg"
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

// TODO: connect with backend
export const deleteMemoryById = async (id) => {
  console.log('deleted');
  // const res = await server.delete(`${id}`);
  // return res.data
}
