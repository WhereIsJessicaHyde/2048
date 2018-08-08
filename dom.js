//funcion para introducir fichas
function renderTiles () {
  game.board.forEach(function(row, rowIndex){
    row.forEach(function (cell, cellIndex) {
      if (cell) {
        var tileContainer = document.getElementById("tile-container");
        var newTile       = document.createElement("div");

        newTile.classList  = "tile val-" + cell;
        newTile.classList += " tile-position-" + rowIndex + "-" + cellIndex;
        newTile.innerHTML  = (cell);

        tileContainer.appendChild(newTile);
      }
    });
  });
}

//esta funcion sirve para borrar las fichas del tablero
function resetTiles () {
  var tilesContainer = document.getElementById("tile-container");
  var tiles          = tilesContainer.getElementsByClassName("tile");

  Array.prototype.slice.call(tiles).forEach(function (tile) {
    tilesContainer.removeChild(tile);
  });
}

// funcion que actualiza la puntuación
function updateScore () {
  var score          = game.score;
  var scoreContainer = document.getElementsByClassName("js-score");

  Array.prototype.slice.call(scoreContainer).forEach(function (span) {
    span.innerHTML = score;
  });
}

// controla si hemos ganado o perdido
function gameStatus () {
  if (game.win()) {
    document.getElementsByClassName("game-over").classList = "show-won";
  } else if (game.lose()) {
    document.getElementsByClassName("game-over").classList = "show-lost";
  }
}

// funcion que controla el movimiento de las fichas, la suma de estas y la
// actualizacion de la puntuación
function moveListeners (event) {
  var keys = [37, 38, 39, 40];

  if (keys.indexOf(event.keyCode) < 0)
    return;

  switch (event.keyCode) {
    case 37: game.move("left");  break;
    case 38: game.move("up");    break;
    case 39: game.move("right"); break;
    case 40: game.move("down");  break;
  }

  resetTiles();
  renderTiles();
  updateScore();

}

//funcion para que el objeto no se active hasta que la web se cargue
window.onload = function () {
  game = new Game2048();
   renderTiles();
};

// produce un evento keydown que ejecuta la funcion moveListeners
document.addEventListener("keydown", moveListeners);
