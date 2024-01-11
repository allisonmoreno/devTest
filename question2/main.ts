export function findOutlier(integers: number[]): number {
  let evenCount = 0;
  let oddCount = 0;
  let lastEven = 0;
  let lastOdd = 0;

  integers.forEach(num => {
    if(num % 2 === 0){
      evenCount++;
      lastEven = num;
    }else{
      oddCount++;
      lastOdd = num;
    }

    //Terminar el bucle si encontramos mas de un par o impar y al menos uno de cada tipo
    if((evenCount > 1 && oddCount > 0) || (oddCount > 1 && evenCount > 0)){
      return;
    }
  });

  //Devolver el ultimo par si encontramos solo uno, si no, devolver el último impar
  return evenCount === 1 ? lastEven : lastOdd;
}