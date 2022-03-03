const { benchmark, unsortedArray } = require('./utils');

// O(n2)
function selectiveSort(arr, direction = 'asc') {
    for (let i = 0; i < arr.length; i++) {
        let smallestIndex = i;
        let biggestIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[smallestIndex]) {
                smallestIndex = j;
            }

            if (arr[j] > arr[biggestIndex]) {
                biggestIndex = j;
            }
        }

        const original = arr[i];
        const replacement = arr[direction === 'asc' ? smallestIndex : biggestIndex];

        arr[i] = replacement;
        arr[direction === 'asc' ? smallestIndex : biggestIndex] = original;
    }

    return arr;
}

benchmark(selectiveSort, unsortedArray, 'asc');
benchmark(selectiveSort, unsortedArray, 'desc');

// Go through the array
// For every item, loop over the remainder of the array to find the smallest
// Swap the current item with the smallest found

function selectiveSortLearning(arr) {
    console.log('Original array', arr);
    for (let i = 0; i < arr.length; i++) { // Go over every item
        console.log('Current top level iteration', i, 'Value', arr[i]);
        let smallest = i; // In current iteration, arr[i] is the only number we know about - save it as the smallest index found so far
        console.log('Current smallest index', smallest, 'Value', arr[smallest]);

        for (let j = i + 1; j < arr.length; j++) { // Loop over the rest of the array since we're sorting as we go
            console.log('Current nested iteration', j, 'Value', arr[j]);
            const isJSmaller = arr[j] < arr[smallest]; // Is this current item smaller than the top level iteration's item?
            console.log(`Is ${arr[j]} smaller than ${arr[smallest]}`, isJSmaller);

            if (isJSmaller) { // If it is, change the smallest number we know about to this one
                smallest = j;
                console.log('Smallest changed', smallest, 'Value', arr[smallest]);
            }
        }

        // Store the values to swap
        const swapThis = arr[i];
        const withThis = arr[smallest];

        console.log('Swapping', swapThis, 'with', withThis);

        // Swap them
        arr[smallest] = swapThis;
        arr[i] = withThis;
    }

    return arr;
}

function selectiveSortBlindAttempt(arr) {
    for (let i = 0; i < arr.length; i++) {
        let indexSmallestFoundAt = i; // This is the only number we've seen in this iteration of the sort, so save it as the smallest

        // Start a new loop for the rest of the items in the array so we can swap one by one
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[indexSmallestFoundAt]) {
                indexSmallestFoundAt = j;
            }
        }

        const original = arr[i];
        const smallestValue = arr[indexSmallestFoundAt];

        arr[i] = smallestValue;
        arr[indexSmallestFoundAt] = original;
    }

    return arr;
}
