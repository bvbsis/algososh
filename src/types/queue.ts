export interface IQueue<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getLength: () => number;
}