
let delay = 20;
const waitforme = (delay) => {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, delay);
  })
}
const slider = document.getElementById('myRange')
const speed_slider = document.getElementById('speed')

let cols = Math.round(screen.width / 40);
let rows = 10;

slider.oninput = () => {
  rows = slider.value
  createTable(rows, cols)
}

speed_slider.oninput = () => {
  delay = 30 - speed_slider.value;
}


const clearTable = () => {
  const table = document.getElementsByClassName('mytable');
  const prime_numbers = document.getElementsByClassName('prime_numbers_container')
  prime_numbers[0].innerHTML = '';

  for (let i = 0; i < rows; ++i) {

    for (let j = 0; j < cols; ++j) {
      const node = document.getElementById(`node-${i}-${j}`);
      node.id = `node-${i}-${j}`;
      node.style.backgroundColor = 'white';

    }
  }
}


const createTable = (rows, cols) => {
  const table = document.getElementsByClassName('mytable')
  const prime_numbers = document.getElementsByClassName('prime_numbers_container')
  prime_numbers[0].innerHTML = '';
  table[0].innerHTML = '';


  // console.log(table);

  let cnt = 1;
  for (let i = 0; i < rows; ++i) {

    const ele = document.createElement('tr');
    ele.id = `row-${i}`
    ele.classList.add(`row-${i}`);


    for (let j = 0; j < cols; ++j) {
      const node = document.createElement('th');
      node.id = `node-${i}-${j}`
      node.classList.add('node')
      node.classList.add(`number-${cnt}`)
      node.innerHTML = cnt++;
      ele.append(node);
    }
    table[0].append(ele);

  }
}



const prime_div = document.getElementsByClassName('prime_numbers_container')

const sieveofEratosthenes = async () => {
  let is_prime = [];

  let total = rows * cols;

  for (let i = 0; i <= total; i++) {
    is_prime.push(true);
  }

  let colors = ['red', 'pink', 'orange', 'yellow', 'blue', 'grey', 'blue', 'purple', 'cyan', 'turquoise'];

  is_prime[0] = is_prime[1] = false;

  let idx = 0;

  for (let i = 2; i <= total; i++) {

    await waitforme(delay);
    if (is_prime[i]) {
      let prime_elem = document.getElementsByClassName(`number-${i}`);
      prime_elem[0].style.background = 'green';
      // console.log(prime_elem[0].textContent)
      prime_div[0].append(` ${i} `)
    }
    if (is_prime[i] && i * i <= total) {

      for (let j = i * i; j <= total; j += i) {
        await waitforme(delay);
        let elem_temp = document.getElementsByClassName(`number-${j}`);
        elem_temp[0].style.background = colors[idx % (colors.length)];
        is_prime[j] = false;
        // console.log(j);
      }
    }
    idx++;
  }
}

createTable(rows, cols);

const sieveBtn = document.getElementById('sieve')
sieveBtn.addEventListener('click', async () => {
  // console.log('Speed slider ' + speed_slider.value);

  clearTable();
  let isRunning = true;


  toggledButtonDisable(isRunning);
  await sieveofEratosthenes();

  isRunning = false;

  toggledButtonDisable(isRunning);


})




const toggledButtonDisable = (isRunning) => {

  /* Disable all the buttons while algo is running*/

  if (isRunning) {
    document.getElementById('sieve').disabled = true;
    document.getElementById('speed').disabled = true;
    document.getElementById('myRange').disabled = true;
  }

  else {
    document.getElementById('sieve').disabled = false;
    document.getElementById('speed').disabled = false;
    document.getElementById('myRange').disabled = false;
  }
}

document.getElementsById('heading').addEventListener('click', () => {
  alert(' When I first learnt about sieve, I was really amazed by the trick. If you want to read more about how sieve works and other variations of it, go to cp-algorithms.com ')
})