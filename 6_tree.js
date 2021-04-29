/*
트리(tree)
node와 branch를 이용하여, 사이클을 이루지 않도록 구성한 데이터 구조
탐색(검색) 알고리즘 구현을 위해 이진 트리(binary tree) 형태로 주로 사용됨

용어
node: 트리에서 데이터를 저장하는 기본 요소. 데이터와 연결된 다른 노드에 대한 branch 정보를 포함
root node: 트리 맨 위에 있는 노드
level: 최상위 노드를 level 0으로 하였을 때, 하위 branch로 연결된 노드의 깊이를 나타냄
parent node: 어떤 노드의 상위 레벨에 연결된 노드
child node: 어떤 노드의 다음 레벨에 연결된 노드
leaf node(terminal node): child node를 가지고 있지 않은 노드
sibling(brother node): 동일한 parent node를 가진 노드
depth: 트리에서 node가 가질 수 있는 최대 level

이진 트리, 이진 탐색 트리
이진 트리: 노드의 최대 branch가 2개인 트리
이진 탐색 트리(binary search tree): 이진 트리에 추가적인 조건이 있는 트리
  - 왼쪽 하위 노드는 해당 노드보다 작은 값, 오른쪽 하위 노드는 해당 노드보다 큰 값을 갖고 있음


시간복잡도
depth(트리의 높이)를 h라고 표기할 때, O(h)
n개의 노드를 가진다면 h = logn에 가까우므로, 시간 복잡도는 O(logn)
(참고: 빅오 표기법에서 logn에서의 log 밑은 10이 아니라 2 -> 한 번 실행시마다 50%의 실행 가능 영역이 제거됨을 의미)

이진 탐색 트리의 장점 및 용도
주요 용도: 데이터 검색(탐색)
장점: 탐색 속도 개선이 가능
단점: 평균 시간 복잡도는 O(logn)이지만 이것은 트리가 균형 잡혀 있을 때의 평균 시간복잡도
  - 최악의 경우 링크드 리스트와 동일한 성능을 보임(O(n))
*/

// 예제: 연결리스트로 이진 트리 구현
function Node(value) {
  return {
    value: value,
    left: null,
    right: null
  }
}

