import rand from "seedrandom";
import data from "../data/celebs.json";
import moment from "moment";

const celebFiles: Record<string, Record<string, string[]>> = data.files;

function getCelebs(group: string) {
  return Object.keys(celebFiles[group])
  .sort()
  .filter(function(x) {
    return x.toLowerCase() != "_blank";
  })
}

export function getRandomImage(group: string, name: string) {
  const files = celebFiles[group][name];
  return "/apsara/" + files[Math.floor(Math.random() * files.length)];
}

function getSeed(range: string, group: string, count: number) {
  const dateFormat = "ddd, DD MMM YYYY";
  const day = 5;
  let d = moment().utc();
  // d = d.add(1, "day");
  d.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  if (range === "weekly") d = d.day(d.day() >= day ? day : day-7);
  else if (range === "monthly") d = d.date(1);

  // const seed = d.format(dateFormat) + ", " + count + " " + group;
  const seed = {
    timestamp: d.format(dateFormat),
    count: count.toString(),
    group: group.charAt(0).toUpperCase() + group.slice(1),
  };
  // console.log(JSON.stringify(seed));
  return seed;
}

export function randomCelebs(range: string, group: string, size: number[]) {
  const count = size.reduce((a, b) => a * b, 1)
  const seed = getSeed(range, group, count);
  const rng = rand(JSON.stringify(seed));
  const celebs = getCelebs(group);
  const selected = [];

  for (let i = 0; i < count; i++) {
    selected.push(celebs.splice(Math.floor(rng() * celebs.length), 1)[0]);
  }
  console.log(selected.join(", "));
  return {
    seed: seed,
    names: selected,
  };
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
