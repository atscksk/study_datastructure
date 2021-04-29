/*
힙(heap)
데이터에서 최대값과 최소값을 빠르게 찾기 위해 고안된 완전 이진 트리
- 완전 이진 트리(complete binary tree): 노드를 삽입할 때 최하단 왼쪽 노드부터 차례대로 삽입하는 트리

힙을 사용하는 이유
배열에 데이터를 넣고, 최대값과 최소값 탐색 시의 시간 복잡도는 O(n)
반면, 힙을 이용하면 O(logn)의 시간 복잡도
우선순위 큐와 같이 최대값 또는 최소값을 빠르게 찾아야 하는 자료구조 및 알고리즘 구현 등에 활용됨

힙의 구조
최대값을 구하기 위한 구조(최대 힙, max heap)와, 최소값을 구하기 위한 구조(최소 힙, min heap)로 분류
다음 두 가지 조건을 가지고 있는 자료구조
- 각 노드의 값은 해당 노드의 자식 노드가 가진 값보다 크거나 같음(최대 힙의 경우)
  - 최소 힙의 경우, 각 노드의 값은 해당 노드의 자식 노드가 가진 값보다 작거나 같음
- 완전 이진 트리 형태를 지님

힙과 이진 탐색 트리의 공통점과 차이점
공통점: 이진트리
차이점
- 힙은 각 노드의 값이 자식 노드부다 크거나 같음(max heap)
- 이진 탐색 트리는 왼쪽 자식 노드의 값이 가장 작고, 그 다음 부모 노드, 그 다음 오른쪽 자식 노드 순
- 이진 탐색 트리의 자식노드에서 작은 값을 왼쪽, 큰 값은 오른쪽이라는 조건이 힙에는 없음
  - 힙의 왼쪽 및 오른쪽 자식 노드의 값은 오른쪽이 클 수도 있고, 왼쪽이 클 수도 있음
- 이진 탐색 트리는 탐색을 위한 구조, 힙은 최대/최소값 검색을 위한 구조

힙 동작
데이터 삽입 - 기본 동작
- 완전 이진 트리이므로, 삽입할 노드는 기본적으로 왼쪽 최하단 노드부터 채워지는 형태로 삽입
데이터 삽입 - 삽입할 데이터가 힙의 데이터보다 클 경우(max heap 예)
- 먼저 삽입된 데이터는 완전 이진 트리 구조에 맞추어, 최하단부 왼쪽 노드부터 채워짐
- 채워진 노드 위치에서, 부모 노드부다 값이 클 경우, 부모 노드와 위치를 바꿔주는 작업을 반복(swap)
데이터 삭제(max heap 예)
- 삭제는 보통 최상단 노드(root node)를 삭제하는 것이 일반적
  - 힙의 용도는 최대값 또는 최소값을 root 노드에 위치시켜, 최대값이나 최소값을 바로 꺼내 쓸 수 있도록 하는 것
- 상단 데이터 삭제시, 가장 최하단부 왼쪽에 위치한 노드(일반적으로 가장 마지막에 추가한 노드)를 root 노드로 이동
- root node 값이 child node 보다 작을 경우, root node의 child node 중 가장 큰 값을 가진 노드와 root node 위치를 바꿔주는 작업을 반복(swap)

힙의 시간복잡도
depth(트리의 높이)가 h라면
n개의 노드를 지닌 heap에 데이터 삽입 또는 삭제시, 최악의 경우 root 노드에서 leaf 노드까지 비교해야 하므로 h = logn에 가까우므로 시간복잡도는 O(logn)

힙 구현
일반적으로 힙 구현시 배열 자료구조를 활용함
배열은 인덱스가 0부터 시작하지만, 힙 구현의 편의를 위해 root 노드 인덱스를 1로 지정
  - 부모 노드 인덱스 번호 = parseInt(자식 노드 인덱스 번호 / 2)
  - 왼쪽 자식 노드 인덱스 번호 = 부모 노드 인덱스 번호 * 2
  - 오른쪽 자식 노드 인덱스 번호 = 부모 노드 인덱스 번호 * 2 + 1
*/

// max 힙 구현

