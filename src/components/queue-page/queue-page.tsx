import React, { ChangeEvent, useCallback, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";

const initialQueue: [string, number, ElementStates][] = [
  ["", 0, ElementStates.Default],
  ["", 1, ElementStates.Default],
  ["", 2, ElementStates.Default],
  ["", 3, ElementStates.Default],
  ["", 4, ElementStates.Default],
  ["", 5, ElementStates.Default],
  ["", 6, ElementStates.Default],
];

interface IQueue<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getLength: () => number;
}

class Queue<T> implements IQueue<T> {
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

export const QueuePage: React.FC = () => {
  const [item, setItem] = useState<string>("");
  const [queue, setQueue] = useState(
    new Queue<[string, number, ElementStates]>(initialQueue)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [head, setHead] = useState<number>(-1);
  const [tail, setTail] = useState<number>(-1);
  console.log(queue.initialQueue, queue.container)

  const addToQueue = async () => {
    setIsLoading(true);

    if (head === tail && head === -1) {
      queue.container[0] = ["", 0, ElementStates.Changing];
      await delay(500);
      queue.container[0] = [item, 0, ElementStates.Changing];
      setHead(0);
      setTail(0);
      setItem("");
      await delay(500);
      queue.container[0] = [item, 0, ElementStates.Default];
    } else if (-1 < tail && tail < queue.getLength() - 1) {
      if (tail === head && queue.container[head][0] === "") {
        queue.container[head] = ["", head, ElementStates.Changing];
        await delay(500);
        queue.container[head] = [item, head, ElementStates.Changing];
        setTail(head);
        setItem("");
        await delay(500);
        queue.container[head] = [item, head, ElementStates.Default];
      } else {
        queue.container[tail + 1] = ["", tail + 1, ElementStates.Changing];
        await delay(500);
        queue.container[tail + 1] = [item, tail + 1, ElementStates.Changing];
        setTail((prevState) => prevState + 1);
        setItem("");
        await delay(500);
        queue.container[tail + 1] = [item, tail + 1, ElementStates.Default];
      }
    }
    setIsLoading(false);
  };

  const deleteFromQueue = async () => {
    setIsLoading(true);
    if (head !== -1 && tail !== -1 && head !== tail) {
      queue.container[head] = [
        queue.container[head][0],
        head,
        ElementStates.Changing,
      ];
      await delay(500);
      setHead((prevState) => prevState + 1);
      queue.container[head] = ["", head, ElementStates.Default];
    } else if (head === tail && head !== -1) {
      queue.container[head] = [
        queue.container[head][0],
        head,
        ElementStates.Changing,
      ];
      await delay(500);
      queue.container[head] = ["", head, ElementStates.Default];
    }

    setIsLoading(false);
  };

  const clearQueue = async () => {
    setIsLoading(true);
    await delay(0);
    queue.clear();
    setHead(-1);
    setTail(-1);
    setIsLoading(false);
  };

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  }, []);

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.inputContainer}>
        <Input
          extraClass={styles.input}
          value={item}
          disabled={isLoading}
          onChange={onInputChange}
          isLimitText={true}
          maxLength={4}
        />
        <Button
          style={{ marginRight: 12 }}
          onClick={addToQueue}
          disabled={!item || tail >= 6 || head === queue.getLength() - 1}
          text="Добавить"
        />
        <Button
          style={{ marginRight: 80 }}
          onClick={deleteFromQueue}
          disabled={isLoading || tail === -1}
          text="Удалить"
        />
        <Button
          onClick={clearQueue}
          text="Очистить"
          disabled={isLoading || tail === -1}
        />
      </div>

      <div className={styles.queueContainer}>
        {queue.container.map((e, index) =>
          index === tail && index === head && e[0] !== "" ? (
            <Circle
              head="head"
              tail="tail"
              letter={e[0]}
              state={e[2]}
              index={index}
              key={e[1]}
            />
          ) : index === head ? (
            <Circle
              head="head"
              letter={e[0]}
              state={e[2]}
              index={index}
              key={e[1]}
            />
          ) : index === tail ? (
            <Circle
              tail="tail"
              letter={e[0]}
              state={e[2]}
              index={index}
              key={e[1]}
            />
          ) : index === tail && index === head && e[0] === "" ? (
            <Circle
              head="head"
              letter={e[0]}
              state={e[2]}
              index={index}
              key={e[1]}
            />
          ) : (
            <Circle letter={e[0]} state={e[2]} index={index} key={e[1]} />
          )
        )}
      </div>
    </SolutionLayout>
  );
};
