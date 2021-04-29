/*
연결 리스트

배열과의 차이
배열: 순차적으로 연결된 공간에 데이터를 나열하는 구조
연결 리스트: 떨어진 곳에 존재하는 데이터를 화살표로 연결하여 관리하는 데이터 구조

용어
노드(node): 데이터 저장 단위. 데이터값과 포인터로 구성
포인터(pointer): 각 노드 안에서 다음이나 이전의 노드와의 연결 정보를 갖고 있는 공간

연결 리스트의 장단점
장점
- 데이터 공간을 미리 할당하지 않아도 됨
단점
- 연결을 위한 별도 데이터 공간 필요 -> 저장 효율이 높지 않음
- 연결 정보를 찾는 시간이 필요 -> 접근 속도가 느림
- 중간 데이터 삭제 시, 앞뒤 데이터 연결을 위한 부가적인 작업이 필요
*/


// 연결 리스트 코드 구현: 클래스 방식
// 노드 생성
function Node(number, next = null) {
  var node =  {
    data: number,
    next: next
  }
  return node;
}

// 초기화
var head;
function init(data) {
  head = Node(data);
}

// 노드 추가 함수
function addNode(data) {
  var node = head;
  while(node.next) {
    node = node.next;
  }
  node.next = Node(data);
}

// 링크드리스트 데이터 사이에 새 데이터 추가하기
function insertNewData(data) {
  var node = head;
  var newNode = Node(data);
  var search = true;
  while(search) {
    if(node.data === 1) {
      search = false;
    } else {
      node = node.next;
    }
  }
  var node_next = node.next;
  node.next = newNode;
  newNode.next = node_next;
}

// 특정 노드 삭제하기
function deleteNode(data) {
  if(!head) {
    console.log('해당 값을 가진 노드가 없습니다.');
    return;
  }

  if(head.data === data) {
    var temp = head;
    head = head.next;
    temp = null;
  } else {
    var node = head;
    while(node.next) {
      if(node.next.data === data) {
        var temp = node.next;
        node.next = node.next.next;
        temp = null;
        return;
      } else {
        node = node.next
      }
    }
  }
}

// 특정 노드 찾기
function searchNode(data) {
  var node = head;
  while(node) {
    if(node.data === data) {
      return node;
    } else {
      node = node.next;
    }
  }
}

// 노드 출력
function desc() {
  var node = head;
  while(node) {
    console.log(node.data);
    node = node.next
  }
}

init(0);
// 10개의 노드 생성
for(var i = 1; i < 10; i++) {
  addNode(i);
}
insertNewData(1.5);
deleteNode(5);
var node_searched = searchNode(4);
console.log("특정노드 찾기 테스트: " + node_searched.data);
desc();