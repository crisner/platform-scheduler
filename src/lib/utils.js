export const getParsedTrainData = () => {
  const storedData = localStorage.getItem("trains");
  return storedData ? JSON.parse(storedData) : [];
};
