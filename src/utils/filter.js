export let formatDate = (time, fmt) => {
  // author: meizz
  let date = new Date(time);
  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
};

export function fmoney(s, n = 2) {
  if (s === "" || s === undefined || s === null) return;
  n = n >= 0 && n <= 20 ? n : 2;
  let tag = "";
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  if (s.indexOf("-") == 0) {
    s = s.slice(1);
    tag = "-";
  }
  var l = s
      .split(".")[0]
      .split("")
      .reverse(),
    r = s.split(".")[1],
    t = "",
    i = 0;
  for (i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
  }
  return (
    tag +
    t
      .split("")
      .reverse()
      .join("") + (n == 0 ? '': "." +
      r)
  );
}

export function sort(arr, name, type) {
  return arr.sort(function(a, b) {
    if (a[name] == b[name]) return 0;
    if (type === "asc") {
      return b[name] - a[name] > 0 ? -1 : 1;
    } else {
      return a[name] - b[name] > 0 ? -1 : 1;
    }
  });
}

export const createProxy = data => {
  if (typeof data === "object" && data.toString() === "[object Object]") {
    for (let k in data) {
      if (typeof data[k] === "object") {
        defineObjectReactive(data, k, data[k]);
      } else {
        defineBasicReactive(data, k, data[k]);
      }
    }
  }

};

function defineObjectReactive(obj, key, value) {
  // 递归
  createProxy(value);
  obj[key] = new Proxy(value, {
    set(target, property, val, receiver) {
      if (property !== "length") {
        // console.log("Set %s to %o", property, val);
      }
      return Reflect.set(target, property, val, receiver);
    }
  });
}

function defineBasicReactive(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    get() {
      return value;
    },
    set(newValue) {
      if (value === newValue) return;
      // console.log(`发现 ${key} 属性 ${value} -> ${newValue}`);
      value = newValue;
    }
  });
}
