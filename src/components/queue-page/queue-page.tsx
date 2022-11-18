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

export const QueuePage: React.FC = () => {
  const [item, setItem] = useState<string>("");
  const [queue, setQueue] = useState([...initialQueue]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [head, setHead] = useState<number>(-1);
  const [tail, setTail] = useState<number>(-1);

  const addToQueue = async () => {
    setIsLoading(true);
    let newQueue = [...queue];
    const { length } = newQueue;

    if (head === tail && head === -1) {
      newQueue[0] = ["", 0, ElementStates.Changing];
      setQueue([...newQueue]);
      await delay(500);
      newQueue[0] = [item, 0, ElementStates.Changing];
      setQueue([...newQueue]);
      setHead(0);
      setTail(0);
      setItem("");
      await delay(500);
      newQueue[0] = [item, 0, ElementStates.Default];
      setQueue([...newQueue]);
    } else if (-1 < tail && tail < length - 1) {
      if (tail === head && newQueue[head][0] === "") {
        newQueue[head] = ["", head, ElementStates.Changing];
        setQueue([...newQueue]);
        await delay(500);
        newQueue[head] = [item, head, ElementStates.Changing];
        setQueue([...newQueue]);
        setTail(head);
        setItem("");
        await delay(500);
        newQueue[head] = [item, head, ElementStates.Default];
        setQueue([...newQueue]);
      } else {
        newQueue[tail + 1] = ["", tail + 1, ElementStates.Changing];
        setQueue([...newQueue]);
        await delay(500);
        newQueue[tail + 1] = [item, tail + 1, ElementStates.Changing];
        setQueue([...newQueue]);
        setTail((prevState) => prevState + 1);
        setItem("");
        await delay(500);
        newQueue[tail + 1] = [item, tail + 1, ElementStates.Default];
        setQueue([...newQueue]);
      }
    }
    setIsLoading(false);
  };

  const deleteFromQueue = async () => {
    setIsLoading(true);
    let newQueue = [...queue];
    if (head !== -1 && tail !== -1 && head !== tail) {
      newQueue[head] = [newQueue[head][0], head, ElementStates.Changing];
      setQueue([...newQueue]);
      await delay(500);
      setHead((prevState) => prevState + 1);
      newQueue[head] = ["", head, ElementStates.Default];
      setQueue([...newQueue]);
    } else if (head === tail && head !== -1) {
      newQueue[head] = [newQueue[head][0], head, ElementStates.Changing];
      setQueue([...newQueue]);
      await delay(500);
      newQueue[head] = ["", head, ElementStates.Default];
      setQueue([...newQueue]);
    }

    setIsLoading(false);
  };

  const clearQueue = () => {
    setQueue([...initialQueue]);
    setHead(-1);
    setTail(-1);
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
          disabled={!item || tail >= 6 || head === queue.length - 1}
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
        {queue.map((e, index) =>
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
