const getDateToTimestamp = (
  timestamp: string
): { date: string; time: string } => {
  const timer = new Date(Number(timestamp));

  return {
    date: `${timer.getDate()}/${timer.getMonth() + 1}/${timer.getFullYear()}`,
    time: `${timer.getHours()}:${timer.getMinutes()}`,
  };
};

export default getDateToTimestamp;
