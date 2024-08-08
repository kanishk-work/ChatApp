export const convertFileToUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const url = URL.createObjectURL(file);
      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
};
