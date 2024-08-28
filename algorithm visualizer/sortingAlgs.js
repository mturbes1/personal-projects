//function to run quick sort
function quickSortAlg(array, start, end, swaps) {
    if(start < end) {
        const middle = Math.floor((start + end) / 2);
        const pivot = array[middle];
        let index = partition(array, start, end, pivot, swaps);
        quickSortAlg(array, start, index - 1, swaps);
        quickSortAlg(array, index, end, swaps);
    }
}

//function to manage the partitioning part of quick sort
function partition(array, left, right, pivot, swaps) {
    while(left <= right) {
        while(array[left] < pivot) {
            left++;
        }

        while(array[right] > pivot) {
            right--;
        }

        if(left <= right) {
            let temp = array[left];
            array[left] = array[right];
            array[right] = temp;
            //keep track of swaps for use in the visualization
            swaps.push({ first: left, last: right });
            left++;
            right--;
        }
    }

    return left;
}

function heapify(array, n, i, swaps) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        swap(array, i, largest, swaps);

        heapify(array, n, largest, swaps);
    }
}

function swap(array, i, j, swaps) {
    [array[i], array[j]] = [array[j], array[i]];
    swaps.push({ first: i, last: j });
}

//class with each sorting algorithm for use in app.js
class SortingAlgs {
    //function to run bubble sort
    bubbleSort(array) {
        const swaps = [];
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    //keep track of swaps for use in the visualization
                    swaps.push({first: j, last: j + 1});
                }
            }
        }
    
        return swaps;
    }
    
    //function to run selection sort
    selectionSort(array) {
        const swaps = [];
        for (let i = 0; i < array.length; i++) {
            let lowest = i;
            for (let j = i + 1; j < array.length; j++) {
                if(array[lowest] > array[j]) {
                    lowest = j;
                }
            } 

            if(i !== lowest) {
                let temp = array[i];
                array[i] = array[lowest];
                array[lowest] = temp;
                //keep track of swaps for use in the visualization
                swaps.push({first: i, last: lowest});
            }  
        }
    
        return swaps;
    }

    //function to run quick sort
    quickSort(array) {
        const swaps = [];
        quickSortAlg(array, 0, array.length - 1, swaps);
        return swaps;
    }

    //function to run heap sort
    heapSort(array) {
        const swaps = [];
        const n = array.length;
    
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(array, n, i, swaps);
        }
    
        for (let i = n - 1; i > 0; i--) {
            swap(array, 0, i, swaps);
    
            heapify(array, i, 0, swaps);
        }
    
        return swaps;
    }
}

export { SortingAlgs }