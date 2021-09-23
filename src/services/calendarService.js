import server from "../utils/server";

export const getMemoriesByDate = async (selectedDate) => {
  try {
    console.log(selectedDate)
    const year = selectedDate.getUTCFullYear();
    const month = selectedDate.getUTCMonth() + 1;
    const day = selectedDate.getUTCDate() + 1;
    console.log("year", year)
    console.log("month", month)
    console.log("day", day)
    const res = await server.get(`/memories/${year}/${month}/${day}`)
    return res.data.memories
  } catch (err) {
    throw err;
  }
}
