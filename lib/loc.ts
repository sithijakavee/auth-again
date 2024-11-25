export const getClientLocation = async () => {
  const res = await fetch("https://ipinfo.io/json");
  const locationData = await res.json();

  return locationData;
};