function NodeMgmt(head) {
  var head = head;

  function insert(value) {
    var currentNode = head;
    while (true) {
      // 추가할 값이 현재 노드(기준 노드)의 값보다 작은 경우
      if (value < currentNode.value) {
        // 현재 노드의 왼쪽 자식 노드가 있다면 기준을 현재 노드의 왼쪽 자식노드로 바꿈
        // 없다면 현재 노드의 왼쪽 자식 노드 위치에 값을 추가
        if (currentNode.left) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = Node(value);
          break;
        }
        // 추가할 값이 현재 노드(기준 노드)의 값보다 큰 경우는 위의 과정을 오른쪽에서 동일하게 수행
      } else {
        if (currentNode.right) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = Node(value);
          break;
        }
      }
    }
  };

  function search(value) {
    var currentNode = head;
    while (currentNode) {
      // 현재 노드(비교 대상)의 값이 찾고자 하는 값과 같다면 true 반환
      // 값이 작다면 기준을 왼쪽 자식 노드로 변경하고, 크거나 같다면 오른쪽 자식 노드로 변경
      // 모든 경우에 해당하지 않는다면 false 반환
      if (currentNode.value === value) {
        return true;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  /*
  이진 탐색 트리 삭제
  1. leaf node 삭제: 삭제할 node의 parent node가 삭제할 node를 가리키지 않도록 함
  2. child node가 하나인 node 삭제: 삭제할 node의 parent node가 삭제할 node의 child node를 가리키도록 함
  3. child node가 두 개인 node 삭제
    - 삭제할 node의 오른쪽 자식 중, 가장 작은 값을 삭제할 node의 parent node가 가리키도록 함
      - 삭제할 node의 오른쪽 자식 선택
      - 오른쪽 자식의 가장 왼쪽에 있는 node를 선택
      - 해당 node의 왼쪽 branch가 삭제할 node의 왼쪽 child node를 가리키게 함
      - 해당 node의 오른쪽 branch가 삭제할 node의 오른쪽 child node를 가리키게 함
      - 만약 해당 node가 오른쪽 child node를 가지고 있었을 경우,
        해당 node의 본래 parent node의 왼쪽 branch가 해당 오른쪽 child node를 가리키게 함
    - 삭제할 node의 왼쪽 자식 중, 가장 큰 값을 삭제할 node의 parent node가 가리키도록 함
  */
  function remove(value) {
    var searched = false;
    var currentNode = head;
    var parent = head;
    while (currentNode) {
      if (currentNode.value === value) {
        searched = true;
        break;
      } else if (value < currentNode.value) {
        parent = currentNode;
        currentNode = currentNode.left;
      } else {
        parent = currentNode;
        currentNode = currentNode.right;
      }
    }

    // 삭제할 node가 없는 경우
    if (!searched) {
      return false;
    }

    // case1: 삭제할 node가 leaf node인 경우
    // currentNode: 삭제할 노드 parent: 삭제할 노드의 부모노드
    if (!currentNode.left && !currentNode.right) {
      if (value < parent.value) {
        parent.left = null;
      } else {
        parent.right = null;
      }
      delete currentNode;
    }

    // case2: 삭제할 node가 child node를 한 개 가지고 있을 경우
    if (currentNode.left && !currentNode.right) {
      if (value < parent.value) {
        parent.left = currentNode.left;
      } else {
        parent.right = currentNode.left;
      }
    } else if (!currentNode.left && currentNode.right) {
      if (value < parent.value) {
        parent.left = currentNode.right;
      } else {
        parent.right = currentNode.right;
      }
    }

    // case3-1: 삭제할 node가 child node를 두 개 가지고 있을 경우(삭제할 node가 parent node 왼쪽에 있을 때)
    /*
      기본 전략
      1. 삭제할 node의 오른쪽 자식 중, 가장 작은 값을 삭제할 node의 parent node가 가리키도록 함
      2. 삭제할 node의 왼쪽 자식 중, 가장 큰 값을 삭제할 node의 parent node가 가리키도록 함
      => 1번 사용

      case3-1-1: 삭제할 node가 parent node 왼쪽에 있고,
                 삭제할 node의 오른쪽 자식 중, 가장 작은 값을 가진 node의 child node가 없을 때
      case3-1-2: 삭제할 node가 parent node 왼쪽에 있고,
                 삭제할 node의 오른쪽 자식 중, 가장 작은 값을 가진 node의 오른쪽에 child node가 있을 때
      * 가장 작은 값을 가진 node의 child node가 왼쪽에 있을 경우는 없음
        - 왼쪽 node가 있다는 것은 해당 node보다 더 작은 값을 가진 node가 있다는 의미이기 때문
    */
    // case3-2: 삭제할 node가 child node를 두 개 가지고 있을 경우(삭제할 node가 parent node 오른쪽에 있을 때)
    /*
      기본 전략
      1. 삭제할 node의 오른쪽 자식 중, 가장 작은 값을 삭제할 node의 parent node가 가리키도록 함
      2. 삭제할 node의 왼쪽 자식 중, 가장 큰 값을 삭제할 node의 parent node가 가리키도록 함
      => 1번 사용

      case3-2-1: 삭제할 node가 parent node의 오른쪽에 있고,
                 삭제할 node의 오른쪽 자식 중, 가장 작은 값을 가진 node의 child node가 없을 때
      case3-2-2: 삭제할 node가 parent node의 오른쪽에 있고,
                 삭제할 node의 오른쪽 자식 중, 가장 작은 값을 가진 node의 오른쪽에 child node가 있을 때
      * 가장 작은 값을 가진 node의 child node가 왼쪽에 있을 경우는 없음
        - 왼쪽 node가 있다는 것은 해당 node보다 더 작은 값을 가진 node가 있다는 의미이기 때문

    */
    if (currentNode.left && currentNode.right) { // case 3
      if (value < parent.value) { // case 3-1
        var changeNode = currentNode.right;
        var changeNodeParent = currentNode.right;
        while (changeNode.left) {
          changeNodeParent = changeNode;
          changeNode = changeNode.left;
        }
        if (changeNode.right) {
          changeNodeParent.left = changeNode.right;
        } else {
          changeNodeParent.left = null;
        }
        parent.left = changeNode;
        changeNode.right = currentNode.right;
        changeNode.left = changeNode.left;
      } else { // case3-2
        var changeNode = currentNode.right;
        var changeNodeParent = currentNode.right;
        while (changeNode.left) {
          changeNodeParent = changeNodeParent;
          changeNode = changeNode.left;
        }
        if (changeNode.right) {
          changeNodeParent.left = changeNode.right;
        } else {
          changeNodeParent.left = null;
        }
        parent.right = changeNode;
        changeNode.left = currentNode.left;
        changeNode.right - currentNode.right;
      }
    }
  }

  return {
    insert: insert,
    search: search,
    remove: remove,
  }
}

// 작동 테스트
// 0 ~ 999 중, 100 개의 숫자 랜덤 선택
var bstNums = [];
while (bstNums.length <= 100) {
  bstNums.push(Math.floor(Math.random() * 1000));
}

// 선택된 100개의 숫자를 이진 탐색 트리에 입력, 임의로 루트노드에는 500을 삽입
var head = Node(500);
var binaryTree = NodeMgmt(head);
for (var i = 0; i < bstNums.length; i++) {
  binaryTree.insert(bstNums[i]);
}

// 입력한 100개의 숫자 검색 (검색 기능 확인)
for (var i = 0; i < bstNums.length; i++) {
  if (!binaryTree.search(bstNums[i])) {
    console.log('search failed ', bstNums[i]);
  }
}

// 입력한 100개의 숫자 중 10개의 숫자를 랜덤 선택
var deleteNums = [];
while (deleteNums.lenfth <= 10) {
  deleteNums.push(bstNums[Math.floor(Math.random() * 100)]);
}

// 선택한 10개의 숫자를 삭제 (삭제 기능 확인)
for (var i = 0; i < deleteNums.lenfth; i++) {
  if (!binaryTree.remove(deleteNums[i])) {
    console.log('delete failed ', deleteNums[i]);
  }
}

// var head = Node(1)
// var BST = NodeMgmt(head);
// BST.insert(2);
// BST.insert(3);
// BST.insert(0);
// BST.insert(4);
// BST.insert(8);
// var res = BST.search(3);
// console.log(res)
