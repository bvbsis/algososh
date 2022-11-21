import React, { ChangeEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { TNode } from "../../types/linked-list";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList, ListNode } from "./linked-list";
import styles from "./list-page.module.css";

const initialNode = new ListNode<TNode>(
  ["0", ElementStates.Default, "head", null],
  new ListNode<TNode>(
    ["34", ElementStates.Default, null, null],
    new ListNode<TNode>(
      ["8", ElementStates.Default, null, null],
      new ListNode<TNode>(["1", ElementStates.Default, null, "tail"])
    )
  )
);

export const ListPage: React.FC = () => {
  const [linkedList, setLinkedList] = useState(
    new LinkedList<TNode>(initialNode)
  );

  const [listArray, setListArray] = useState<TNode[]>([]);

  const [inputs, setInputs] = useState<{
    item: string;
    index: number | "";
  }>({
    item: "",
    index: "",
  });

  const [isLoading, setIsLoading] = useState<{
    addToHead: boolean;
    addToTail: boolean;
    deleteHead: boolean;
    deleteTail: boolean;
    addByIndex: boolean;
    deleteByIndex: boolean;
    isLoading: boolean;
  }>({
    addToHead: false,
    addToTail: false,
    deleteHead: false,
    deleteTail: false,
    addByIndex: false,
    deleteByIndex: false,
    isLoading: false,
  });

  useEffect(() => {
    setListArray([...linkedList.toArray()]);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.name === "index" &&
      (Number(e.target.value) < 0 || Number(e.target.value) > listArray.length)
    ) {
      return;
    }
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addToHead = async () => {
    setIsLoading((prevState) => {
      return { ...prevState, addToHead: true, isLoading: true };
    });
    const newArray = [...listArray];
    const { length } = newArray;
    if (length) {
      newArray[0] = [
        newArray[0][0],
        ElementStates.Default,
        <Circle
          letter={inputs.item}
          isSmall={true}
          state={ElementStates.Changing}
        />,
        null,
      ];
      setListArray([...newArray]);
      await delay(500);
      newArray[0] = [newArray[0][0], ElementStates.Default, null, null];
      setListArray([...newArray]);
      newArray.unshift([inputs.item, ElementStates.Modified, "head", null]);
      setListArray([...newArray]);
      await delay(500);
      if (linkedList.head) {
        linkedList.head.value[2] = null;
      }
    }
    linkedList.prepend([inputs.item, ElementStates.Default, "head", null]);
    setListArray([...linkedList.toArray()]);
    setInputs({
      item: "",
      index: "",
    });
    setIsLoading((prevState) => {
      return { ...prevState, addToHead: false, isLoading: false };
    });
  };

  const addToTail = async () => {
    setIsLoading((prevState) => {
      return { ...prevState, addToTail: true, isLoading: true };
    });

    const newArray = [...listArray];
    const { length } = newArray;
    if (length) {
      newArray[length - 1] = [
        newArray[length - 1][0],
        ElementStates.Default,
        <Circle
          letter={inputs.item}
          isSmall={true}
          state={ElementStates.Changing}
        />,
        "tail",
      ];
      setListArray([...newArray]);
      await delay(500);
      newArray[length - 1] = [
        newArray[length - 1][0],
        ElementStates.Default,
        null,
        null,
      ];
      newArray.push([inputs.item, ElementStates.Modified, null, "tail"]);
      setListArray([...newArray]);
      await delay(500);
      newArray[length] = [inputs.item, ElementStates.Default, null, "tail"];
      setListArray([...newArray]);
      if (linkedList.tail) {
        linkedList.tail.value[3] = null;
      }
    }
    linkedList.append([inputs.item, ElementStates.Default, null, "tail"]);
    setListArray([...linkedList.toArray()]);
    setInputs({
      item: "",
      index: "",
    });
    setIsLoading((prevState) => {
      return { ...prevState, addToTail: false, isLoading: false };
    });
  };

  const deleteFromHead = async () => {
    setIsLoading((prevState) => {
      return { ...prevState, deleteHead: true, isLoading: true };
    });
    const newArray = [...listArray];
    newArray[0] = [
      "",
      ElementStates.Default,
      null,
      <Circle
        letter={newArray[0][0]}
        state={ElementStates.Changing}
        isSmall={true}
      />,
    ];
    setListArray([...newArray]);
    await delay(500);
    linkedList.deleteHead();
    if (linkedList.head) {
      linkedList.head.value[2] = "head";
    }
    setListArray([...linkedList.toArray()]);
    setIsLoading((prevState) => {
      return { ...prevState, deleteHead: false, isLoading: false };
    });
  };

  const deleteFromTail = async () => {
    setIsLoading((prevState) => {
      return { ...prevState, deleteTail: true, isLoading: true };
    });
    const newArray = [...listArray];
    const { length } = listArray;
    newArray[length - 1] = [
      "",
      ElementStates.Default,
      null,
      <Circle
        letter={newArray[length - 1][0]}
        state={ElementStates.Changing}
        isSmall={true}
      />,
    ];
    setListArray([...newArray]);
    await delay(500);
    linkedList.deleteTail();
    if (linkedList.tail) {
      linkedList.tail.value[3] = "tail";
    }
    setListArray([...linkedList.toArray()]);
    setIsLoading((prevState) => {
      return { ...prevState, deleteTail: false, isLoading: false };
    });
  };

  const addByIndex = async () => {
    setIsLoading((prevState) => {
      return { ...prevState, addByIndex: true, isLoading: true };
    });
    let newArray = [...listArray];

    const { length } = newArray;
    if (length) {
      for (let i = 0; i < Number(inputs.index); i++) {
        newArray[i] = [
          newArray[i][0],
          newArray[i][1],
          <Circle
            isSmall={true}
            state={ElementStates.Changing}
            letter={inputs.item}
          />,
          newArray[i][3],
        ];
        setListArray([...newArray]);
        await delay(500);
        if (i === 0) {
          newArray[i] = [
            newArray[i][0],
            ElementStates.Changing,
            "head",
            newArray[i][3],
          ];
        } else {
          newArray[i] = [
            newArray[i][0],
            ElementStates.Changing,
            null,
            newArray[i][3],
          ];
        }
      }
      newArray = [
        ...newArray.slice(0, Number(inputs.index)),
        [inputs.item, ElementStates.Modified, null, null],
        ...newArray.slice(Number(inputs.index), length),
      ];
      setListArray([...newArray]);
      await delay(500);
      if (linkedList.tail && Number(inputs.index) === length) {
        linkedList.tail.value[3] = null;
      } else if (linkedList.head && Number(inputs.index) === 0) {
        linkedList.head.value[2] = null;
      }
    }
    linkedList.insertAt(Number(inputs.index), [
      inputs.item,
      ElementStates.Default,
      null,
      null,
    ]);
    console.log(linkedList.head, linkedList.tail, length);
    if (linkedList.tail && Number(inputs.index) === length) {
      linkedList.tail.value[3] = "tail";
    } else if (linkedList.head && Number(inputs.index) === 0) {
      linkedList.head.value[2] = "head";
    }
    setListArray([...linkedList.toArray()]);
    setInputs({
      item: "",
      index: "",
    });

    setIsLoading((prevState) => {
      return { ...prevState, addByIndex: false, isLoading: false };
    });
  };

  const deleteByIndex = async () => {
    setIsLoading((prevState) => {
      return { ...prevState, deleteByIndex: true, isLoading: true };
    });
    let newArray = [...listArray];
    const { length } = newArray;
    if (Number(inputs.index) > length - 1 || Number(inputs.index) < 0) {
      setIsLoading((prevState) => {
        return { ...prevState, deleteByIndex: false, isLoading: false };
      });
      return;
    }

    for (let i = 0; i < Number(inputs.index); i++) {
      newArray[i] = [
        newArray[i][0],
        ElementStates.Changing,
        newArray[i][2],
        newArray[i][3],
      ];

      setListArray([...newArray]);
      await delay(500);
    }
    newArray[Number(inputs.index)][3] = (
      <Circle
        isSmall={true}
        state={ElementStates.Changing}
        letter={newArray[Number(inputs.index)][0]}
      />
    );
    newArray[Number(inputs.index)][0] = "";
    setListArray([...newArray]);
    await delay(500);
    if (linkedList.tail && Number(inputs.index) === length) {
      linkedList.tail.value[3] = null;
    } else if (linkedList.head && Number(inputs.index) === 0) {
      linkedList.head.value[2] = null;
    }

    linkedList.deleteAt(Number(inputs.index));

    if (linkedList.tail && Number(inputs.index) === length - 1) {
      linkedList.tail.value[3] = "tail";
    } else if (linkedList.head && Number(inputs.index) === 0) {
      linkedList.head.value[2] = "head";
    }
    setListArray([...linkedList.toArray()]);
    setInputs({
      item: "",
      index: "",
    });
    setIsLoading((prevState) => {
      return { ...prevState, deleteByIndex: false, isLoading: false };
    });
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.inputContainer}>
        <Input
          onChange={onChange}
          maxLength={4}
          isLimitText={true}
          extraClass={styles.input}
          value={inputs.item}
          name="item"
          placeholder="Введите значение"
        />
        <Button
          disabled={
            isLoading.isLoading || !inputs.item || listArray.length >= 7
          }
          isLoader={isLoading.addToHead}
          style={{ width: 175 }}
          onClick={addToHead}
          text="Добавить в head"
        />
        <Button
          disabled={
            isLoading.isLoading || !inputs.item || listArray.length >= 7
          }
          isLoader={isLoading.addToTail}
          style={{ width: 175 }}
          onClick={addToTail}
          text="Добавить в tail"
        />
        <Button
          disabled={isLoading.isLoading || !listArray.length}
          isLoader={isLoading.deleteHead}
          style={{ width: 175 }}
          onClick={deleteFromHead}
          text="Удалить из head"
        />
        <Button
          disabled={isLoading.isLoading || !listArray.length}
          isLoader={isLoading.deleteTail}
          style={{ width: 175 }}
          onClick={deleteFromTail}
          text="Удалить из tail"
        />
      </div>
      <div className={styles.inputContainer}>
        <Input
          name="index"
          type="number"
          extraClass={styles.input}
          onChange={onChange}
          value={inputs.index}
          placeholder="Введите индекс"
        />
        <Button
          disabled={
            isLoading.isLoading ||
            inputs.index === "" ||
            inputs.item === "" ||
            listArray.length >= 7 ||
            Number(inputs.index) > listArray.length ||
            Number(inputs.index) < 0
          }
          onClick={addByIndex}
          style={{ width: 362 }}
          isLoader={isLoading.addByIndex}
          text="Добавить по индексу"
        />
        <Button
          disabled={
            isLoading.isLoading ||
            inputs.index === "" ||
            !listArray.length ||
            Number(inputs.index) > listArray.length - 1 ||
            Number(inputs.index) < 0
          }
          onClick={deleteByIndex}
          style={{ width: 362 }}
          isLoader={isLoading.deleteByIndex}
          text="Удалить по индексу"
        />
      </div>
      <div className={styles.listContainer}>
        {listArray.map((e, index, arr) =>
          index !== arr.length - 1 ? (
            <React.Fragment key={index}>
              <Circle
                head={e[2]}
                tail={e[3]}
                index={index}
                state={e[1]}
                letter={e[0]}
              />
              <ArrowIcon state={e[1]} />
            </React.Fragment>
          ) : (
            <Circle
              head={e[2]}
              tail={e[3]}
              state={e[1]}
              index={index}
              letter={e[0]}
              key={index}
            />
          )
        )}
      </div>
    </SolutionLayout>
  );
};
