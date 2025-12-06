export function bubbleSort(list, addSteps, name) {
  let arr = [...list];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        addSteps(name, { highlight: [j, j + 1], curList: [...arr] });

        const newArr = [...arr];
        [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
        arr = newArr;
      }
    }
  }
  addSteps(name, { highlight: [], curList: [...arr] });
}
