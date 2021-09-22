import server from "../utils/server";

// Use this function to convert blobURL to file
const blobToFile = (blob, fileName="default-name", type="image/png") => {
  const file = new File([blob], fileName, { type });
  return file
}

// TODO: still draft
export const createNewMedia = async (media, memoryId) => {
  const body = new FormData(); 
  body.append("memoryId", memoryId);
  body.append("position", media.position);

  const loadImageFile = async (url, idx) => {
    const filename = `im-${idx}`;
    await fetch(url)
      .then(res => res.blob())
      .then(blob => blobToFile(blob, filename))
      .then(file => body.append("images", file));
  };

  await loadImageFile(media.url, media.position);

  console.log("POST media/...");
  for (const [key, value] of body.entries()) {
    console.log(`FormData[${key}]: ${value}`);
  }
  const res = await server.post("media", body);
  console.log(`done POST media/${res.data.media.mediaId}...`);
  console.log("response", res.data.media)
  return res.data.media;
}

export const updateMediaPositions = async (memoryId, mediaUrls) => {
  const updates = mediaUrls.map(media => {
    const { mediaId, position } = media;
    return { mediaId, position };
  });
  const body = {
    updates,
    memoryId,
  }
  console.log(`sending POST media/positions...`)
  console.log(body);
  const res = await server.post(`media/positions`);
  console.log(`done POST media/positions...`, res);
  return res.data;
}

export const deleteMediaById = async (mediaId) => {
  console.log(`sending DELETE media/${mediaId}...`)
  const res = await server.delete(`media/${mediaId}`);
  console.log(`done DELETE media/${mediaId}...`);
  console.log("response", res.data.media)
  return res.data.media; // [ deletedMedia ] // by right only one inside array
}
