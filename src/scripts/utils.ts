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

// import data from "./dummy.json"

// type groupType = keyof typeof data.files;
// type subGroupType = keyof typeof data.files[groupType];

// function getRandomImage(group: groupType, subgroup: subGroupType) {
//   const files = data.files[group][subgroup];
//   return files[Math.floor(Math.random() * files.length)];
// }

export function randomCelebs(
  range: string,
  group: celebGroupType,
  count: number
) {
  const d = new Date();
  if (range === "week") {
    d.setDate(d.getDate() + d.getDay() - 2);
  }
  d.setHours(0, 0, 0, 0);
  const rng = rand(d.toString());
  const celebs = getCelebs(group);
  console.log(d);
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
