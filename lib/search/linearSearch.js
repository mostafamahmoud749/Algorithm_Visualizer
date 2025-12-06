export function linearSearch(list, addSteps, name,target) {
  const arr = [...list];

  for (let i = 0; i < arr.length; i++) {
    addSteps(name, { highlight: [i]});

    if (arr[i] === target) {
      addSteps(name, { highlight: [], found: i });
      return i;
    }
  }

  addSteps(name, { highlight: [], found: -1 });
  return -1
}