const bubbleSort = async (ele, n) => {

  for(let i = 0 ; i < n ; ++i) {
    for(let j = 0 ; j < n - i - 1; ++j) {
      
      ele[j].style.background = 'pink';
      ele[j+1].style.background = 'pink';

      if(parseInt(ele[j].style.height) > parseInt(ele[j+1].style.height)) {
        await waitforme(delay);
        swap(ele[j], ele[j+1]);
      }

      ele[j].style.background = 'cyan';
      ele[j+1].style.background = 'cyan';

    }

    ele[n - i - 1 ].style.background = 'green';

  }
  ele[0].style.background = 'green';
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