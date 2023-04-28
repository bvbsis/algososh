# Проектная работа. МБОУ АЛГОСОШ им. Фибоначчи

В проектной работе мы предлагаем вам написать визуализатор алгоритмов, которые вы будете изучать в течение месяца. Эта проектная работа заточена на анимацию и поэтапное отображение работы алгоритма, что позволит вам детальнее понять каждый шаг его работы.

Мы подготовили [дизайн проекта.](https://www.figma.com/file/RIkypcTQN5d37g7RRTFid0/Algososh_external_link?node-id=0%3A1) Там вы сможете найти необходимые цвета, размеры и примерную раскадровку визуализации, но сначала изучите описание работы.

В репозитории есть заготовка проекта на React. Если его запустить, то вы увидите разводящую страницу и отдельные страницы для визуализации алгоритмов, так что беспокоиться о роутинге не надо. В папке ui вы найдёте готовые компоненты, которые пригодятся вам в работе. Вам предстоит сосредоточиться на алгоритмах и анимациях. 

В качестве примера вы можете подглядеть работу подобных сервисов по визуализации, например, [visualgo.net](https://visualgo.net/en), или полностью самостоятельно разобраться в задаче. Дерзайте!

## Строка

<p align='center'><img width=333 src='./README_static/Untitled.png'/><img width=333 src='./README_static/Untitled%201.png'/><img width=333 src='./README_static/Untitled%202.png'/></p>


## Последовательность Фибоначчи



![Начальное состояние страницы](README_static/Untitled%203.png)


![Сгенерированная последовательность](README_static/Untitled%204.png)


## Сортировка массива


![Начальное состояние страницы](README_static/Untitled%205.png)



```tsx
// сгенерированный массив
const arr = [25, 50, 100];
// высоты элементов массива
// `${(340 * arr[i]) / 100}px`
['85px', '170px', '340px']
```


---

## Стек

На этом экране вам предстоит визуализировать удаление и добавление элементов в структуру данных стек


![Начальное состояние страницы](README_static/Untitled%206.png)

---

## Очередь

![Начальное состояние страницы](README_static/Untitled%207.png)


![Очередь из трёх элементов в момент добавления](README_static/Untitled%209.png)


![Очередь после `dequeue();`](README_static/Untitled%2010.png)

нте Сircle.

---

## Связный список



![Начальное состояние страницы](README_static/Untitled%2011.png)



![Добавление в head](README_static/Untitled%2012.png)



![Отображение нового элемента в head](README_static/Untitled%2013.png)


![Добавление по индексу. Новый элемент в списке](README_static/Untitled%2015.png)



![Удаление элемента под индексом 2](README_static/Untitled%2016.png)


![Удаление элемента из tail](README_static/Untitled%2017.png)


