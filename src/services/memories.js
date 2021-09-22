import server from "../utils/server";

const getMockMediaUrls = () => 
  // [0,1,2,3].map(i => ({position: i, url: "https://images.megapixl.com/2485/24853666.jpg"}))
  []

// Use this function to convert blobURL to file
const blobToFile = (blob, fileName="default-name") => {
  const file = new File([blob], fileName, { type: "image/png" });
  return file
}

export const getMemoryById = async (memoryId) => {
  console.log("retrieving memory with id", memoryId);
  const res = await server.get(`memories/${memoryId}`);
  console.log("received memory with id", memoryId);  

  return { ...res.data.memories, mediaUrls: getMockMediaUrls() };
}

export const createNewMemory = async (title, lineId, description, latitude, longitude, mediaUrls) => {
  console.log("Blob To File Test", mediaUrls.map(obj => blobToFile(obj.url)));
  const body = new FormData();
  body.append("title", title);
  body.append("line", lineId);
  body.append("lineId", lineId); // TODO: Remove either "line" or "lineId"
  body.append("description", description);
  body.append("latitude", latitude);
  body.append("longitude", longitude);

  // mediaUrls.forEach(im => {
  getMockMediaUrls().forEach(im => {
    body.append("images", im);
  });

  console.log("POST memories/...");
  for(var pair of body.entries()) {
    console.log(`FormData[${pair[0]}]: ${pair[1]}`);
  }

  const res = await server.post(`memories`, body);
  console.log(`done POST memories/${res.data.memory.memoryId}...`);
  return res.data.memory;
}

export const editMemoryDetailsById = async (memoryId, title, description, line, longitude, latitude, creationDate = null) => {
  const body = {
    title, description, line, longitude, latitude, lineId: line, creationDate
  }
  console.log(`sending PATCH memories/${memoryId}...`);
  console.log(body);
  const res = await server.patch(`memories/${memoryId}`, body);
  console.log(`done PATCH memories/${memoryId}...`);
  console.log(res);
  return res.data.memory;
}

export const deleteMemoryById = async (memoryId) => {
  const res = await server.delete(`memories/${memoryId}`);
  return res.data.memory;
}
