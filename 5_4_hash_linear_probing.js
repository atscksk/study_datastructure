/*
Linear Probing
폐쇄 해싱 또는 Close Hashing 기법 - 해쉬 테이블 저장공간 안에서 충돌 문제를 해결하는 기법
저장 공간 활용도를 높일 수 있음
*/

var hashTable = Array(10).fill(0);

function hash(data) {
  return data[0].charCodeAt();
}

function hashFunction(key) {
  return key % 8;
}

function getKey(data) {
  return hash(data);
}

// 데이터 저장
function saveData(data, value) {
  var indexKey = getKey(data);
  var hashAddres = hashFunction(indexKey);
  // 키를 통해 얻은 주소에 해당하는 위치에 값이 존재하는 경우
  // 해쉬 테이블 배열의 주소값 인덱스부터 해쉬 테이블 끝까지 검색하여 빈 자리를 탐색, 그 자리에 데이터를 저장 
  if (hashTable[hashAddres] !== 0) {
    for (var i = hashAddres; i < hashTable.length; i++) {
      if (hashTable[i] === 0) {
        hashTable[i] = [indexKey, value];
        return;
      } else if (hashTable[i][0] === indexKey) {
        hashTable[i][1] = value;
        return
      }
    }
  } else {
    hashTable[hashAddres] = [indexKey, value];
  }
}

// 데이터 조회
function readData(data) {
  var indexKey = getKey(data);
  var hashAddres = hashFunction(indexKey);

  if (hashTable[hashAddres] !== 0) {
    for (var i = hashAddres; i < hashTable.length; i++) {
      if (hashTable[i] === 0) {
        return false;
      } else if (hashTable[i][0] === indexKey) {
        return hashTable[i][1];
      }
    }
  } else {
    return false;
  }
}

saveData('Dave', '0102030200');
saveData('Andy', '01033232200');
saveData('aaa', '01033232200');
saveData('bbb', '01033232200');
saveData('ccc', '01033232200');
saveData('ddd', '01033232200');

var res = readData('Dava');
console.log('Dava: ', res);
console.log(hashTable)
