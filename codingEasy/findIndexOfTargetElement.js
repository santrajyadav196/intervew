function findIndexOfTargetElement(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }

  return -1;
}

function findIndexOfTargetElement(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // ✅ include '=' to check single element
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;

    // 🧩 Case 1: Left part is sorted
    if (arr[mid] >= arr[left]) {
      // if target lies within left half
      if (target >= arr[left] && target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // 🧩 Case 2: Right part is sorted
    else {
      if (target > arr[mid] && target <= arr[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1; // not found
}

console.log(findIndexOfTargetElement([5, 6, 7, 8, 9, 10, 1, 2, 3], 3)); // ✅ 8
console.log(findIndexOfTargetElement([5, 6, 7, 8, 9, 10, 1, 2, 3], 7)); // ✅ 2
