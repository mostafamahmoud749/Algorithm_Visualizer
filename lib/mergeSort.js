export function mergeSort(list, addSteps, name) {
  let arr = [...list];

  function merge(start, mid, end) {
    const left = arr.slice(start, mid);
    const right = arr.slice(mid, end);
    let i = 0,
      j = 0,
      k = start;

    while (i < left.length && j < right.length) {
      addSteps(name, { highlight: [start + i, mid + j], curList: [...arr] });
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
    }
    while (i < left.length) {
      arr[k++] = left[i++];
      addSteps(name, { highlight: [], curList: [...arr] });
    }
    while (j < right.length) {
      arr[k++] = right[j++];
      addSteps(name, { highlight: [], curList: [...arr] });
    }
  }

  function helper(start, end) {
    if (end - start <= 1) return;
    const mid = Math.floor((start + end) / 2);
    helper(start, mid);
    helper(mid, end);
    merge(start, mid, end);
  }

  helper(0, arr.length);
  addSteps(name, { highlight: [], curList: [...arr] });
}
