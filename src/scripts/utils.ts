import rand from "seedrandom";
import data from "../data/celebs.json";
import moment from "moment";

type celebGroupType = keyof typeof data.files;
// type celebNameType = keyof typeof data.files[celebGroupType];

function getCelebs(group: celebGroupType) {
  return Object.keys(data.counts[group]).sort();
}

// function getRandomImage(group: celebGroupType, name: celebNameType) {
//   const files = data.files[group][name];
//   return "/apsara/" + files[Math.floor(Math.random() * files.length)];
// }

// import data from "./dummy.json";

// type groupType = keyof typeof data.files;
// type subGroupType = keyof typeof data.files[groupType];

// function getRandomImage(group: groupType, subgroup: subGroupType) {
//   const files = data.files[group][subgroup];
//   return files[Math.floor(Math.random() * files.length)];
// }

function seedString(range: string, group: string, count: number) {
  const dateFormat = "ddd, DD MMM YYYY";

  let d = moment().utc();
  d.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  if (range === "weekly") d = d.day(5);
  else if (range === "monthly") d = d.date(1);

  const seed = d.format(dateFormat) + ", " + count + " " + group;
  console.log(seed);
  return seed;
}

export function randomCelebs(
  range: string,
  group: celebGroupType,
  count: number
) {
  const rng = rand(seedString(range, group, count));
  const celebs = getCelebs(group);
  const selected = [];

  for (let i = 0; i < count; i++) {
    selected.push(celebs.splice(Math.floor(rng() * celebs.length), 1)[0]);
  }
  console.log(selected.join(", "));
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
