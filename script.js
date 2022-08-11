let matrix = [];
let stepCount = 0;
let cols = 3;
let rows = 3;
let mark = "X";
let cells = Array.from(document.querySelectorAll("[data-cell]"));
/**
Fejtsd ki az initState elnevezésű függvényt, 
amely feltölti üres mezőkkel a játékteret, 
tehát az összes sort és oszlopot a mátrixban.

Alkalmazz egymásba ágyazott for ciklusokat
vagy a fill metódust null értékkel.
Először a sorokat, majd az oszlopokat töltsd fel,
de fordítva is csinálhatod.

A fillt alkalmazó megoldásnál a matrix tartalma:
az oszlopok száma tömbbé alakítva, 
ezt töltöd fel null-lal,
majd végigmész a tömbön,
és meghívsz egy arrow function-t.
Ez utóbbi visszatérési értéke:
a sorok száma tömbbé alakítva,
és feltöltve null-lal.
@returns void (nem ad vissza semmit)
*/

//var myGrid = [...Array(6)].map(e => Array(6).fill(value));

/* const initState = () => {
  for (let i = 0; i < rows; ++i) {
    matrix[i] = [];
    for (let k = 0; k < cols; k++) {
      matrix[i][k] = " ";
    }
  }
};
 */
const initState = () => {
  matrix = new Array(cols).fill(null).map((item) => new Array(rows).fill(null));
};

/**
A changeMatrixValue függvény már készen van, 
ennek a segítségével tudjuk azonosítani az egyes cellákat.
FONTOS:
Ahhoz, hogy megfelelően működjön a kódod, 
a HTML-ben a játéktérben a sorokat és oszlopokat a következőképpen vedd fel:

    <div data-cell="0" data-row="0" class="cell"></div>
    <div data-cell="1" data-row="0" class="cell"></div>
    <div data-cell="2" data-row="0" class="cell"></div>
    <div data-cell="0" data-row="1" class="cell"></div>
    <div data-cell="1" data-row="1" class="cell"></div>
    <div data-cell="2" data-row="1" class="cell"></div>
    <div data-cell="0" data-row="2" class="cell"></div>
    <div data-cell="1" data-row="2" class="cell"></div>
    <div data-cell="2" data-row="2" class="cell"></div>

A datasetről itt olvashatsz bővebben:
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
*/
const changeMatrixValue = (element) => {
  const row = parseInt(element.dataset.row, 10);
  const cell = parseInt(element.dataset.cell, 10);
  matrix[row][cell] = element.textContent;
};

/**
Fejtsd ki a deleteSigns elnevezésű függvényt, 
amely kiválasztja az összes cellát, 
és mindegyik elemben elhelyez egy üres string-et.
*/
const deleteSigns = () => {
  cells.forEach((el) => (el.textContent = " "));
};

/**
Fejtsd ki az increaseCounter elnevezésű függvényt, 
amely a megtett lépések számát növeli eggyel.
*/
const increaseCounter = () => {
  stepCount++;
};

/**
Fejtsd ki a modifyCell elnevezésű függvényt, 
amely beállítja az elem tartalmának a használt jelet,
majd kattintásra (esemény) eltávolítja a handleClick függvényt. 
*/
const modifyCell = (element) => {
  element.textContent = mark;
  element.removeEventListener("click", handleClick);
};

/**
Fejtsd ki a setMark elnevezésű függvényt, 
amely a jelre beállítja a következő lépésnél használt jelet úgy, 
hogy ha az X-et használtuk éppen, azaz a jel === X, 
akkor beállítja a 0-t, hiszen a másik játékos azzal fog tenni egy jelet,
ha pedig a 0-t használtuk, beállítja az X-et.
*/
const setMark = () => {
  mark = mark === "X" ? "0" : "X";
};

/**
Fejtsd ki a handleClick elnevezésű függvényt, 
amely meghívja a következő függvényeket:
- increaseCounter()
- modifyCell(event.target)
- setMark()
- changeMatrixValue(event.target)
- checkWinner()
*/
const handleClick = (event) => {
  console.log(event.target);
  increaseCounter();
  modifyCell(event.target);
  setMark();
  changeMatrixValue(event.target);
  checkWinner();
  checkDraw();
  stepCount > 0 ? setButtonMessage("Restart") : "";
};

/**
Fejtsd ki az addClickListener elnevezésű függvényt, 
amely kiválasztja a cellákat, 
és kattintásra (esemény) mindegyikhez hozzáadja a handleClick függvényt.
*/
const addClickListener = () => {
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
};

