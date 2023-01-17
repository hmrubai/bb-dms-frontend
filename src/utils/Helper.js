
//Edit User Permission
//All Permission And User Permission Checking
//array == User Permission  ->>permission_id
//obj == All permission ->>id

export function checkObjectInArray(obj, array, id, permission_id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][permission_id] === obj[id]) {
      return true;
    }
  }
  return false;
}
