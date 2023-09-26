const urlParams = new URLSearchParams(window.location.search);
const testId = urlParams.get('q') || 0;

const PAYMENT_RELATED = ['1234567890', '123456789012345678', '__CC', '__CCNUM'];
const DO_NOT_TRACK = ['DO_NOT_TRACK'];
const INLINE_DIRECTIVES = ['DATA-HEAP-REDACT-TEXT','DATA-HEAP-IGNORE','DATA-HEAP-REDACT-ATTRIBUTES'];


const truthTable = [
  [1, 0, 0, 1, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS', 'PLAINE_TEXT']],
  [0, 1, 0, 1, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 1, 0, 1, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 0, 1, 1, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 1, 1, 1, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS', 'PLAINE_TEXT']],
  [0, 1, 0, 1, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 1, 1, 0, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 0, 0, 0, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS', 'PLAINE_TEXT']],
  [0, 1, 0, 0, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 0, 1, 0, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS', 'PLAINE_TEXT']],
  [0, 1, 0, 0, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 1, 0, 0, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS', 'PLAINE_TEXT']],
  [1, 0, 0, 0, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [0, 1, 1, 1, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [0, 1, 1, 1, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [1, 0, 1, 1, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [0, 0, 1, 0, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [0, 0, 1, 0, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [0, 1, 1, 0, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [1, 0, 1, 0, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [0, 0, 1, 1, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [1, 1, 0, 0, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [1, 1, 1, 1, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [0, 0, 1, 1, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [0, 0, 0, 0, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [1, 0, 0, 1, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [1, 1, 0, 1, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [0, 0, 0, 1, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [0, 0, 0, 0, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [0, 1, 1, 0, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [0, 0, 0, 1, 1, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']],
  [1, 1, 1, 0, 0, [...PAYMENT_RELATED,...DO_NOT_TRACK,...INLINE_DIRECTIVES, 'HIDE_THIS']]
];



const conf = truthTable[testId];

const setConfig = (config) => {
  window._auryc_is_inner_frame_ = true;
  window['__AURYC_JSLIB_PATH__'] = 'https://cdn.auryc.dev/libs/latest/';
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
        const li = document.createElement('li');
        li.textContent = `PII leak -> ${str}}`;
        document.getElementById('pii-leaks').appendChild(li);
      }
    });
    oldListener(...args);
  };
  return inst;
};

async function clearAndReload(shoudlReload = true) {
  localStorage.clear();
  const allCookies = await cookieStore.getAll();
  console.log('>>> all', allCookies);

  allCookies.forEach(async ({ name }) => {
    const v = await cookieStore.delete(name);
    console.log('>>> v', v, name);

    try {
      await cookieStore.set({ name, value: 's', "sameSite": "none", "domain": "pages.github.io", "expires": 1 });
    } catch (e) {
      console.error(e);
    }
  });

  if (shoudlReload) {
    location.reload();
  }
}


window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('test-case-id').value = testId;
    const container = document.getElementById('dynami-content');
    container.innerHTML = '';
    container.appendChild(document.getElementById('root').cloneNode(true));
  }, 2000);
});


// window.addEventListener('load', () => {
//   setTimeout(() => {
//     const inputs = [...document.querySelectorAll('#root input')];
//     const timer = setInterval(() => {
//       const input = inputs.shift();
//       if (!input) {
//         clearInterval(timer);
//         return;
//       }
//       const val = input && input.value;
//       input.focus();
//       input.value = val + '-' + testId;
//     }, 300);
//   }, 5000);
// });


const loadPrev = async () => {
  let tid = parseInt(document.getElementById('test-case-id').value) - 1;
  if (tid < 0) {
    tid = 0;
  }
  await clearAndReload(false);
  location.href = location.href.split('?')[0] + `?q=${tid}`;
};

const loadNext = async () => {
  let tid = parseInt(document.getElementById('test-case-id').value) + 1;
  if (tid > 31) {
    tid = 31;
  }
  await clearAndReload(false);
  location.href = location.href.split('?')[0] + `?q=${tid}`;
};

const goto = async (e) => {
  let tid = parseInt(document.getElementById('test-case-id').value);
  if (tid > 31 || tid < 0) {
    tid = 0;
  }
  await clearAndReload(false);
  location.href = location.href.split('?')[0] + `?q=${tid}`;
};

