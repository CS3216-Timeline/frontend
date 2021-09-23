import server from "../utils/server";

export const getMemoriesByDate = async (selectedDate) => {
  try {
    const year = selectedDate.getUTCFullYear();
    const month = selectedDate.getUTCMonth() + 1;
    const day = selectedDate.getUTCDate() + 1;
    const res = await server.get(`/memories/${year}/${month}/${day}`)
    return res.data.memories
  } catch (err) {
    throw err;
  }
}
