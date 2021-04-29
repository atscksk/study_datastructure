/*
이중 연결 리스트
양방향으로 연결되어 있기 때문에 노드 탐색이 양쪽으로 모두 가능
*/

function Node(data, prev = null, next = null) {
  var node = {
    prev: prev,
    data: data,
    next: next
  };
  return node;
}

var head, tail;
function init(data) {
  head = Node(data);
  tail = head;
}

function insert(data) {
  if (!head) {
    head = Node(data);
    tail = head;
  } else {
    var node = head;
    while (node.next) {
      node = node.next;
    }
    var newNode = Node(data);
    node.next = newNode;
    newNode.prev = node;
    tail = newNode;
  }
}

// 찾기: head부터 탐색
function searchFromHead(data) {
  if (!head) {
    return "탐색 실패";
  }
  var node = head;
  while (node) {
    if (node.data === data) {
      return node;
    } else {
      node = node.next
    }
  }
  return "탐색 실패";
}

// 찾기: tail부터 탐색
function searchFromTail(data) {
  if (!head) {
    return "탐색 실패";
  }
  var node = tail;
  while (node) {
    if (node.data === data) {
      return node;
    } else {
      node = node.prev;
    }
  }
  return "탐색 실패";
}

// 특정 데이터 노드 앞에 새 데이터 추가하기
function insertBefore(data, beforeData) {
  if (!head) {
    head = Node(data);
  } else {
    var node = tail;
    while (node.data !== beforeData) {
      node = node.prev;
      if (!node) return false;
    }
    var newData = Node(data);
    var beforeNew = node.prev;
    beforeNew.next = newData;
    newData.prev = beforeNew;
    newData.next = node;
    node.prev = newData;
  }
}

// 특정 데이터 노드 뒤에 새 데이터 추가하기
function insertAfter(data, afterData) {
  if (!head) {
    head = Node(data);
  } else {
    var node = head;
    while (node.data !== afterData) {
      node = node.next;
      if (!node) return false;
    }
    var newData = Node(data);
    var afterNew = node.next;
    newData.next = afterNew;
    newData.prev = node;
    node.next = newData;
    if (!newData.next) {
      tail = newData;
    }
  }
}

function desc() {
  var node = head;
  while (node) {
    console.log(node.data);
    node = node.next;
  }
}

init(0);
for (var i = 1; i < 10; i++) {
  insert(i);
}
desc();