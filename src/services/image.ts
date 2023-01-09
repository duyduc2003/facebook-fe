import { storage } from 'appFirebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

type UploadImageProps = {
  type: 'posts' | 'avatar';
  file: any;
};

export const uploadImage = async ({ file, type }: UploadImageProps) => {
  const storageRef = ref(storage, `images/${type}/${file?.name || ''}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  let url = null;
  if ((await uploadTask).state === 'success') {
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    url = downloadURL;
  }

  return { imageUrl: url } as const;
};
