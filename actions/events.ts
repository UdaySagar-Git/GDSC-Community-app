export const getUpcomingEvents = async () => {
  const response = await fetch("https://gdsc-vnrvjiet-backend-updated-tau.vercel.app/Events/get-upcoming-events");
  const data = await response.json();
  return data.payload;
};

export const getPastEvents = async () => {
  const response = await fetch("https://gdsc-vnrvjiet-backend-updated-tau.vercel.app/Events/get-past-events");
  const data = await response.json();
  return data.payload.reverse();
};
