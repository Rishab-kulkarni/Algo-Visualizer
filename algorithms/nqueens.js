let ctx = document.querySelector("canvas").getContext("2d");
// let rect = {
// 	width: 0,
// 	height: 0
// }
time_delay = 500;
width = ctx.canvas.width;
height = ctx.canvas.height;
let size = 4;
let queenImage = new Image();
queenImage.src = "/images/queen.png"
let arr = [];
let queen = [];
init();
// Utility

function init() {
    queenImage.onload = function () {
        create_grid();
        for (let i = 0; i < size; i++) {
            queen.push(-1);
        }
        set_queen();
    };

    for (let i = 0; i < size; i++) {
        let t = [];
        for (let i = 0; i < size; i++) {
            t.push(0);
        }
        arr.push(t);
    }

    document.querySelector(".queen").addEventListener("click", () => {
        document.querySelector(".queen").disabled = true;
        back_track(0);
    })
}

function create_grid() {
    let x = width / size;
    let y = height / size;
    for (let i = 0; i < size; i++) {
        ctx.drawImage(queenImage, 1 * x + 30, y * i, 60, 50);
        for (let j = 0; j < size + 1; j++) {
            ctx.fillStyle = (i + j) % 2 ? "white" : "black";
            ctx.fillRect(j * x, y * i, x, y);
        }
    }
}

function check(row, col) {
    let i, j;

    /* Check this row on left side */
    for (i = 0; i < row; i++)
        if (arr[i][col])
            return false;

    /* Check upper diagonal on left side */
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (arr[i][j])
            return false;

    /* Check lower diagonal on left side */
    for (i = row, j = col; i >= 0 && j < size; i--, j++)
        if (arr[i][j])
            return false;

    return true;
}

async function back_track(current) {
    // console.log(current)
    if (current == size) {
        console.log(queen);
        return true;
    }
    for (let i = 0; i < size; i++) {
        if (check(current, i)) {
            arr[current][i] = 1;
            queen[current] = i;
            await sleep(time_delay).then(() => {
                create_grid();
                set_queen();
            })
            let p = await back_track(current + 1);
            if (p) {
                // console.log(current, i)
                return true;
            } else {
                arr[current][i] = 0;
                queen[current] = -1;

            }
        }
    }
    return false
}

function set_queen() {
    let x = width / size
    let y = height / size;
    for (let i = 0; i < size; i++) {
        ctx.drawImage(queenImage, x * queen[i], i * y, width / size, height / size);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}