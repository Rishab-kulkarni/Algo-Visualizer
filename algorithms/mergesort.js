
const merge = async (ele, low, mid, high) => {
  const leftArraySize = mid - low + 1;
  const rightArraySize = high - mid;

  let left = new Array(leftArraySize);
  let right = new Array(rightArraySize);

  for (let i = 0; i < leftArraySize; i++) {
    await waitforme(delay);
    ele[low + i].style.background = 'turquoise';
    left[i] = ele[low + i].style.height;
  }

  for (let i = 0; i < rightArraySize; i++) {
    await waitforme(delay);
    // console.log(ele[mid + 1 + i].style.height + ' at ' + (mid + 1 + i));
    ele[mid + 1 + i].style.background = 'cyan';
    right[i] = ele[mid + 1 + i].style.height;
  }

  await waitforme(delay);
  let i = 0, j = 0, k = low;
  while (i < leftArraySize && j < rightArraySize) {
    await waitforme(delay);
    if (parseInt(left[i]) <= parseInt(right[j])) {
      if ((leftArraySize + rightArraySize) === ele.length) {
        ele[k].style.background = 'green';
      }

      else {
        ele[k].style.background = 'lightgreen';
      }

      ele[k].style.height = left[i];
      i++;
      k++;
    }
    else {

      if ((leftArraySize + rightArraySize) === ele.length) {
        ele[k].style.background = 'green';
      }
      else {
        ele[k].style.background = 'lightgreen';
      }
      ele[k].style.height = right[j];
      j++;
      k++;
    }
  }
  while (i < leftArraySize) {
    await waitforme(delay);
   
    if ((leftArraySize + rightArraySize) === ele.length) {
      ele[k].style.background = 'green';
    }
    else {
      ele[k].style.background = 'lightgreen';
    }
    ele[k].style.height = left[i];
    i++;
    k++;
  }
  while (j < rightArraySize) {
    await waitforme(delay);
   
    if ((leftArraySize + rightArraySize) === ele.length) {
      ele[k].style.background = 'green';
    }
    else {
      ele[k].style.background = 'lightgreen';
    }
    ele[k].style.height = right[j];
    j++;
    k++;
  }
}

const mergeSort = async (ele, l, r) => {
  
  if (l >= r) {
      return;
  }
  const m = l + Math.floor((r - l) / 2);
  
  await mergeSort(ele, l, m);
  await mergeSort(ele, m + 1, r);
  await merge(ele, l, m, r);
}

const mergeSortbtn = document.getElementById("mergeSort");
mergeSortbtn.addEventListener('click', async () => {
  let ele = document.querySelectorAll('.bar');
  let l = 0;
  let r = parseInt(ele.length) - 1;

  isRunning = true;
  toggleButtonState(isRunning);
  await mergeSort(ele, l, r);
  isRunning = false;
  toggleButtonState(isRunning);
});
