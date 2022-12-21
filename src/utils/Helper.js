export function checkObjectInArray(obj, array, id,permission_id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][permission_id] === obj[id]) {
      return true;
    }
  }
  return false;
}
