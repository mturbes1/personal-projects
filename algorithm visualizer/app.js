import { SortingAlgs } from "./sortingAlgs.js";

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let numBars = 10;
let speedFactor;

let numbersBars = document.getElementById('numbersBars');
const stage = document.getElementById('graph');
graph.style.width = `${numBars * 40}px`;

const selectAlg = document.getElementById('selectAlg');
const newBtn = document.getElementById('newBtn');
const solveBtn = document.getElementById('solveBtn');
const resetBtn = document.getElementById('resetBtn');
const speedSlider = document.getElementById('speed');
let speedNum = document.getElementById('value');

let bars = [];
let barDivs = [];

const sortingAlgs = new SortingAlgs({});

//define algorithms
const algorithms = [
    sortingAlgs.bubbleSort,
    sortingAlgs.selectionSort,
    sortingAlgs.quickSort,
    sortingAlgs.heapSort
];

//get a random number to use for heights of bars
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//setup graph
function setup() {
    graph.innerHTML = '';
    speedNum.innerHTML = speedSlider.value;
    speedFactor = speedSlider.value;
    
    //populate bars list with bars of random heights
    for(let i = 0; i < numBars; i++) {
        let width = 30;
        let height = getRandomInt(10, 300);
        bars.push({width, height});
    }

    //make each bar in the bars list appear on the graph
    for(let i = 0; i < numBars; i++) {
        const bar = document.createElement('div');
        bar.style.width = `${bars[i].width}px`;
        bar.style.height = `${bars[i].height}px`;
        bar.style.left = `${5 + i * 40}px`;
        bars[i] = { ...bars[i], position: i };
        bar.classList.add('bar');
        barDivs.push(bar);
        graph.appendChild(bar);
    } 
}

setup();

//function to swap two bars based on the first and last position
async function barSwap(barDivs, first, last) {
    barDivs[first].style.left = `${5 + last * 40}px`;
    barDivs[first].classList.add('highlight');
    barDivs[last].style.left = `${5 + first * 40}px`;
    barDivs[last].classList.add('highlight');
    await sleep(1500 / speedFactor);
    barDivs[first].classList.remove('highlight');
    barDivs[last].classList.remove('highlight');
    let temp = barDivs[first];
    barDivs[first] = barDivs[last];
    barDivs[last] = temp;
}

document.addEventListener('DOMContentLoaded', () => {
    //create a new bar chart when new button is clicked
    newBtn.addEventListener('click', () => {
        bars.splice(0, bars.length);
        barDivs.splice(0, barDivs.length);
        numBars = parseInt(numbersBars.value, 10);
        stage.style.width = `${numBars * 40}px`;
        setup();
    });
    
    //configure the proper speed the sort will run at
    speedSlider.oninput = function() {
        speedNum.innerHTML = this.value;
        speedFactor = this.value;
    }
      
    //sort the bar graph when the solve button is pressed
    solveBtn.addEventListener('click', async () => {
        const array = [];
        for (let i = 0; i < bars.length; i++) {
            array.push(bars[i].height);
        }
        
        const swaps = algorithms[selectAlg.selectedIndex](array);
    
        for (let i = 0; i < swaps.length; i++) {
            if (swaps[i].first != swaps[i].last) {
                await barSwap(barDivs, swaps[i].first, swaps[i].last);
            }
        }
    
    });

    //reset the graph when the reset button is pressed
    resetBtn.addEventListener('click', () => {
        bars.splice(0, bars.length);
        barDivs.splice(0, barDivs.length);
        setup();
    })
})
