import React, { useCallback, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { swap } from "../../utils/swap";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<[number, number, ElementStates][]>([
    [2, 1, ElementStates.Default],
    [34, 2, ElementStates.Default],
    [17, 3, ElementStates.Default],
    [100, 4, ElementStates.Default],
    [50, 5, ElementStates.Default],
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<Direction>();
  const [sortingType, setSortingType] = useState<
    "bubbleSort" | "selectionSort"
  >("selectionSort");

  const generateArray = useCallback(() => {
    const newArr: [number, number, ElementStates][] = [];
    let newArrLength = Math.floor(Math.random() * 15) + 3;
    let id = 1;
    while (newArrLength > 0) {
      newArr.push([Math.floor(Math.random() * 101), id, ElementStates.Default]);
      newArrLength--;
      id++;
    }
    setArray(newArr);
  }, []);

  const bubbleSort = useCallback(
    async (direction) => {
      setIsLoading(true);
      let arr = array;
      let tail = arr.length - 1;
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          arr[j][2] = ElementStates.Changing;
          arr[j + 1][2] = ElementStates.Changing;
          if (
            direction === Direction.Ascending
              ? arr[j][0] > arr[j + 1][0]
              : direction === Direction.Descending
              ? arr[j][0] < arr[j + 1][0]
              : null
          ) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
          setArray([...arr]);
          await delay(500);
          arr[j][2] = ElementStates.Default;
          arr[j + 1][2] = ElementStates.Default;
        }
        arr[tail][2] = ElementStates.Modified;
        tail--;
      }
      arr[0][2] = ElementStates.Modified;
      arr[1][2] = ElementStates.Modified;
      setArray([...arr]);
      setIsLoading(false);
    },
    [array]
  );

  const selectionSort = useCallback(
    async (direction) => {
      setIsLoading(true);
      const arr = array;
      const { length } = arr;
      for (let i = 0; i < length - 1; i++) {
        let maxInd = i;
        for (let j = i + 1; j < length; j++) {
          arr[i][2] = ElementStates.Changing;
          arr[j][2] = ElementStates.Changing;
          setArray([...arr]);
          await delay(500)
          arr[i][2] = ElementStates.Default;
          arr[j][2] = ElementStates.Default;
          if (
            direction === Direction.Ascending
              ? arr[j][0] < arr[maxInd][0]
              : direction === Direction.Descending
              ? arr[j][0] > arr[maxInd][0]
              : null
          ) {
            maxInd = j;
          }
        }
        swap(arr, maxInd, i);
        arr[i][2] = ElementStates.Modified;
        setArray([...arr]);
      }
      
      arr[length - 1][2] = ElementStates.Modified
      setArray([...arr]);
      setIsLoading(false);
    },
    [array]
  );

  function startSorting(direction: Direction) {
    if (sortingType === "bubbleSort") {
      bubbleSort(direction);
    }
    if (sortingType === "selectionSort") {
      selectionSort(direction);
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.inputContainer}>
        <RadioInput
          checked={sortingType === "selectionSort"}
          onChange={() => {
            setSortingType("selectionSort");
          }}
          disabled={isLoading}
          label="Выбор"
        />
        <RadioInput
          disabled={isLoading}
          checked={sortingType === "bubbleSort"}
          onChange={() => {
            setSortingType("bubbleSort");
          }}
          extraClass={styles.marginLeft40}
          label="Пузырёк"
        />
        <Button
          sorting={Direction.Ascending}
          style={{ marginLeft: 52 }}
          onClick={() => {
            setLoadingButton(Direction.Ascending);
            startSorting(Direction.Ascending);
          }}
          text="По возрастанию"
          isLoader={loadingButton === Direction.Ascending && isLoading}
          disabled={loadingButton !== Direction.Ascending && isLoading}
        />
        <Button
          sorting={Direction.Descending}
          style={{ marginLeft: 12 }}
          onClick={() => {
            setLoadingButton(Direction.Descending);
            startSorting(Direction.Descending);
          }}
          text="По убыванию"
          isLoader={loadingButton === Direction.Descending && isLoading}
          disabled={loadingButton !== Direction.Descending && isLoading}
        />
        <Button
          style={{ marginLeft: 80, flexGrow: 2 }}
          onClick={generateArray}
          text="Новый массив"
          disabled={isLoading}
        />
      </div>
      <div className={styles.arrayContainer}>
        {array.map((e) => (
          <Column key={e[1]} index={e[0]} state={e[2]} />
        ))}
      </div>
    </SolutionLayout>
  );
};
