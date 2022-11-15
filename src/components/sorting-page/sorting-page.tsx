import React, { useCallback, useState } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([2, 34, 17, 100, 50]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const generateArray = useCallback(() => {
    const newArr: number[] = [];
    let newArrLength = Math.floor(Math.random() * 15) + 3;
    while (newArrLength > 0) {
      newArr.push(Math.floor(Math.random() * 101));
      newArrLength--;
    }
    setArray(newArr);
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.inputContainer}>
        <RadioInput disabled={isLoading} label="Выбор" />
        <RadioInput disabled={isLoading} extraClass={styles.marginLeft40} label="Пузырёк" />
        <Button
          sorting={Direction.Ascending}
          style={{ marginLeft: 52 }}
          text="По возрастанию"
        />
        <Button
          sorting={Direction.Descending}
          style={{ marginLeft: 12 }}
          text="По убыванию"
        />
        <Button
          style={{ marginLeft: 80, flexGrow: 2 }}
          onClick={generateArray}
          text="Новый массив"
        />
      </div>
      <div className={styles.arrayContainer}>
        {array.map((e, index) => (
          <Column key={index} index={e} />
        ))}
      </div>
    </SolutionLayout>
  );
};
