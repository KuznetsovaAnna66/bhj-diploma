/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  xhr.addEventListener("load", () => {
    options.callback(null, xhr.response); // {success: true, user: Object}
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
      options.url += `${key}=${value}`; // "/account?name=demo&email=demo@demo&id=1"
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
