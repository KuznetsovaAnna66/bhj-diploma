/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  xhr.addEventListener("load", () => {
    options.callback(null, xhr.response);
  });

  xhr.addEventListener("error", () => {
    options.callback(new Error("Ошибка запроса!"), null);
  });

  if (options.method === "GET" && options.data) {
    let flag = true;
    Object.entries(options.data).forEach(([key, value]) => {
      if (flag) {
        options.url += "?";
        flag = false;
      } else {
        options.url += "&";
      }
      options.url += `${key}=${value}`;
    });
    options.data = null;
  }

  try {
    xhr.open(options.method, options.url);
    xhr.send(options.data);
  } catch (err) {
    options.callback(err, null);
  }
};
