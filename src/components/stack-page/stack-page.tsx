import React, { ChangeEvent, useCallback, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getLength: () => number;
}

class Stack<T> implements IStack<T> {
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

export const StackPage: React.FC = () => {
  const [item, setItem] = useState<string>("");
  const [stack, setStack] = useState(new Stack<[string, ElementStates]>());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addToStack = async () => {
    setIsLoading(true);
    if (stack.getLength() < 7) {
      stack.push([item, ElementStates.Changing]);
      setItem("");
      await delay(1000);
      stack.container[stack.getLength() - 1][1] = ElementStates.Default;
    }
    setIsLoading(false);
  };

  const deleteFromStack = async () => {
    setIsLoading(true);
    stack.container[stack.getLength() - 1][1] = ElementStates.Changing;
    await delay(1000);
    stack.pop();
    setIsLoading(false);
  };

  const clearStack = async () => {
    setIsLoading(true);
    await delay(0);
    stack.clear();
    setIsLoading(false);
  };

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  }, []);

  return (
    <SolutionLayout title="Стек">
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
          onClick={addToStack}
          disabled={!item || stack.getLength() >= 7}
          text="Добавить"
        />
        <Button
          style={{ marginRight: 80 }}
          onClick={deleteFromStack}
          disabled={!stack.getLength() || isLoading}
          text="Удалить"
        />
        <Button
          onClick={clearStack}
          text="Очистить"
          disabled={!stack.getLength() || isLoading}
        />
      </div>

      <div className={styles.stackContainer}>
        {stack.container.map((e, index) =>
          index === stack.getLength() - 1 ? (
            <Circle
              head="top"
              letter={e[0]}
              state={e[1]}
              index={index}
              key={index}
            />
          ) : (
            <Circle letter={e[0]} state={e[1]} index={index} key={index} />
          )
        )}
      </div>
    </SolutionLayout>
  );
};
