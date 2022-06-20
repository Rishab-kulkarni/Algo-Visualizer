

let DEFAULT_ARRAY_SIZE = 10;
const delay = 200;
const MIN_ELEMENT = 15;
const MAX_ELEMENT = 150;


document.getElementById('newArray').addEventListener('click', () => {
  createNewArray(DEFAULT_ARRAY_SIZE);
})

let slider = document.getElementById("myRange");

slider.oninput = () => {
  DEFAULT_ARRAY_SIZE = slider.value;
  createNewArray(slider.value);
}



const deleteArray = () => {
  const bars = document.querySelector('#bars');
  bars.innerHTML = '';
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const createNewArray = (arraySize) => {
  let array = [];
  let size = arraySize;
  // console.log(arraySizeSlider());

  // console.log('array');

  deleteArray();

  for (let i = 0; i < size; i++) {
    array.push(getRandomInt(MIN_ELEMENT, MAX_ELEMENT));
  }

  const elem = document.getElementsByClassName('flex-container');
  // console.log(elem[0]);



  const bars = document.querySelector('#bars');

  // console.log(bars);


  for (let i = 0; i < size; ++i) {
    const bar = document.createElement('div');
    bar.style.height = `${2 * array[i]}px`;
    bar.classList.add('1');
    bar.innerHTML = array[i];
    bar.classList.add('bar');
    bar.classList.add('flex-item');
    bar.classList.add(`bar-number-${i}`);
    bars.appendChild(bar);
  }
}

const waitforme = (delay) => {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, delay);
  })
}


let isRunning = false;
const toggleButtonState = (isRunning) => {

  /** Set to false, when algorithm not running **/
  document.getElementById("newArray").disabled = isRunning;
  document.getElementById("myRange").disabled = isRunning;
  document.getElementById("mergeSort").disabled = isRunning;
  document.getElementById("quickSort").disabled = isRunning;
  document.getElementById("bubbleSort").disabled = isRunning;
  document.getElementById("insertionSort").disabled = isRunning;
  document.getElementById("selectionSort").disabled = isRunning;
}

// default size
createNewArray(DEFAULT_ARRAY_SIZE);