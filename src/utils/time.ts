export const getTrackDuration = (millisec: number) => {
  const time = new Date(millisec);
  return `${time.getMinutes()} min, ${time.getSeconds()} sec`;
};
