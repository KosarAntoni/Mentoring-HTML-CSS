type item = [number, number];

class PriorityQueue {
  queue: item[];

  constructor() {
    this.queue = [];
  }

  enqueue(element: item) {
    const index = this.queue.findIndex(
      (queueElement: item) => element[1] < queueElement[1]
    );

    if (index === -1) {
      this.queue.push(element);
    } else {
      this.queue = [
        ...this.queue.slice(0, index),
        element,
        ...this.queue.slice(index),
      ];
    }
  }

  dequeue() {
    return this.queue.shift();
  }

  toString() {
    console.log(this.queue.join(" "));
  }

  run() {
    this.queue.forEach((element: item) => {
      const [value, priority] = element;
      console.log(`Item with value: ${value} and priority: ${priority} `);
    });
  }
}

const queue = new PriorityQueue();

queue.enqueue([1, 3]);
queue.enqueue([2, 2]);
queue.enqueue([3, 1]);
queue.enqueue([4, 6]);
queue.enqueue([5, 5]);
queue.enqueue([6, 4]);
queue.toString();
queue.run();
