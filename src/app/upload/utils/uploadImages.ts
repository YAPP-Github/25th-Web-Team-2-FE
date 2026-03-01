export const uploadImages = async (
  images: (File | string)[],
  uploadImageMutation: (file: File) => Promise<string>,
): Promise<string[]> => {
  const newFiles = images.filter((img): img is File => img instanceof File);
  const uploaded = await Promise.all(newFiles.map(uploadImageMutation));

  let index = 0;
  return images.map((img) => (img instanceof File ? uploaded[index++] : img)) as string[];
};
