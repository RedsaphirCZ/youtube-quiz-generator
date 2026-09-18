export const MAX_IMAGE_BYTES = 12 * 1024 * 1024;

export function readImageFile(file: Blob): Promise<string> {
  if (file.size > MAX_IMAGE_BYTES) return Promise.reject(new Error('Use an image smaller than 12 MB.'));
  if (!/^image\/(png|jpeg|webp|gif|svg\+xml)$/.test(file.type)) return Promise.reject(new Error('Use PNG, JPEG, WebP, GIF or SVG.'));
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read the image.'));
    reader.readAsDataURL(file);
  });
}

/** Decode actual image bytes before declaring an asset usable. */
export async function verifyImage(src: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const image = new Image();
    const timer = setTimeout(() => { image.src = ''; reject(new Error('Image took too long to load. Replace it with a local file.')); }, 10000);
    const finish = (error?: Error) => { clearTimeout(timer); image.onload = null; image.onerror = null; error ? reject(error) : resolve(); };
    image.onload = () => finish(image.naturalWidth && image.naturalHeight ? undefined : new Error('The image is empty.'));
    image.onerror = () => finish(new Error('This file cannot be displayed as an image. Please replace it.'));
    image.src = src;
  });
}

export async function embedImage(src: string): Promise<string> {
  if (!src) throw new Error('Choose a picture for this question.');
  if (src.startsWith('data:image/')) { await verifyImage(src); return src; }
  let response: Response;
  try { response = await fetch(src, { credentials: 'omit', signal: AbortSignal.timeout(10000) }); }
  catch { throw new Error('This link could not be copied into the project. Upload a local picture instead.'); }
  if (!response.ok) throw new Error('Image link failed. Upload a local picture instead.');
  const data = await readImageFile(await response.blob());
  await verifyImage(data);
  return data;
}
