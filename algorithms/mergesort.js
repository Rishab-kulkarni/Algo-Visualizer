
const merge = async (ele, low, mid, high) => {
  const leftArraySize = mid - low + 1;
  const rightArraySize = high - mid;

  let left = new Array(leftArraySize);
  let right = new Array(rightArraySize);

  for (let i = 0; i < leftArraySize; i++) {
    await waitforme(delay);
    left[i] = ele[low + i];
    ele[low + i].style.background = 'turquoise';
    // left[i] = ele[low + i].style.height;
    
    // left[i] = [ele[low + i].style.height, ele[low + i].innerHTML];
  }

  for (let i = 0; i < rightArraySize; i++) {
    await waitforme(delay);
    right[i] = ele[mid + 1 + i];
    ele[mid + 1 + i].style.background = 'cyan';
    
    console.log(right[i]);
    // right[i] = [ele[mid + 1 + i].style.height, ele[mid + 1 + i].style.innerHTML];
  }


  console.log(left);
  console.log(right);


  await waitforme(delay);
  let i = 0, j = 0, k = low;
  while (i < leftArraySize && j < rightArraySize) {
    await waitforme(delay);

    const left_h = left[i].style.height;
    const right_h = right[j].style.height;

    if (parseInt(left[i].style.height) <= parseInt(right[j].style.height)) {
      if ((leftArraySize + rightArraySize) === ele.length) {
        ele[k].style.background = 'green';
      }

      else {
        ele[k].style.background = 'lightgreen';
      }

      ele[k].style.height = left[i].style.height;
      ele[k].innerHTML = left[i].innerHTML;
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
      ele[k].style.height = right[j].style.height;
      ele[k].innerHTML = right[j].innerHTML;
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
    ele[k].style.height = left[i].style.height;
    ele[k].innerHTML = left[i].innerHTML;
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
    ele[k].style.height = right[j].style.height;
    ele[k].innerHTML = right[j].innerHTML;
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
  console.log(ele);
  let l = 0;
  let r = parseInt(ele.length) - 1;

  isRunning = true;
  toggleButtonState(isRunning);
  await mergeSort(ele, l, r);
  isRunning = false;
  toggleButtonState(isRunning);
});