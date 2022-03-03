const { benchmark, unsortedArray } = require('./utils');

// Divide the array into 2 parts, recursively, until every single element is in it's own array
// Sort the individual arrays and merge them together

function mergeSortLearning(arr) {
    console.log('Working on array', arr);

    if (arr.length === 1) {
        // if arr has a length of one then it's already sorted, return it
        console.log(arr, 'has a length of 1, returning it');
        return arr;
    }

    const halfWay = Math.ceil(arr.length / 2);
    console.log('Halfway index for this array', halfWay, 'value at half way index', arr[halfWay]);

    const left = arr.slice(0, halfWay);
    const right = arr.slice(halfWay);
    console.log('Left half', left);
    console.log('Right half', right, '\n');

    const l1 = mergeSortLearning(left);
    const l2 = mergeSortLearning(right);

    console.log('Result', l1, l2, '\n');

    return mergeLearning(l1, l2)
}

function mergeLearning(left, right) {
    const merged = [];
    console.log('left', left, 'right', right, 'merged', merged)
    let lIndex = 0;
    let rIndex = 0;

    while (lIndex < left.length && rIndex < right.length) {
        console.log('Left index', lIndex, 'Right index', rIndex);
        if (left[lIndex] < right[rIndex]) {
            console.log(`${left[lIndex]} is less than ${right[rIndex]}`)
            merged.push(left[lIndex]);
            console.log(`Move ${left[lIndex]} to merged array and increment left index`, merged);
            lIndex++;
            continue;
        }

        console.log(`${left[lIndex]} is greater than ${right[rIndex]}`)
        merged.push(right[rIndex]);
        console.log(`Move ${right[rIndex]} to merged array and increment right index`, merged);
        rIndex++;
    }

    console.log('After loop:', merged);
    console.log('Left index', lIndex, 'Left remainder', left.slice(lIndex));
    console.log('Right index', rIndex, 'Right remainder', right.slice(rIndex));

    return merged.concat(left.slice(lIndex)).concat(right.slice(rIndex));
}

// console.log(mergeSortLearning(unsortedArray))

function mergeSortBlind(arr) {
    if (arr.length === 1) {
        return arr;
    }

    const halfWay = Math.ceil(arr.length / 2);
    const left = arr.slice(0, halfWay);
    const right = arr.slice(halfWay);

    const recursiveLeft = mergeSortBlind(left);
    const recursiveRight = mergeSortBlind(right);

    return mergeBlind(recursiveLeft, recursiveRight);
}

function mergeBlind(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
            continue;
        }

        result.push(right[rightIndex]);
        rightIndex++;
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// console.log(mergeSortBlind(unsortedArray));

// O(n log n)
function mergeSort(arr, direction = 'asc') {
    if (arr.length === 1) {
        return arr;
    }

    const halfWay = Math.ceil(arr.length / 2);
    const left = arr.slice(0, halfWay);
    const right = arr.slice(halfWay);

    const recursiveLeft = mergeSort(left, direction);
    const recursiveRight = mergeSort(right, direction);

    return merge(recursiveLeft, recursiveRight, direction);
}

function merge(left, right, direction) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    const isAscending = direction === 'asc';

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(isAscending ? left[leftIndex] : right[rightIndex]);
            isAscending ? leftIndex++ : rightIndex++;
            continue;
        }

        result.push(isAscending ? right[rightIndex] : left[leftIndex]);
        isAscending ? rightIndex++ : leftIndex++;
        continue;
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

benchmark(mergeSort, unsortedArray, 'asc');
benchmark(mergeSort, unsortedArray, 'desc');