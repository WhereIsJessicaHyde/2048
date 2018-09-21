//funcion constructora principal del juego: crea el tablero, crea el contenedor de la puntuacion
//crea un idicador de victoria o derrota y comienza generando 2 fichas
function Game2048 () {
  this.board = [
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null]
  ];

  this.score = 0;
  this.won   = false;
  this.lost  = false;


  this._generateTile();
  this._generateTile();

}

//esta funcion indica que el juego a terminado
//Game2048.prototype._gameFinished = function () {
  //return this.won && this.lost;
//};

//funcion prototipo que encuentra las posiciones vacias y devuelve una de forma aleatoria
Game2048.prototype._getAvailablePosition = function() {
  var emptyTiles = [];

  this.board.forEach(function(row, rowIndex){
    row.forEach(function(elem, colIndex){
      if (!elem) emptyTiles.push({ x: rowIndex, y: colIndex });
    });
  });

  if (emptyTiles.length === 0)
    return false;

  var randomPosition = Math.floor(Math.random() * emptyTiles.length);
  return emptyTiles[randomPosition];
};


//funcion prototipo que genera un valor inicial y lo introduce en la celda vacia
//elegida por _getAvailablePosition
Game2048.prototype._generateTile = function () {
  var initialValue = (Math.random() < 0.8) ? 2 : 4;
  var emptyTile = this._getAvailablePosition();

  if (emptyTile) {
    this.board[emptyTile.x][emptyTile.y] = initialValue;
  }
};

//renderiza el tablero y nos permite verlo por consola
Game2048.prototype._renderBoard = function () {
  this.board.forEach(function(row){ console.log(row); });
  console.log('Score: ' + this.score);
};

//creamos el objeto game y lo renderizamos
var game = new Game2048();
game._renderBoard();

//actualiza la puntuacion, e indica que hemos ganado
Game2048.prototype._updateScore = function (value) {
  this.score += value;

  if (value === 8) {
    this.won = true;
  }

};

//devuelve el valor de this.won
Game2048.prototype.win = function () {
  return this.won;
};

//devuelve el valor de this.lost
Game2048.prototype.lose = function () {
  return this.lost;
};

Game2048.prototype._gameFinished = function () {
return this.won && this.lost;

};



Game2048.prototype._isGameLost = function () {
  if (this._getAvailablePosition())
    return;

  var that   = this;
  var isLost = true;

  this.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, cellIndex) {
      var current = that.board[rowIndex][cellIndex];
      var top, bottom, left, right;

      if (that.board[rowIndex][cellIndex - 1]) {
        left  = that.board[rowIndex][cellIndex - 1];
      }
      if (that.board[rowIndex][cellIndex + 1]) {
        right = that.board[rowIndex][cellIndex + 1];
      }
      if (that.board[rowIndex - 1]) {
        top    = that.board[rowIndex - 1][cellIndex];
      }
      if (that.board[rowIndex + 1]) {
        bottom = that.board[rowIndex + 1][cellIndex];
      }

      if (current === top || current === bottom || current === left || current === right)
        isLost = false;
    });
  });

  this.lost = isLost;
};

var game;
