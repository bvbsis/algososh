import { ILikedList } from "../../types/linked-list";

export class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList<T> implements ILikedList<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;

  constructor(initialNode?: ListNode<T>) {
    this.head = initialNode ? initialNode : null;
    let currentNode = initialNode;
    while (currentNode?.next) {
      currentNode = currentNode.next;
    }
    this.tail = currentNode ? currentNode : null;
  }

  prepend = (value: T) => {
    const newNode = new ListNode(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
  };

  append = (value: T) => {
    const newNode = new ListNode(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
  };

  deleteTail = () => {
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }
    let currentNode = this.head;
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.tail = currentNode;
  };

  deleteHead = () => {
    if (!this.head) {
      return;
    }
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
  };

  insertAt = (index: number, value: T) => {
    index = Number(index);
    const newNode = new ListNode(value);
    let currentNode = this.head;

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    for (let i = 0; i < index - 1; i++) {
      if (currentNode?.next) {
        currentNode = currentNode.next;
      }
    }
    if (currentNode) {
      newNode.next = currentNode.next;
      currentNode.next = newNode;
    }
    if (Number(index) + 1 === this.toArray().length) {
      this.tail = newNode;
    }
  };

  deleteAt = (index: number) => {
    index = Number(index);
    let currentNode = this.head;
    if (index === 0 && currentNode) {
      this.head = currentNode.next;
      return;
    }

    for (let i = 0; i < index - 1; i++) {
      if (currentNode?.next) {
        currentNode = currentNode.next;
      }
    }
    if (currentNode?.next) {
      currentNode.next = currentNode?.next?.next;
    }
    if (Number(index) === this.toArray().length) {
      this.tail = currentNode;
    }
  };

  toArray = () => {
    const array: T[] = [];
    let currentNode = this.head;
    while (currentNode) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return [...array];
  };
}
