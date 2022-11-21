import React, { ChangeEvent, useCallback, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [item, setItem] = useState<string>("");
  const [stack, setStack] = useState(new Stack<[string, ElementStates]>());
  const [isLoading, setIsLoading] = useState<{
    isLoading: boolean;
    addToStack: boolean;
    deleteFromStack: boolean;
    clearStack: boolean;
  }>({
    isLoading: false,
    addToStack: false,
    deleteFromStack: false,
    clearStack: false,
  });

  const addToStack = async () => {
    setIsLoading((prevState) => {
      return { ...prevState, isLoading: true, addToStack: true };
    });
    if (stack.getLength() < 7) {
      stack.push([item, ElementStates.Changing]);
      setItem("");
      await delay(1000);
      stack.container[stack.getLength() - 1][1] = ElementStates.Default;
    }
    setIsLoading((prevState) => {
      return { ...prevState, isLoading: false, addToStack: false };
    });
  };

  const deleteFromStack = async () => {
    setIsLoading((prevState) => {
      return { ...prevState, isLoading: true, deleteFromStack: true };
    });
    stack.container[stack.getLength() - 1][1] = ElementStates.Changing;
    await delay(1000);
    stack.pop();
    setIsLoading((prevState) => {
      return { ...prevState, isLoading: false, deleteFromStack: false };
    });
  };

  const clearStack = async () => {
    setIsLoading((prevState) => {
      return { ...prevState, isLoading: true, clearStack: true };
    });
    await delay(0);
    stack.clear();
    setIsLoading((prevState) => {
      return { ...prevState, isLoading: false, clearStack: false };
    });
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
          disabled={isLoading.isLoading}
          onChange={onInputChange}
          isLimitText={true}
          maxLength={4}
        />
        <Button
          style={{ marginRight: 12 }}
          onClick={addToStack}
          isLoader={isLoading.addToStack}
          disabled={!item || stack.getLength() >= 7 || isLoading.isLoading}
          text="Добавить"
        />
        <Button
          style={{ marginRight: 80 }}
          onClick={deleteFromStack}
          isLoader={isLoading.deleteFromStack}
          disabled={!stack.getLength() || isLoading.isLoading}
          text="Удалить"
        />
        <Button
          onClick={clearStack}
          text="Очистить"
          isLoader={isLoading.clearStack}
          disabled={!stack.getLength() || isLoading.isLoading}
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
