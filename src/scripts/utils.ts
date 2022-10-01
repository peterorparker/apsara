import data from "../data/celebs.json";
import rand from "seedrandom";

type celebGroupType = keyof typeof data.files;
// type celebNameType = keyof typeof data.files[celebGroupType];

function getCelebs(group: celebGroupType) {
  return Object.keys(data.counts[group]).sort();
}

// function getRandomImage(group: celebGroupType, name: celebNameType) {
//   const files = data.files[group][name];
//   return "/apsara/" + files[Math.floor(Math.random() * files.length)];
// }

export function randomCelebs(
  range: string,
  group: celebGroupType,
  count: number
) {
  const d = new Date();
  if (range === "week") {
    d.setDate(d.getDate() + ((5 - d.getDay()) % 7 || 7));
  }
  d.setHours(0, 0, 0, 0);
  const rng = rand(d.toString());
  const celebs = getCelebs(group);
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
