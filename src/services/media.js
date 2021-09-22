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
  console.log(`sending POST media/updates...`)
  console.log(body);
  const res = await server.post(`media`);
  console.log(`done POST media/updates...`, body);
  return res.data.media;
}

export const getMediaUrl = (mediaId) => {
    // currently not needed
    console.log("fetching media url for", mediaId)
}

export const deleteMediaById = async (mediaId) => {
  console.log(`sending DELETE media/${mediaId}...`)
  const res = await server.delete(`media/${mediaId}`);
  console.log(`done DELETE media/${mediaId}...`);
  return res.data.media;
}
