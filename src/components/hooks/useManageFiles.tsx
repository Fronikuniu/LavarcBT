import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../configuration/firebase';

export async function UseAddImage(col: string, file: File): Promise<{ url: string; path: string }> {
  const imageRef = ref(storage, `${col}/${new Date().getTime()} - ${file.name}`);
  const snapshot = await uploadBytes(imageRef, file);
  const dlUrl: string = await getDownloadURL(ref(storage, snapshot.ref.fullPath));

  return { url: dlUrl, path: snapshot.ref.fullPath };
}

export async function UseRemoveImage(filePath: string) {
  await deleteObject(ref(storage, filePath));
}
