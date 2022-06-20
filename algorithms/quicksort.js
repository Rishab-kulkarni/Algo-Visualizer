const swap = (el1, el2) => {
  let temp = el1.style.height;
  el1.style.height = el2.style.height;
  el2.style.height = temp;
}


const quickSort = async (ele, left, right) => {
  if (left < right) {

    await waitforme(delay);

    let index = await partition(ele, left, right);
    await quickSort(ele, left, index - 1);
    await quickSort(ele, index + 1, right);
  }

  else {
    if (left >= 0 && right >= 0 && left < ele.length && right < ele.length) {
      ele[right].style.height = 'green';
      ele[left].style.height = 'green';
    }
  }

}



const partition = async (ele, left, right) => {
  let pivot = ele[right];
  let i = (left - 1);

  ele[right].style.background = 'orange';

  await waitforme(delay);

  for (let j = left; j <= right - 1; j++) {


    ele[j].style.background = 'yellow';

    await waitforme(delay);


    if (parseInt(ele[j].style.height) < parseInt(pivot.style.height)) {
      i++;
      const ni = ele[i].innerHTML;
      const nj = ele[j].innerHTML;

      swap(ele[i], ele[j]);

      ele[i].innerHTML = nj;
      ele[j].innerHTML = ni;

      ele[i].style.background = 'orange';
      if (i != j) ele[j].style.background = 'orange';
      await waitforme(delay);
    }

    else {
      ele[j].style.background = 'pink';
    }

  }

  const ni_1 = ele[i + 1].innerHTML;
  const n_right = ele[right].innerHTML;
  swap(ele[i + 1], ele[right]);

  ele[i + 1].innerHTML = n_right;
  ele[right].innerHTML = ni_1;

  ele[i + 1].style.background = 'green';
  ele[right].style.background = 'pink';

  await waitforme(delay);
  for (let it = 0; it < ele.length; it++) {
    if (ele[it].style.background != 'green')
      ele[it].style.background = 'green';
  }
  return (i + 1);
}

const quickSortBtn = document.getElementById('quickSort')
quickSortBtn.addEventListener("click", async () => {
  const ele = document.querySelectorAll('.bar');
  isRunning = true;
  toggleButtonState(isRunning);
  await quickSort(ele, 0, ele.length - 1);
  isRunning = false;
  toggleButtonState(isRunning);
})