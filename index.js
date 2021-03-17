/**
 * Control the parallel execution of async tasks.
 * This function is useful where you want to send out many http requests, but want to control how many inflight requests are inplay at a time.
 *
 * @name parallelly
 * @function
 * @param {Function} target  - This function will be invoked with a taskId (zero based). taskId can be used to ,say, access an item in the queue.
 * @param {number} concurrencyLevel - How many parallel invocations of target should happen at any given time
 * @param {number} queueLength - How many times the target should be invoked in total
 * @return {Promise} Resolves when target is invoked queueLength times or one of the invocations of the target throw an error.
 */
const parallelly = (target, queueLength, concurrencyLevel) => {
  return new Promise((resolve, reject) => {
    (async function next(i) {
      const tasks = [];
      for (let j = 0; j < concurrencyLevel; j++) {
        if (i + 1 <= queueLength) tasks.push(target(i + j));
      }
      Promise.all(tasks)
        .then(_ => {
          if (i + concurrencyLevel <= queueLength) next(i + concurrencyLevel);
          else resolve();
        })
        .catch(err => {
          reject({
            error: err,
            message: "You should handle the failures in your target"
          });
        });
    })(0);
  });
};

module.exports = parallelly;
