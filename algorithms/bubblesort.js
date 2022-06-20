const bubbleSort = async (ele, n) => {

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n - i - 1; ++j) {

      ele[j].style.background = 'pink';
      ele[j + 1].style.background = 'pink';

      if (parseInt(ele[j].style.height) > parseInt(ele[j + 1].style.height)) {
        await waitforme(delay);
        let n1 = ele[j].innerHTML;
        let n2 = ele[j + 1].innerHTML;
        swap(ele[j], ele[j + 1]);
        ele[j + 1].innerHTML = n1;
        ele[j].innerHTML = n2;
      }
      ele[j].style.background = 'cyan';
      ele[j + 1].style.background = 'cyan';
    }
    ele[n - i - 1].style.background = 'lightgreen';
  }
  ele[0].style.background = 'lightgreen';
}

const bubbleSortbtn = document.getElementById('bubbleSort');
bubbleSortbtn.addEventListener('click', async () => {
  let arr = document.querySelectorAll('.bar');

  isRunning = true;
  toggleButtonState(isRunning);
  await bubbleSort(arr, arr.length);
  isRunning = false;
  toggleButtonState(isRunning);
})