function Heap(data) {
  var heapArray = [];
  heapArray.push('No Data');
  heapArray.push(data);

  /*
    힙 데이터 삽입
    삽입한 노드가 부모 노드의 값보다 클 경우, 부모 노드와 삽입한 노드 위치를 바꿈
    삽입한 노드가 루트 노드가 되거나, 부모 노드보다 값이 작거나 같을 경우까지 반복
    특정 노드의 관련 노드 위치 알아내기
      - 부모 노드 인덱스 번호 = parseInt(자식 노드 인덱스 번호 / 2)
      - 왼쪽 자식 노드 인덱스 번호 = 부모 노드 인덱스 번호 * 2
      - 오른쪽 자식 노드 인덱스 번호 = 부모 노드 인덱스 번호 * 2 + 1
  */
  var insert = function (data) {
    if (heapArray.length === 0) {
      heapArray.push('No Data');
      heapArray.push(data);
      return true
    }
    heapArray.push(data);
    var insertedIdx = heapArray.length - 1;
    while (moveUp(insertedIdx)) {
      var parentIdx = parseInt(insertedIdx / 2);
      var tmp = heapArray[insertedIdx];
      heapArray[insertedIdx] = heapArray[parentIdx];
      heapArray[parentIdx] = tmp;
      insertedIdx = parentIdx;
    }
    return true;
  }

  function moveUp(insertedIdx) {
    if (insertedIdx <= 1)
      return false;

    var parentIdx = parseInt(insertedIdx / 2);
    if (heapArray[insertedIdx] > heapArray[parentIdx])
      return true;
    else
      return false;
  }

  /*
    힙 데이터 삭제
    보통 최상단 노드(root node)를 삭제하는 것이 일반적
    - 힙의 용도: 최대/최소값을 root node에 위치시켜 최대/최소값을 바로 꺼내 쓸 수 있도록 하는 것
    상단 데이터 삭제시, 가장 최하단부 왼쪽에 위치한 노드(일반적으로 가장 마지막에 추가한 노드)를 root node로 이동
    root node 값이 child node보다 작을 경우, root node의 child node 중 가장 큰 값을 가진 노드와 root node 위치를 바꿔주는 작업을 반복
  */
  var pop = function () {
    if (heapArray.length <= 1) {
      return false;
    }
    var returnedData = heapArray[1];
    heapArray[1] = heapArray[heapArray.length - 1];
    heapArray[heapArray.length - 1] = null;
    var poppedIdx = 1;

    while (moveDown(poppedIdx)) {
      var leftChildPoppedIdx = poppedIdx * 2;
      var rightChildPoppedIdx = poppedIdx * 2 + 1;

      if (rightChildPoppedIdx >= heapArray.length) { // 오른쪽 자식 노드만 없을 때
        if (heapArray[poppedIdx] < heapArray[leftChildPoppedIdx]) {
          var tmp = heapArray[poppedIdx];
          heapArray[poppedIdx] = heapArray[leftChildPoppedIdx];
          heapArray[leftChildPoppedIdx] = tmp;
          poppedIdx = leftChildPoppedIdx;
        }
      } else { // 왼쪽, 오른쪽 자식 노드 모두 있을 때
        if (heapArray[leftChildPoppedIdx] > heapArray[rightChildPoppedIdx]) {
          if (heapArray[poppedIdx] < heapArray[leftChildPoppedIdx]) {
            var tmp = heapArray[poppedIdx];
            heapArray[poppedIdx] = heapArray[leftChildPoppedIdx];
            heapArray[leftChildPoppedIdx] = tmp;
            poppedIdx = leftChildPoppedIdx;
          }
        } else {
          if (heapArray[poppedIdx] < heapArray[rightChildPoppedIdx]) {
            var tmp = heapArray[poppedIdx];
            heapArray[poppedIdx] = heapArray[rightChildPoppedIdx];
            heapArray[rightChildPoppedIdx] = tmp;
            poppedIdx = rightChildPoppedIdx;
          }
        }
      }
    }
    return returnedData;
  }

  function moveDown(poppedIdx) {
    var leftChildPoppedIdx = poppedIdx * 2;
    var rightChildPoppedIdx = poppedIdx * 2 + 1;

    if (leftChildPoppedIdx >= heapArray.length) { // case1: 왼쪽 자식 노드도 없을 때
      return false;
    } else if (rightChildPoppedIdx >= heapArray.length) { // case2: 오른쪽 자식 노드만 없을 때
      if (heapArray[poppedIdx] < heapArray[leftChildPoppedIdx])
        return true;
      else
        return false;
    } else { // case3: 왼쪽, 오른쪽 자식 노드 모두 있을 때
      if (heapArray[leftChildPoppedIdx] > heapArray[rightChildPoppedIdx]) {
        if (heapArray[poppedIdx] < heapArray[leftChildPoppedIdx])
          return true;
        else
          return false;
      } else {
        if (heapArray[poppedIdx] < heapArray[rightChildPoppedIdx])
          return true;
        else
          return false;
      }
    }
  }

  return {
    heapArray,
    insert,
    pop
  };
}


var heap = Heap(15);
heap.insert(10)
heap.insert(8)
heap.insert(5)
heap.insert(4)
heap.insert(20)
heap.pop();
console.log(heap.heapArray)
