import { IStack } from "../../types/stack";

export class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T) => {
    this.container.push(item);
  };

  pop = () => {
    this.container.pop();
  };

  clear = () => {
    this.container = [];
  };

  getLength = () => this.container.length;
}