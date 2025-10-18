window.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll("#board div");
  const statusDiv = document.getElementById("status");
  const newGameButton = document.querySelector(".btn");

  let currentPlayer = "X";
  let boardState = Array(9).fill(null);
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Exercise 1: Layout the board
  squares.forEach(square => {
    square.classList.add("square");

    // Exercise 3: Hover effect
    square.addEventListener("mouseover", () => {
      if (!square.textContent) square.classList.add("hover");
    });

    square.addEventListener("mouseout", () => {
      square.classList.remove("hover");
    });

    // Exercise 2: Add X or O on click
    square.addEventListener("click", () => {
      const index = Array.from(squares).indexOf(square);

      // Exercise 6: Prevent overwriting
      if (boardState[index] || checkWinner()) return;

      boardState[index] = currentPlayer;
      square.textContent = currentPlayer;
      square.classList.add(currentPlayer);

      // Exercise 4: Check winner
      if (checkWinner()) {
        statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
        statusDiv.classList.add("you-won");
      } else {
        // Alternate turns
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    });
  });

  // Exercise 5: Restart the game
  newGameButton.addEventListener("click", () => {
    boardState.fill(null);
    squares.forEach(square => {
      square.textContent = "";
      square.classList.remove("X", "O", "hover");
    });
    statusDiv.textContent = "Move your mouse over a square and click to play an X or an O.";
    statusDiv.classList.remove("you-won");
    currentPlayer = "X";
  });

  // Helper: Check for winner
  function checkWinner() {
    return winningCombos.some(combo => {
      const [a, b, c] = combo;
      return (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      );
    });
  }
});
