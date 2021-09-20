const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.src = url
  })

const getRadianAngle = (degreeValue) => {
  return (degreeValue * Math.PI) / 180
}

export const getCroppedImage = async (imageSrc, pixelCrop, rotation = 0) => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  if (navigator.platform !== "iPad" && navigator.platform !== "iPhone" && navigator.platform !== "iPod") {
    ctx.width = window.outerWidth;
    //I'll use window.innerWidth in production
  } else {
    // ctx.width = window.innerWidth;
    // eslint-disable-next-line no-restricted-globals
    ctx.width = screen.width;
    // ctx.width = document.body.getBoundingClientRect().width
  }
  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea
  canvas.height = safeArea
  console.log(canvas)

  // translate canvas context to a central location on image to allow rotating around the center.
  // ctx.translate(safeArea / 2, safeArea / 2)
  // ctx.rotate(getRadianAngle(rotation))
  // ctx.translate(-safeArea / 2, -safeArea / 2)

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  )
  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  )

  // // As Base64 string
  // return canvas.toDataURL('image/jpeg');
  console.log('canvas', canvas.width)
  console.log('ctx', JSON.stringify(ctx))
  alert(`canvasWidth: ${canvas.width}, canvasHeight: ${canvas.height}, ctx: ${JSON.stringify(ctx)}`);
  // eslint-disable-next-line no-restricted-globals
  alert(`documentblahblah: ${document.body.getBoundingClientRect().width}, screen.width: ${screen.width}, window.innerWidth: ${window.innerWidth}`);
  // As a blob
  return new Promise(resolve => {
    canvas.toBlob(file => {
      resolve(URL.createObjectURL(file))
    }, 'image/png')
  })
}
