/*
큐
가장 먼저 입력된 데이터가 가장 먼저 출력되는 구조
FIFO(First-In First-Out) 또는 LILO(Last-In List-Out) 방식

큐의 활용
멀티 태스킹을 위한 프로세스 스케쥴링 방식을 구현하기 위해 많이 사용됨

주요 용어
Enqueue: 큐에 데이터를 입력함
Dequeue: 큐에서 데이터를 출력함

자바스크립트에서 Queue 구현 시 활용할 수 있는 함수
push(): 배열에 데이터를 추가
shift(): 배열 맨 앞 데이터를 출력(출력된 데이터는 배열에서 제거됨)
*/

// 문제: 배열을 활용한 큐 구현

var queue_array = [];

function enqueue(data) {
  queue_array.push(data);
}

function dequeue() {
  var data = queue_array[0];
  queue_array.splice(0, 1);
  return data;
}

for (var i = 0; i < 10; i++) {
  enqueue(i);
}
console.log(queue_array);
console.log(dequeue());
console.log(dequeue());
console.log(dequeue());

// 응용: 자바스크립트 함수를 활용하여 동일한 문제 해결
var queue_array2 = [];

for (var i = 0; i < 10; i++) {
  queue_array2.push(i);
}
console.log(queue_array2);
console.log(queue_array2.shift());
console.log(queue_array2.shift());
console.log(queue_array2.shift());