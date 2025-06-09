export const getPath = (url: string) => {
  const publicUrl = url;
  const parts = publicUrl.split('/warket-items/');
  return parts[1];
};
