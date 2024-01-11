export class Connect4{
  private grid: number[][];
  private currentPlayer: number;
  private gameFinished: boolean;

  constructor(){
    this.grid = [
        [0, 0, 0, 0, 0, 0, 0], //Fila 0
        [0, 0, 0, 0, 0, 0, 0], //Fila 1
        [0, 0, 0, 0, 0, 0, 0], //Fila 2
        [0, 0, 0, 0, 0, 0, 0], //Fila 3
        [0, 0, 0, 0, 0, 0, 0], //Fila 4
        [0, 0, 0, 0, 0, 0, 0]  //Fila 5
    ];
    this.currentPlayer = 1;
    this.gameFinished = false;
  }

  play(column: number): string{
    if(this.gameFinished){
      return "Game has finished!";
    }

    const row = this.findAvailableRow(column);

    if(row === -1){
      return "Column full!";
    }

    this.grid[row][column] = this.currentPlayer;

    if(this.checkWin(row, column)){
      this.gameFinished = true;
      return `Player ${this.currentPlayer} wins!`;
    }

    if(this.checkFull()){
      this.gameFinished = true;
      return "Game has finished!";
    }

    const currentPlayerMessage = `Player ${this.currentPlayer} has a turn`;
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;

    return currentPlayerMessage;
  }

  private findAvailableRow(column: number): number{
    for(let row = 5; row >= 0; row--){
      if(this.grid[row][column] === 0){
        return row;
      }
    }
    return -1; //Columa llena
  }

  private checkWin(row: number, column: number): boolean{
    const player = this.grid[row][column];

    //Revisar horizontal
    if(this.checkDirection(row, column, 0, 1) + this.checkDirection(row, column, 0, -1) >= 3 ||
        //Revisar vertical
        this.checkDirection(row, column, 1, 0) + this.checkDirection(row, column, -1, 0) >= 3 ||
        //Revisar diagonal(esi a eid)
        this.checkDirection(row, column, 1, 1) + this.checkDirection(row, column, -1, -1) >= 3 ||
        //Revisar diagonal(esd a eii)
        this.checkDirection(row, column, 1, -1) + this.checkDirection(row, column, -1, 1) >= 3){
      return true;
    }

    return false;
  }

  private checkDirection(row: number, column: number, rowDelta: number, colDelta: number): number{
    const player = this.grid[row][column];
    let count = 0;

    for(let i = -3; i <= 3; i++){
        const newRow = row + i * rowDelta;
        const newCol = column + i * colDelta;

        if(
            newRow >= 0 &&
            newRow < 6 &&
            newCol >= 0 &&
            newCol < 7 &&
            this.grid[newRow][newCol] === player
        ){
            count++;
        }else{
            break;
        }
    }
    return count;
}

  private checkFull(): boolean{
    for(let col = 0; col < 7; col++){
      if(this.grid[0][col] === 0){
        return false;
      }
    }
    return true; //Tablero lleno
  }
}