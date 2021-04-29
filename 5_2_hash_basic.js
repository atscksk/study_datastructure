// 해쉬 테이블 초기화: 10칸 짜리 배열을 선언하고 0으로 채움
var hashTable = Array(10).fill(0);

// 문자열 데이터의 첫 번째 글자의 ascii 코드를 반환
function hash(data) {
  return data[0].charCodeAt();
}

// 해쉬 함수: 키로 받은 값을 8로 나눈 나머지 값으로 변환
// 즉, 문자열 데이터 첫 번째 글자 ascii 코드를 8로 나눈 값이 해당 데이터에 대한 주소(키)값이 된다.
function hashFunction(key) {
  return key % 8;
}

// 키 생성
function getKey(data) {
  return hash(data);
}

// 데이터 저장
// 키값을 받아 해당 키로 데이터가 저장된 주소값을 얻고, 해쉬 테이블 배열에 그 주소를 인덱스로 하는 위치에 데이터를 할당한다.
function saveData(data, value) {
  var hashAddres = hashFunction(getKey(data));
  hashTable[hashAddres] = value;
}

// 데이터 조회
// 저장과 동일한 과정으로 주소에 접근한 후, 해당 주소에 저장된 값을 리턴한다.
function readData(data) {
  var hashAddres = hashFunction(getKey(data));
  return hashTable[hashAddres];
}

saveData('Dave', '0102030200');
saveData('Andy', '01033232200');

var res = readData('Dava');
console.log('Dava: ', res);
