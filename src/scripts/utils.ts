import data from "../data/celebs.json";
import rand from "seedrandom";

function getCelebs(data: any, group: string) {
  return Object.keys(data.counts[group]).sort();
}

export function randomCelebs(range: string, group: string, count: number) {
  const d = new Date();
  if (range === "week") {
    d.setDate(d.getDate() + ((5 - d.getDay()) % 7 || 7));
  }
  d.setHours(0, 0, 0, 0);
  const rng = rand(d.toString());
  const celebs = getCelebs(data, group);
  const selected = [];

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
