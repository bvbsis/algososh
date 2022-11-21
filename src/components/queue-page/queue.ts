import { IQueue } from "../../types/queue";

export class Queue<T> implements IQueue<T> {
  container: T[] = [];
  initialQueue: T[] = [];

  constructor(initialQueue: T[]) {
    this.container = [...initialQueue];
    this.initialQueue = initialQueue;
  }

  push = (item: T) => {
    this.container.push(item);
  };

  pop = () => {
    this.container.pop();
  };

  clear = () => {
    this.container = [...this.initialQueue];
  };

  getLength = () => this.container.length;
}
