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
    await parallelly(
      async taskId => {
        count = count + taskId;
        await wait();
      },
      4,
      2
    );
    //0+1+2+3
    expect(count).toBe(6);
    done();
  },
  600
);