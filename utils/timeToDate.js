export function convertDate(time) {
  const timeArray = time.split(":");
  const hour = parseInt(timeArray[0]);
  const minutes = parseInt(timeArray[1]);
  const sec = parseInt(timeArray[2]);

  return new Date(1970, 0, 1, hour, minutes, sec, 0, 0);
}

export function playTime(t) {
  const milsec = Math.floor(t * 1000);
  return new Date(1970, 0, 1, 0, 0, 0, milsec);
}