/**
Fejtsd ki a removeAllClickListeners elnevezésű függvényt, 
amely kiválasztja a cellákat, 
és kattintásra (esemény) mindegyikről eltávolítja a handleClick függvényt.
*/
const removeAllClickListeners = () => {
  cells.forEach((cell) => cell.removeEventListener("click", handleClick));
};

/**
Fejtsd ki a checkValues elnevezésű függvényt, 
amely végigmegy a kapott tömb sorain,
és a sor minden EGYES elemének értéke esetében megvizsgálja, 
hogy az 0 vagy X. 
Ha a sor minden egyes eleme 0 vagy X, 
akkor a 0 vagy az X győzött.
Ha valaki győzött, akkor pl. egy ilyen tömböt kapunk: [true, false, false]
*/
const checkValues = (array) =>
  array
    .map((row) => {
      return (
        row.every((cell) => cell === "X") || row.every((cell) => cell === "0")
      );
    })
    .indexOf(true) !== -1;

/*
    Ha true-t kapunk visza adott sorra, akkor 
    annak indexét vizsgálva nem kaphatunk -1-et.
    Azaz az elem benne van a tömbben.
    */

const checkColumnValues = () =>
  checkValues(matrix.map((array, i) => array.map((item, j) => matrix[j][i])));

const checkDiagonalValues = () =>
  checkValues([
    matrix.map((array, i) => matrix[i][i]),
    matrix.map((array, i) => matrix[i][matrix[i].length - i - 1]),

    /*
    Miután az első függvénnyel leellenőriztük a sorok tartalmát,
    a fentiekkel megvizsgáljuk az oszlopok és az átlókban lévő mezők tartalmát.
    Ez azért fontos, mert így tudhatjuk meg, 
    hogy lesz-e három azonos jel egymás mellett/alatt/átlósan.
    */
  ]);

/*
Fejtsd ki a checkWinner elnevezésű függvényt, 
amely...
*/
const checkWinner = () => {
  // ...kiírja a konzolra a checkColumnValues()t és a checkDiagonalValues()-t,
  console.log(checkColumnValues(), checkDiagonalValues());
  if (checkValues(matrix) || checkColumnValues() || checkDiagonalValues())
    endGame();
  /*
    majd meghívja az endGame()-et, ha hogy HA
    a checkValues(matrix) vagy a checkColumnValues() vagy a checkDiagonalValues() igaz.
    */
};

const checkDraw = () => {
  stepCount === 9 ? setMessage("Draw") : "";
};
/**
A HTML-ben a játékteret követően vegyél fel egy divet message osztállyal,
'Let's play.' tartalommal.

Fejtsd ki a setMessage elnevezésű függvényt, 
amely kiválasztja a message osztályú elemet, 
és az üzenetet állítja be a div tartalmának.
*/
const setMessage = (message) => {
  document.querySelector(".message").textContent = message;
};

/**
Fejtsd ki a startGame elnevezésű függvényt, 
amely meghívja a következő függvényeket:
- initState()
- addClickListener()
- newGame()
*/
const startGame = () => {
  initState();
  addClickListener();
  newGame();
};

/**
Fejtsd ki az endGame elnevezésű függvényt, 
amely a setMessage nevű függvény segítségével beállítja az üzenetet, 
amelynek tartalma:
'The winner is Player ' 
plusz: 
(mark === 'X' ? 'O' : 'X') + '.')

Ez az utóbbi kódrészlet kiválasztja azt a jelet, amellyel a nyertes játszott
(és egy pontot helyez el a mondat végén).

Ezután a függvény meghívja a removeAllClickListeners() nevű függvényt.
*/
const endGame = () => {
  setMessage(`The winner is Player ${mark === "X" ? "O" : "X"}.`);
  removeAllClickListeners();
  setButtonMessage("Restart");
};

/*
Indíts el egy új játékot az alábbi függvény segítségével!

Hozz létre a HTML-ben a játéktéren kívül egy gombot!
*/
const newGame = () => {
  document.querySelector(".button__start").addEventListener("click", () => {
    initState();
    addClickListener();
    deleteSigns();
    setMessage("Playing...");
    setMark();
  });
  // Válaszd ki a gombot!
  /*
    Tegyél rá/adj hozzá egy eseményfigyelőt, 
    amely kattintásra meghívja a következő függvényeket:
        - initState()
        - addClickListener()
        - deleteSigns()
        - setMessage('Playing...')
        - setMark()
        */
};

document.querySelector(".button__start").addEventListener("click", () => {
  startGame();
  setButtonMessage("Start");
  setMessage("Playing...");
});

const setButtonMessage = function (message) {
  document.querySelector(".button__start").textContent = message;
};
