// export default {
//
//
//
//
// }

export function cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
}

export function findRowIndex(dataList, newData, keyName) {
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i][keyName] === newData[keyName]) {
      return i;
    }
  }
  return -1;
}

export function findCodeName(dataList, codeName, codeValue, dataName) {
  let result = null;
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i][codeName] === codeValue) {
      result = dataList[i][dataName];
      break;
    }
  }
  return result;
}

export function replaceArrayRow(dataList, newData, keyName) {
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i][keyName] === newData[keyName]) {
      dataList[i] = newData;
      break;
    }
  }
  return dataList;
}

export function hasClass(elem, cls) {
  if ('classList' in elem && typeof elem.classList.contains === 'function') {
    return elem.classList.contains(cls);
  }
  const classes = elem.className.split(/\s+/);
  for (let i = 0; i < classes.length; i++) {
    if (classes[i] === cls) {
      return true;
    }
  }
  return false;
}

export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  return function (element, event, handler) {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler);
    }
  };
}());

export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  return function (element, event, handler) {
    if (element && event) {
      element.detachEvent(`on${event}`, handler);
    }
  };
}());

