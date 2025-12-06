export function selectionSort(list, addSteps, name) {
  let arr = [...list];
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      addSteps(name, { highlight: [j, minIndex], curList: [...arr] });
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      addSteps(name, { highlight: [i, minIndex], curList: [...arr] });
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  addSteps(name, { highlight: [], curList: [...arr] });
}
