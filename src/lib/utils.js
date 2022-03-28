import moment from "moment";

export function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatDate(date) {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
}
