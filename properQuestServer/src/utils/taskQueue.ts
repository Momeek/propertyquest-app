import { TaskQueue } from "power-tasks"

const queue = new TaskQueue({ paused: false, concurrency: 10 });

queue.addListener("error", (e) => {
  console.error(e);
});

// notify when jobs complete
// queue.addListener("success", (e) => {
//   logger.info({ result: e.detail?.result }, "job finished processing");
// });

// or when jobs fail
// queue.addListener("error", (e) => {
  // stack: e?.stack ?? ""
//   logger.error({ error: e?.message }, "job failed processing");
// });

export const enqueueTask = (task: () => Promise<any>) => {
  return queue.enqueue(task);
};
