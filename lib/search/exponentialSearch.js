
export function exponentialSearch(list, addSteps, name, target) {
  const n = list.length;
  if (n === 0) return -1;
  // If the first element is the target
  addSteps(name, { highlight: [0] });
  if (list[0] === target) return 0;
  // Find range for binary search by doubling index
  let i = 1;
  while (i < n && list[i] <= target) {
    addSteps(name, { highlight: [i] });
    i *= 2;
  }

  let left = Math.floor(i / 2);
  let right = Math.min(i, n - 1);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    addSteps(name, { highlight: [left, mid, right] });

    if (list[mid] === target) {
      addSteps(name, { highlight: [mid], found: mid });
      return mid;
    }


    if (list[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  addSteps(name, { highlight: [], found: -1 });
  return -1
}
