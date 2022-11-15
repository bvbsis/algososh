import React, { useCallback, useEffect, useState } from "react";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const justifyDigitsContainer = result.length <= 10 ? "center" : "initial";

  useEffect(() => {
    if (inputValue > 19) {
      setInputValue(19);
    }
    if (inputValue < 0) {
      setInputValue(0);
    }
  }, [inputValue]);

  const onInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const onButtonClick = useCallback(async () => {
    setIsLoading(true);
    let arr: number[] = [];
    let first = 1;
    let second = 1;
    setResult([first]);
    for (let i = 0; i <= inputValue; i++) {
      arr = [...arr, second];    
      setResult([...arr]);  
      await delay(500);
      const temp = first;
      first = second;
      second = temp + second;
    }
    setIsLoading(false);
    console.log(inputValue);
  }, [inputValue]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.inputContainer}>
        <Input
          isLimitText={true}
          placeholder="Введите число"
          max={19}
          type="number"
          value={inputValue}
          onChange={onInputChange}
          disabled={isLoading}
        />
        <Button
          text="Развернуть"
          disabled={!inputValue || inputValue < 0 || inputValue > 19}
          isLoader={isLoading}
          onClick={onButtonClick}
        />
      </div>
      <div
        style={{ justifyContent: justifyDigitsContainer }}
        className={styles.lettersContainer}
      >
        {result.map((e, index) => (
          <Circle letter={`${e}`} key={index} />
        ))}
      </div>
    </SolutionLayout>
  );
};
