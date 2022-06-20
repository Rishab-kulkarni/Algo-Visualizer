const insertion = async () => {

  const ele = document.querySelectorAll(".bar");

  ele[0].style.background = 'lightgreen';
  for (let i = 1; i < ele.length; i++) {

    let j = i - 1;
    let key = ele[i].style.height;
    let ni = ele[i].innerHTML;

    ele[i].style.background = 'cyan';

    await waitforme(delay);

    while (j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))) {
      ele[j].style.background = 'cyan';
      ele[j + 1].style.height = ele[j].style.height;
      ele[j + 1].innerHTML = ele[j].innerHTML;
      j--;

      await waitforme(delay);

      for (let k = i; k >= 0; k--) {
        ele[k].style.background = 'lightgreen';
      }
    }
    ele[j + 1].style.height = key;
    ele[j + 1].innerHTML = ni;
    ele[i].style.background = 'lightgreen';
  }
}

const inSortbtn = document.querySelector("#insertionSort");
inSortbtn.addEventListener('click', async function () {
  isRunning = true;
  toggleButtonState(isRunning);
  await insertion();
  isRunning = false;
  toggleButtonState(isRunning);
});