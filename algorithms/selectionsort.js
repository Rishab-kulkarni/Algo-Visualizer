const selectionSort = async (ele) => {
  let min_idx = 0;
  for (let i = 0; i < ele.length; i += 1) {
    min_idx = i;
    ele[i].style.backgroundColor = 'orange';
    for (var j = i + 1; j < ele.length; j += 1) {
      ele[j].style.backgroundColor = 'red';
      await waitforme(delay);
      let val1 = parseInt(ele[j].innerHTML);
      let val2 = parseInt(ele[min_idx].innerHTML);

      if (val1 < val2) {
        if (min_idx !== i) {
          ele[min_idx].style.backgroundColor = 'pink';
        }
        min_idx = j;
      } else {
        ele[j].style.backgroundColor = 'pink';
      }
    }

    let temp1 = ele[min_idx].style.height;
    let temp2 = ele[min_idx].innerHTML;
    ele[min_idx].style.height = ele[i].style.height;
    ele[i].style.height = temp1;
    ele[min_idx].innerHTML = ele[i].innerHTML;
    ele[i].innerHTML = temp2;

		await waitforme(delay);
		ele[min_idx].style.backgroundColor = 'pink';
    ele[i].style.backgroundColor = 'lightgreen';
  }
};

const selectionSortbtn = document.getElementById('selectionSort');
selectionSortbtn.addEventListener('click', async () => {
	let arr = document.querySelectorAll('.bar');

	isRunning = true;
	toggleButtonState(isRunning);
	await selectionSort(arr);
	isRunning = false;
	toggleButtonState(isRunning);
})