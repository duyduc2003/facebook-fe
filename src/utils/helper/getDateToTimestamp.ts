const getDateToTimestamp = (
  timestamp: string
): { date: string; time: string } => {
  const timer = new Date(Number(timestamp));

  const format = (num: number) => (num < 10 ? `0${num}` : num);

  return {
    date: `${format(timer.getDate())}/${format(
      timer.getMonth() + 1
    )}/${timer.getFullYear()}`,
    time: `${format(timer.getHours())}:${format(timer.getMinutes())}`,
  };
};

export default getDateToTimestamp;
