const parallelly = require("./index");
function wait(time = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(time), 1);
  });
}

it(
  "parallelly should execute all the items in the queue",
  async done => {
    let count = 0;
    //--------//
    await parallelly(
      async taskId => {
        count = count + taskId;
        await wait(); // Simulate time consuming work ( Waiting for network/file )
      },
      4, // Total tasks
      2 // Number of tasks to run each time
    );
    //--------//
    //0+1+2+3
    expect(count).toBe(6);
    done();
  },
  600
);
