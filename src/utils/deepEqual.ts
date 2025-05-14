/* eslint-disable @typescript-eslint/no-explicit-any */
// Date, Map, Set 등의 값은 비교 x 직렬화 가능한 데이터 기반
// JSON-like 구조

export const deepEqual = (
  target1: Record<string, any> | Array<any>,
  target2: Record<string, any> | Array<any>,
  seen = new WeakMap(), //불필요하게 참조하는 객체가 메모리에 남지 않도록 weak map으로 비교
) => {
  // 0. 만약 두 요소가 배열일 경우 배열의 각 요소에 대해서 재귀적으로 확인
  if (Array.isArray(target1) && Array.isArray(target2)) {
    return handleArrayComprison(target1, target2, seen);
  }

  // 1. 그 외의 경우는 객체에 대한 비교
  return handleObjectComparison(target1, target2, seen);
};

/**
 * @helpers
 */

function handleArrayComprison(
  target1: Array<any>,
  target2: Array<any>,
  seen: WeakMap<WeakKey, any>,
): boolean {
  if (target1.length !== target2.length) return false;

  for (let i = 0; i < target1.length; i++) {
    if (!deepEqual(target1[i], target2[i], seen)) {
      return false;
    }
  }

  return true;
}

function handleObjectComparison(
  target1: Record<string, any>,
  target2: Record<string, any>,
  seen: WeakMap<WeakKey, any>,
) {
  if (target1 === null || target2 === null) {
    return target1 === target2;
  }

  //1. 두 값이 원시값일 경우, 서로 같은지 동등비교 결과 리턴
  if (typeof target1 !== 'object' || typeof target2 !== 'object') {
    return target1 === target2;
  }

  //2. record end = 이미 체크를 해봤던 값일 경우, 기록값에 대한 평가 결과를 리턴
  if (seen.has(target1) && seen.get(target1) === target2) {
    return true;
  }

  //3. loop start = 이미 체크했던 값이라고 기록하고 시작
  if (typeof target1 === 'object' && target1 !== null) seen.set(target1, target2);

  const keys1 = Object.keys(target1);
  const keys2 = Object.keys(target2);

  //4. 서로의 길이가 같지 않으면 eqaul하지 x
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(target1[key], target2[key], seen)) {
      return false;
    }
  }

  return true;
}
