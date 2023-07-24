function displayTime(time) {
  const hours = Math.floor(time / 36e5);
  const minutes = Math.floor(time % 36e5 / 6e4);
  const seconds = Math.floor(time % 36e5 % 6e4 / 1e3);
  const milliseconds = Math.floor(time % 36e5 % 6e4 % 1e3);
  let base = `${milliseconds.toString().padStart(3, "0")}`;
  base = base.slice(0, -1);
  if (hours > 0) {
    base = `${hours}:${pad(minutes)}:${pad(seconds)}.${base}`;
  } else if (minutes > 0) {
    base = `${minutes}:${pad(seconds)}.${base}`;
  } else {
    base = `${seconds}.${base}`;
  }
  return base;
}
function formatTime(solve) {
  switch (solve.status) {
    case "Ok":
      return displayTime(solve.time);
    case "Plus2":
      return "+" + displayTime(solve.time + 2e3);
    case "Dnf":
      return "DNF";
  }
}
function pad(num) {
  return num.toString().padStart(2, "0");
}
function getBestSolve(arr) {
  const adjustedSolves = arr.slice().map((i) => ({
    ...i,
    time: getAdjustedTime(i)
  }));
  const sortedSolves = adjustedSolves.sort((a, b) => a.time - b.time);
  return sortedSolves.slice(0, 1)[0];
}
function getBest(best) {
  if (typeof best.time === "undefined")
    return displayTime(0);
  return best.time !== Number.MAX_SAFE_INTEGER ? displayTime(best.time) : "DNF";
}
function getWorst(arr) {
  if (arr.length === 0) {
    return displayTime(0);
  }
  const worst = Math.max(
    ...arr.slice().filter((i) => i.status !== "Dnf").map((i) => getAdjustedTime(i))
  );
  return displayTime(worst);
}
function getAdjustedTime(solve) {
  switch (solve.status) {
    case "Ok":
      return solve.time;
    case "Plus2":
      return solve.time + 2e3;
    case "Dnf":
      return Number.MAX_SAFE_INTEGER;
  }
}
function getAverageTime(arr, length) {
  if (arr.length < length) {
    return 0;
  }
  const array = arr.slice(-1 * length);
  const dnfs = array.filter((i) => i.status === "Dnf");
  if (dnfs.length >= Math.floor(length / 25) + 2 && length >= 25) {
    return Number.MAX_SAFE_INTEGER;
  }
  if (dnfs.length >= 2 && length >= 5) {
    return Number.MAX_SAFE_INTEGER;
  }
  const adjustedSolves = array.slice().map((i) => ({
    ...i,
    time: getAdjustedTime(i)
  }));
  const sortedSolves = adjustedSolves.slice().sort((a, b) => a.time - b.time);
  const filteredSolves = sortedSolves.slice(1, -1);
  const sum = filteredSolves.reduce((a, b) => a + b.time, 0);
  return sum / filteredSolves.length;
}
function getAvg(arr, length) {
  const time = getAverageTime(arr, length);
  if (time === Number.MAX_SAFE_INTEGER)
    return "DNF";
  return time >= 0 ? displayTime(time) : "DNF";
}
function getBestAverage(arr, length) {
  if (arr.length < length)
    return [];
  let best;
  let bestArray = [];
  for (let i = 0; i < arr.length - length + 1; i++) {
    const array = arr.slice(i, length + i);
    const avg = getAverageTime(array, length);
    if (!best || avg < best && avg >= 0) {
      best = avg;
      bestArray = array;
    }
  }
  return bestArray;
}
function getMean(solves) {
  if (solves.length === 0) {
    return displayTime(0);
  }
  const filtered = solves.slice().filter((i) => i.status !== "Dnf").map((i) => ({
    ...i,
    time: getAdjustedTime(i)
  }));
  if (filtered.length === 0) {
    return "DNF";
  }
  const sum = filtered.reduce((a, b) => a + b.time, 0);
  return displayTime(sum / filtered.length);
}
function formatCustomTime(timeString) {
  const isNumber = /^\d+$/.test(timeString);
  if (isNumber) {
    return formatTimeInput(parseInt(timeString));
  } else {
    return formatStringToMilliSeconds(timeString);
  }
}
function formatStringToMilliSeconds(timeString) {
  const regex = /^((\d{1,2}:)?\d{1,2}:)?\d{1,2}\.\d{1,2}$/gm;
  if (!regex.exec(timeString)) {
    return;
  }
  const parts = timeString.split(":").reverse();
  if (parts.length > 3) {
    return;
  }
  const s = parts.shift();
  if (!s)
    return;
  const [seconds, milliseconds] = s.split(".");
  let totalMilliseconds = parseInt(seconds) * 1e3 + parseInt(milliseconds) * 10;
  if (parts.length === 1) {
    const [minutes] = parts;
    totalMilliseconds += parseInt(minutes) * 60 * 1e3;
  } else if (parts.length === 2) {
    const [minutes, hours] = parts;
    totalMilliseconds += parseInt(minutes) * 60 * 1e3;
    totalMilliseconds += parseInt(hours) * 60 * 60 * 1e3;
  }
  return totalMilliseconds;
}
function formatTimeInput(time) {
  const hours = Math.floor(time / 1e6);
  const minutes = Math.floor(time % 1e6 / 1e4);
  const seconds = Math.floor(time % 1e4 / 100);
  const milliSeconds = time % 100 * 10;
  return hours * 36e5 + minutes * 6e4 + seconds * 1e3 + milliSeconds;
}
function checkBestAverage(solves, length) {
  if (getAverageTime(solves, length) === getAverageTime(getBestAverage(solves, length), length) && getAverageTime(solves, length) > 0) {
    return "text-green-400";
  } else {
    return "";
  }
}
export {
  getBestAverage as a,
  getBest as b,
  checkBestAverage as c,
  displayTime as d,
  formatCustomTime as e,
  formatTime as f,
  getAvg as g,
  getBestSolve as h,
  getMean as i,
  getWorst as j
};
