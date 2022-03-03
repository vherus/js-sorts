function benchmark(func, ...args) {
    console.log('Input:', ...args);

    const start = (new Date).getTime();

    const result = func(...args);

    const end = (new Date).getTime();

    console.log('Output:', result);

    console.log(`Execution took ${end - start}ms`);

    return result;
}

module.exports = {
    benchmark
}
