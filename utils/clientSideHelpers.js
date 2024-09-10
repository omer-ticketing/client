export const getTimeInSecFromNow = (time) => Math.round((new Date(time) - Date.now()) / 1000);
