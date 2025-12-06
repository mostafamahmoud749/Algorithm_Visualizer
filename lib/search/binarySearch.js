export function binarySearch(list, addSteps, name,target) {
  let left = 0;
  let right = list.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    addSteps(name, { highlight: [left,mid,right]});
    if (list[mid] === target) {
      addSteps(name, { highlight: [], found: mid });
      return mid;
    }
    if (list[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    
  }
  addSteps(name, { highlight: [], found: -1 })
  return -1
}