export function insertionSort(list, addSteps, name) {
  let arr = [...list];
  let n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      addSteps(name, { highlight: [j, j + 1], curList: [...arr] });
      j--;
    }
    arr[j + 1] = key;
    addSteps(name, { highlight: [j + 1], curList: [...arr] });
  }
  addSteps(name, { highlight: [], curList: [...arr] });
}
