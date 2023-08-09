const urlParams = new URLSearchParams(window.location.search);
const testId = urlParams.get('q') || 0;

const truthTable = [
  [1, 0, 0, 1, 1, ['1234567890', 'HIDE_THIS', 'PLAINE_TEXT']],
  [0, 1, 0, 1, 0, ['1234567890', 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 1, 0, 1, 1, ['1234567890', 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 0, 1, 1, 1, ['1234567890', 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 1, 1, 1, 1, ['1234567890', 'HIDE_THIS', 'PLAINE_TEXT']],
  [0, 1, 0, 1, 1, ['1234567890', 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 1, 1, 0, 1, ['1234567890', 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 0, 0, 0, 1, ['1234567890', 'HIDE_THIS', 'PLAINE_TEXT']],
  [0, 1, 0, 0, 1, ['1234567890', 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 0, 1, 0, 1, ['1234567890', 'HIDE_THIS', 'PLAINE_TEXT']],
  [0, 1, 0, 0, 0, ['1234567890', 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 1, 0, 0, 1, ['1234567890', 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 0, 0, 0, 0, ['1234567890', 'HIDE_THIS']],
  [0, 1, 1, 1, 1, ['1234567890', 'HIDE_THIS']],
  [0, 1, 1, 1, 0, ['1234567890', 'HIDE_THIS']],
  [1, 0, 1, 1, 0, ['1234567890', 'HIDE_THIS']],
  [0, 0, 1, 0, 0, ['1234567890', 'HIDE_THIS']],
  [0, 0, 1, 0, 1, ['1234567890', 'HIDE_THIS']],
  [0, 1, 1, 0, 0, ['1234567890', 'HIDE_THIS']],
  [1, 0, 1, 0, 0, ['1234567890', 'HIDE_THIS']],
  [0, 0, 1, 1, 0, ['1234567890', 'HIDE_THIS']],
  [1, 1, 0, 0, 0, ['1234567890', 'HIDE_THIS']],
  [1, 1, 1, 1, 0, ['1234567890', 'HIDE_THIS']],
  [0, 0, 1, 1, 1, ['1234567890', 'HIDE_THIS']],
  [0, 0, 0, 0, 0, ['1234567890', 'HIDE_THIS']],
  [1, 0, 0, 1, 0, ['1234567890', 'HIDE_THIS']],
  [1, 1, 0, 1, 0, ['1234567890', 'HIDE_THIS']],
  [0, 0, 0, 1, 0, ['1234567890', 'HIDE_THIS']],
  [0, 0, 0, 0, 1, ['1234567890', 'HIDE_THIS']],
  [0, 1, 1, 0, 1, ['1234567890', 'HIDE_THIS']],
  [0, 0, 0, 1, 1, ['1234567890', 'HIDE_THIS']],
  [1, 1, 1, 0, 0, ['1234567890', 'HIDE_THIS']]
];

const conf = truthTable[testId];

const setConfig = (config) => {
  window['__AURYC_JSLIB_PATH__'] = 'https://cdn.auryc.dev/libs/latest/';
  window._auryc_is_inner_frame_ = true;
  localStorage.setItem('_ar_:record:srOnlyDisableTextCaptureEnabled', !!conf[0]);
  window.heap = { config: { disableTextCapture: !!conf[1] } };
  localStorage.setItem('_ar_:behavior:ignoreHeapTextCapture', !!conf[2]);
  localStorage.setItem('_ar_:record:isRedactTextEnabled', !!conf[3]);
  localStorage.setItem('_ar_:record:disableSRTextCapture', !!conf[4]);
};

setConfig();



/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const OldWorker = Worker;

window.Worker = function (url) {
  const inst = new OldWorker(url);
  const oldListener = inst.postMessage.bind(inst);
  inst.postMessage = function (...args) {
    const { data = {} } = args[0] || {};
    const stringsNotToBeLogged = conf[5] || [];
    stringsNotToBeLogged.forEach((str) => {
      if (data.indexOf(str) > -1) {
        console.error('PII leak -> ', str, '->', data);
      }
    });
    oldListener(...args);
  };
  return inst;
};

async function clearAndReload() {
  localStorage.clear();
  const cookies = await cookieStore.getAll();

  cookies.forEach(async ({ name }) => {
    const ret = await cookieStore.delete({name, domain: '.auryc.dev', path: '/'});
    console.log('deleted', name, ret);
  });

  location.reload();
}


window.addEventListener('load', () => {
  setTimeout(() => {
    const container = document.getElementById('dynami-content');
    container.innerHTML = '';
    container.appendChild(document.getElementById('root').cloneNode(true));
  }, 2000);
});


window.addEventListener('load', () => {
  setTimeout(() => {
    const inputs = [...document.querySelectorAll('input')];
    const timer = setInterval(() => {
      const input = inputs.shift();
      if (!input) {
        clearInterval(timer);
        return;
      }
      const val = input && input.value;
      input.focus();
      input.value = val + '-' + testId;
    }, 300);
  }, 5000);
});
