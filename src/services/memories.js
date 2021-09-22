import server from "../utils/server";

// const getMockMediaUrls = () => 
//   // [0,1,2,3].map(i => ({position: i, url: "https://images.megapixl.com/2485/24853666.jpg"}))
//   []

// Use this function to convert blobURL to file
const blobToFile = (blob, fileName="default-name") => {
  const file = new File([blob], fileName, { type: "image/png" });
  return file
}

const convertCoordinatesToString = (memory) => {
  return {
    ...memory,
    latitude: memory.latitude.toString(),
    longitude: memory.longitude.toString(),
  }
}

const convertCoordinatesToFloat = (memory) => {
  return {
    ...memory,
    latitude: parseFloat(memory.latitude),
    longitude: parseFloat(memory.longitude),
  }
}

export const getMemoryById = async (memoryId) => {
  console.log("retrieving memory with id", memoryId);
  const res = await server.get(`memories/${memoryId}`);
  console.log("received memory with id", memoryId);  
  // TODO: Remove check once memories changed to memory
  const memory = res.data.memory
  return convertCoordinatesToFloat(memory);
}

export const createNewMemory = async (title, lineId, description, latitude, longitude, mediaUrls) => {
  console.log("Blob To File Test", mediaUrls.map(obj => blobToFile(obj.url)));
  const body = new FormData();
  body.append("title", title);
  body.append("line", lineId);
  body.append("lineId", lineId); // TODO: Remove either "line" or "lineId"
  body.append("description", description);
  body.append("latitude", latitude); // will be automatically string
  body.append("longitude", longitude);

  mediaUrls.forEach(im => {
  // getMockMediaUrls().forEach(im => {
    body.append("images", im);
  });

  console.log("POST memories/...");
  for (const [key, value] of body.entries()) {
    console.log(`FormData[${key}]: ${value}`);
  }

  const res = await server.post(`memories`, body);
  console.log(`done POST memories/${res.data.memory.memoryId}...`);
  return convertCoordinatesToFloat(res.data.memory);
}

export const editMemoryDetailsById = async (memoryId, title, description, line, longitude, latitude) => {
  const memoryData = {
    title, description, line, longitude, latitude, 
  };
  const body = convertCoordinatesToString(memoryData);
  console.log(`sending PATCH memories/${memoryId}...`);
  console.log(body);
  const res = await server.patch(`memories/${memoryId}`, body);
  console.log(`done PATCH memories/${memoryId}...`);
  console.log(res);
  return convertCoordinatesToFloat(res.data.memory);
}

export const deleteMemoryById = async (memoryId) => {
  console.log(`sending DELETE memories/${memoryId}...`)
  const res = await server.delete(`memories/${memoryId}`);
  console.log(`done DELETE memories/${memoryId}...`);
  return convertCoordinatesToFloat(res.data.memory);
}
