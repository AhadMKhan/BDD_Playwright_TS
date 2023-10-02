const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0"); // Add 1 to month because it's 0-indexed
const day = String(now.getDate()).padStart(2, "0");
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const seconds = String(now.getSeconds()).padStart(2, "0");
const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

export const currentTimeStamp = `${timestamp}`;

let testStartTime: Date | undefined;
let testEndTime: Date | undefined;

export function setTestStartTime(): void {
  testStartTime = new Date();
}

export function setTestEndTime(): void {
  testEndTime = new Date();
}

export function getTestStartTime(): Date | undefined {
  return testStartTime;
}

export function getTestEndTime(): Date | undefined {
  return testEndTime;
}
