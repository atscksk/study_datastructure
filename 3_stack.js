/*
스택
데이터를 제한적으로 접근 가능한 자료구조
가장 나중에 쌓은 데이터를 가장 먼저 빼낼 수 있는 자료 구조: LIFO

스택의 구조
LIFO(Last-In First-Out) 또는 FILO(First-In Last-Out) 방식

활용
컴퓨터 내부 프로세스 구조의 함수 동작 방식

주요 기능
push: 데이터를 스택에 넣기
pop: 데이터를 스택에서 꺼내기

장단잠
장점
1. 구조가 단순, 구현 용이
2. 데이터 저장/조회 속도가 빠름
단점
1. 데이터의 최대 개수를 미리 정해야 함
2. 저장 공간의 낭비 가능성

자바스크립트 스택 관련 함수
push()
pop(): 배열의 맨 마지막 데이터를 출력 후 해당 데이터를 배열에서 삭제
unshift(): 배열의 맨 마지막 데이터를 출력, 해당 데이터를 삭제하지 않음
*/

// 재귀 함수
function recursive(data) {
  if (data < 0) {
    console.log("ended");
  } else {
    console.log(data);
    recursive(data - 1);
    console.log("returned", data);
  }
}
recursive(4);

// 예제: 스택 구현
var stack_list = [];
function push(data) {
  stack_list.push(data);
}
function pop() {
  var lastIndex = stack_list.length - 1
  var data = stack_list[lastIndex];
  stack_list.splice(lastIndex, 1);
  return data;
}

for (var i = 0; i < 10; i++) {
  push(i);
}

console.log(stack_list);
console.log(pop());
console.log(pop());
console.log(pop());