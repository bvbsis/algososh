import React, { ChangeEvent, useCallback, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [item, setItem] = useState<string>("");
  const [stack, setStack] = useState<[string, ElementStates][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addToStack = async () => {
    setIsLoading(true);
    const newStack = stack;
    newStack.push([item, ElementStates.Changing]);
    setItem("");
    setStack([...newStack]);
    await delay(1000);
    newStack[newStack.length - 1][1] = ElementStates.Default;
    setStack([...newStack]);
    setIsLoading(false);
  };

  const deleteFromStack = async () => {
    setIsLoading(true);
    const newStack = stack;
    stack[stack.length - 1][1] = ElementStates.Changing;
    setStack([...newStack]);
    await delay(1000);
    newStack.pop();
    setStack([...newStack]);
    setIsLoading(false);
  };

  const clearStack = () => {
    setStack([]);
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
          disabled={!item}
          text="Добавить"
        />
        <Button
          style={{ marginRight: 80 }}
          onClick={deleteFromStack}
          disabled={!stack.length || isLoading}
          text="Удалить"
        />
        <Button
          onClick={clearStack}
          text="Очистить"
          disabled={!stack.length || isLoading}
        />
      </div>

      <div className={styles.stackContainer}>
        {stack.map((e, index) =>
          index === stack.length - 1 ? (
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
