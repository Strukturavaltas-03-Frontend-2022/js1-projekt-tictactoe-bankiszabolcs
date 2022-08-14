let matrix = [];
let stepCount = 0;
let cols = 3;
let rows = 3;
let mark = "X";
let cells = Array.from(document.querySelectorAll("[data-cell]"));

const initState = () => {
  matrix = new Array(cols).fill(null).map((item) => new Array(rows).fill(null));
};

const changeMatrixValue = (element) => {
  const row = parseInt(element.dataset.row, 10);
  const cell = parseInt(element.dataset.cell, 10);
  matrix[row][cell] = element.textContent;
};

const deleteSigns = () => {
  cells.forEach((el) => (el.textContent = " "));
};

const increaseCounter = () => {
  stepCount++;
};

const modifyCell = (element) => {
  element.textContent = mark;
  element.removeEventListener("click", handleClick);
};

const setMark = () => {
  mark = mark === "X" ? "0" : "X";
};

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

const addClickListener = () => {
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
};

const removeAllClickListeners = () => {
  cells.forEach((cell) => cell.removeEventListener("click", handleClick));
};

const checkValues = (array) =>
  array
    .map((row) => {
      return (
        row.every((cell) => cell === "X") || row.every((cell) => cell === "0")
      );
    })
    .indexOf(true) !== -1;

const checkColumnValues = () =>
  checkValues(matrix.map((array, i) => array.map((item, j) => matrix[j][i])));

const checkDiagonalValues = () =>
  checkValues([
    matrix.map((array, i) => matrix[i][i]),
    matrix.map((array, i) => matrix[i][matrix[i].length - i - 1]),
  ]);

const checkWinner = () => {
  console.log(checkColumnValues(), checkDiagonalValues());
  if (checkValues(matrix) || checkColumnValues() || checkDiagonalValues())
    endGame();
};

const checkDraw = () => {
  stepCount === 9 ? setMessage("Draw") : "";
};

const setMessage = (message) => {
  document.querySelector(".message").textContent = message;
};

const startGame = () => {
  initState();
  addClickListener();
  newGame();
};

const endGame = () => {
  setMessage(`The winner is Player ${mark === "X" ? "O" : "X"}.`);
  removeAllClickListeners();
  setButtonMessage("Restart");
};

const newGame = () => {
  document.querySelector(".button__start").addEventListener("click", () => {
    initState();
    addClickListener();
    deleteSigns();
    setMessage("Playing...");
    setMark();
  });
};

document.querySelector(".button__start").addEventListener("click", () => {
  startGame();
  setButtonMessage("Start");
  setMessage("Playing...");
});

const setButtonMessage = function (message) {
  document.querySelector(".button__start").textContent = message;
};
