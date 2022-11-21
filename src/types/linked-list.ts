import { ElementStates } from "./element-states";

export interface ILikedList<T> {
  prepend: (value: T) => void;
  append: (value: T) => void;
  deleteTail: () => void;
  deleteHead: () => void;
  insertAt: (index: number, value: T) => void;
  deleteAt: (index: number) => void;
  toArray: () => T[];
}

export type TNode = [
  string,
  ElementStates,
  string | React.ReactElement | null,
  string | React.ReactElement | null
];