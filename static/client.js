'use strict';

const buildAPI = (methods) => {
  const api = {};
  for (const method of methods) {
    api[method] = (...args) =>
      new Promise((resolve, reject) => {
        const url = `/api/${method}`;
        console.log(url, args);
        fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(args),
        }).then((res) => {
          const { status } = res;
          if (status !== 200) {
            reject(new Error(`Status Code: ${status}`));
            return;
          }
          resolve(res.json());
        });
      });
  }
  return api;
};

const api = buildAPI(['render', 'find']);

const show = async (el) => {
  const label = await api.render(el);
  const output = document.getElementById('output');
  output.innerHTML = label;
};
show();
