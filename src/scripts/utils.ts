import data from "../data/celebs.json";
const rand = require("seedrandom");

function getCelebs(data: any, group: string) {
  return Object.keys(data.counts[group]).sort();
}

export function randomCelebs(range: string, group: string, count: number) {
  var d = new Date();
  if (range === "week") {
    d.setDate(d.getDate() + ((5 - d.getDay()) % 7 || 7));
  }
  d.setHours(0, 0, 0, 0);
  const rng = rand(d.toString());
  let celebs = getCelebs(data, group);
  let selected = Array();
  for (let i = 0; i < count; i++) {
    selected.push(celebs.splice(Math.floor(rng() * celebs.length), 1)[0]);
  }
  return selected;
}

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
