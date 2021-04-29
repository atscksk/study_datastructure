/*
해쉬
Hash Table: 키(key)에 데이터(value)를 저장하는 구조
보통 배열로 미리 hash table 사이즈만큼 생성 후 사용

용어
해쉬(hash): 임의 값을 고정 길이의 값으로 변환하는 것
해쉬 테이블(hash table): 키 값의 연산에 의해 직접 접근이 가능한 데이터 구조
해싱 함수(hashing function): 키에 대해 산술 연산을 이용해 데이터 위치를 찾을 수 있는 함수
해쉬 값(hash value) / 해쉬 주소(hash address): 키를 해싱 함수로 연산해서 해쉬 값을 알아내고, 이를 기반으로 해쉬 테이블에서 해당 키에 대한 데이터 위치를 일관성 있게 찾을 수 있음
슬롯(slot): 한 개의 데이터를 저장할 수 있는 공간
저장할 데이터에 대해 키를 추출할 수 있는 별도 함수도 존재할 수 있음

장단점
장점
  - 데이터 저장 / 읽기 속도가 빠름(검색 속도가 빠름)
  - 키에 대한 데이터가 있는지 확인이 쉬움(중복 검사가 용이)
단점
  - 일반적으로 저장 공간이 더 많이 필요
  - 여러 키에 해당하는 주소가 동일할 경우 충돌을 해결하기 위한 별도 자료구조가 필요

주요 용도
검색이 많이 필요한 경우
저장, 삭제, 읽기가 빈번한 경우
캐쉬 구현 시 - 중복 확인이 쉽기 때문

시간 복잡도
- 일반적인 경우(collision이 없는 경우): O(1)
- 최악의 경오(collision이 모두 발생하는 경우): O(n)
- 해쉬 테이블의 경우 일반적인 케이스를 기대하고 만들기 때문에, 시간 복잡도는 O(1)이라고 할 수 있음
- 검색에서 해쉬테이블 사용 예시
  - 16개 배열에 데이터를 저장하고 검색할 때: O(n)
  - 16개의 데이터 저장 공간을 가진 위의 해쉬 테이블에 데이터를 저장하고 검색할 때: O(1)
*/


// 예시: 간단한 해쉬 테이블 구현
// 1. 해쉬 테이블 생성
var hashTable = [];
for(var i = 0; i < 10; i++) {
  hashTable.push(0);
}

// 2. 해쉬 함수: division 방식 - 가장 간단한 방식(나누기를 통한 나머지 값을 사용하는 기법)
function hashFunc(key) {
  return key % 5;
}

// 3. 해쉬 테이블에 저장 - 데이터에 따라 필요시 키 생성 방법 정의가 필요
function storageData(data, value) {
  var key = data[0].charCodeAt();
  var hashAddress = hashFunc(key);
  hashTable[hashAddress] = value;
}

// 4. 해쉬 테이블에서 특정 주소의 데이터를 가져오기
function getData(data) {
  var key = data[0].charCodeAt();
  var hashAddress = hashFunc(key);
  return hashTable[hashAddress];
}

// 5. 적용: 실제 데이터를 저장하고 읽어보기
storageData('Andy', '01055553333');
storageData('Dave', '01044443333');
storageData('Trump', '01022223333');
console.log(getData('Andy'));