import React, { ChangeEvent, useCallback, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { swap } from "../../utils/swap";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string-page.module.css";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [lettersValue, setLettersValue] = useState<
    (string | number | ElementStates)[][]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const onButtonClick = useCallback(async () => {
    setIsLoading(true);
    let arr: (string | number | ElementStates)[][] = inputValue
      .split("")
      .map((e, index) => [e, index]);
    let end = arr.length - 1;
    for (let start = 0; start <= end; start++) {
      if (start === end) {
        arr[start].push(ElementStates.Modified);
        setLettersValue([...arr]);
        break;
      }
      arr[start].push(ElementStates.Changing);
      arr[end].push(ElementStates.Changing);
      setLettersValue([...arr]);
      swap(arr, start, end);
      await delay(1000);
      setLettersValue([...arr]);
      arr[start].pop();
      arr[end].pop();
      arr[start].push(ElementStates.Modified);
      arr[end].push(ElementStates.Modified);
      end--;
    }
    setLettersValue([...arr]);
    setIsLoading(false);
  }, [inputValue]);

  return (
    <SolutionLayout title="Строка">
      <div className={styles.inputContainer}>
        <Input
          isLimitText={true}
          maxLength={11}
          value={inputValue}
          onChange={onInputChange}
          disabled={isLoading}
        />
        <Button
          text="Развернуть"
          disabled={!inputValue.length}
          isLoader={isLoading}
          onClick={onButtonClick}
        />
      </div>
      <div className={styles.lettersContainer}>
        {lettersValue.map((e) => (
          <Circle
            letter={e[0] as string}
            key={e[1]}
            state={e[2] as ElementStates}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
