/*
충돌(collision) 해결 알고리즘
충돌: 해쉬 테이블의 문제점. 충돌 또는 해취 충돌이라고 함
*/

/*
해결1: chaining 기법
개방 해슁(open hashing) 기법 중 하나 - 해쉬 테이블 저장공간 외의 공간을 활용하는 기법
충돌이 일어나면 연결 리스트 자료구조를 사용하여 데이터를 추가로 뒤에 연결시켜서 저장함
*/


var hashTable = Array(10).fill(0);

// 해시 변환 함수: javascript는 기본 제공 함수가 없음
function hash(data) {
  var hash = 0;
  if (data.length == 0) {
    return hash;
  }
  for (var i = 0; i < data.length; i++) {
    var char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function hashFunction(key) {
  return key % 8;
}

function getKey(data) {
  if(typeof data === 'Number') return data;
  return hash(data);
}

// 데이터 저장
function saveData(data, value) {
  var indexKey = getKey(data);
  var hashAddres = hashFunction(indexKey);

  // 키를 통해 얻은 주소에 이미 값이 존재한다면, 해당 주소값에 있는 링크드 리스트에 링크드 리스트 값을 추가하고,
  // 존재하지 않는다면 해당 주소에 새로운 리스트를 할당함
  if (hashTable[hashAddres] !== 0) {
    for (var i = 0; i < hashTable[hashAddres].length; i++) {
      if (hashTable[hashAddres][i][0] === indexKey) {
        hashTable[hashAddres][i][1] = value;
        return;
      }
    }
    hashTable[hashAddres].push([indexKey, value]);
  } else {
    hashTable[hashAddres] = [[indexKey, value]];
  }
}

// 데이터 조회
function readData(data) {
  var indexKey = getKey(data);
  hashAddres = hashFunction(indexKey);
  
  // 해당 키에 대한 주소에 값이 존재한다면, 그 주소에 존재하는 리스트를 순회하여 데이터 존재 유무를 판단
  if (hashTable[hashAddres] !== 0) {
    for (var i = 0; i < hashTable[hashAddres].length; i++) {
      if (hashTable[hashAddres][i][0] === indexKey) {
        return hashTable[hashAddres][i][1];
      }
    }
    return false;
  } else {
    return false;
  }
}

saveData('Dd', '1201023010');
saveData('Dave', '3301023010');
saveData('aa', '3301023010');
saveData('aaa', '3301023010');

var res = readData('Dd');
console.log(hashTable);
console.log('Dd: ', res);