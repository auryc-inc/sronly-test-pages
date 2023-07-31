/**
 * Auryc JavaScript Client-Side Library v4.3.11, 1686951015741
 * (c) Copyright 2023, Auryc Inc. https://www.auryc.com
 */

(function () {
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function _asyncTimeoutReq(params) {
  var request = new window.XMLHttpRequest();
  var type = params.type || params.method;
  var url = params.url;
  var onSuccess = params.onSuccess;
  var onFailure = params.onFailure;
  var headers = params.headers;
  var timeout = params.timeout;

  var timeoutId = setTimeout(function () {
    // timeoutFlag = true;
    request.abort();
    console.log('timeout');
    if (onFailure) onFailure('request timeout!', new Date().getTime());
  }, timeout);

  request.onerror = function () {
    {
      console.log('The request failed! Onerror called');
    }
    if (onFailure) onFailure(this.responseText);
  };

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      clearTimeout(timeoutId);
      // Process our return data
      if (request.status >= 200 && request.status < 300) {
        // What do when the request is successful
        if (onSuccess) onSuccess(this.responseText);
      } else if (request.status !== 0) {
        // What do when the request fails
        console.log('The request failed. request.status: ' + request.status);
        if (onFailure) onFailure(this.responseText);
      }
    }
  };

  // Create and send a GET request
  // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
  // The second argument is the endpoint URL
  try {
    request.open(type, url);
    if (headers) {
      [].forEach.call(Object.keys(headers), function (key) {
        request.setRequestHeader(key, headers[key]);
      });
    }
    request.send();
  } catch (e) {
    if (onFailure) onFailure('Exception in network');
  }
}

var defaultVersion = 'latest';

function getOverrideVersion(params) {
  var win = params.win || window;
  return win.localStorage && win.localStorage.getItem && win.localStorage.getItem('_ar_:container:js_version');
}
function pickVersions(params, callback) {
  // first check if there is an override
  var override = getOverrideVersion(params);
  if (override) {
    {
      console.log('Found override version. Use it:', override);
    }
    return callback(override);
  }

  {
    console.log('Override version is not found. Get it from the server');
  }

  var onSuccess = function onSuccess(responseText) {
    try {
      // return an array: 
      // [{"version": "1.1.1", "percentage": 50}, {"version": "1.1.2", "percentage": 50}]
      var json = JSON.parse(responseText);
      if (!Array.isArray(json) || json.length === 0) {
        callback(defaultVersion);
        return;
      }
      var sum = 0;
      for (var index = 0; index < json.length; index++) {
        sum += json[index].percentage === undefined ? 100 : json[index].percentage;
        json[index].upperbound = sum;
        if (sum >= 100) break;
      }
      var random = params.random || Math.random() * 100;
      for (var _index = 0; _index < json.length; _index++) {
        if (random < json[_index].upperbound) {
          callback(json[_index].libraryversion);
          return;
        }
      }

      // random value is greater than all buckets, use default
      callback(defaultVersion);
    } catch (e) {
      {
        console.log('Exception in setting versions:');
        console.log(e);
      }
      callback(defaultVersion);
    }
  };

  var onFailure = function onFailure() {
    callback(defaultVersion);
  };

  var siteid = params.siteid;
  var siteToken = params.siteToken;
  if (!siteToken || !siteid) {
    callback(defaultVersion);
    return;
  }

  var asyncTimeoutReq = params.asyncTimeoutReq || _asyncTimeoutReq;
  asyncTimeoutReq(_extends({
    type: 'GET',
    url: params.url,
    onSuccess: onSuccess,
    onFailure: onFailure,
    timeout: 3000,
    headers: {
      'x-authorized-identity': siteid,
      'x-authorized-token': siteToken
    }
  }, params));
}

var domReady = function (ready) {
  /**
   * Based on domready 0.3.0 (c) Dustin Diaz 2012 - License MIT
   * https://github.com/ded/domready/tree/v0.3.0
   */
  /*eslint-disable */

  var fns = [],
      _fn2,
      f = false,
      doc = window.document,
      testEl = doc.documentElement,
      hack = testEl.doScroll,
      domContentLoaded = 'DOMContentLoaded',
      addEventListener = 'addEventListener',
      onreadystatechange = 'onreadystatechange',
      readyState = 'readyState',
      loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/,
      loaded = loadedRgx.test(doc[readyState]);

  function flush(f) {
    loaded = 1;
    f = fns.shift();
    while (f) {
      f();
      f = fns.shift();
    }
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, _fn2 = function fn() {
    doc.removeEventListener(domContentLoaded, _fn2, f);
    flush();
  }, f);

  hack && doc.attachEvent(onreadystatechange, _fn2 = function _fn() {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, _fn2);
      flush();
    }
  });

  return ready = hack ? function (fn) {
    self != top ? loaded ? fn() : fns.push(fn) : function () {
      try {
        testEl.doScroll('left');
      } catch (e) {
        return setTimeout(function () {
          ready(fn);
        }, 50);
      }
      fn();
    }();
  } : function (fn) {
    loaded ? fn() : fns.push(fn);
  };
}();
/*eslint-enable */

function beforeLoad(win) {
  if (win.aurycInit || win.disableHeapReplay) {
    return false;
  }
  win.aurycInit = true;

  var baseConfig = {};
  var feedbackConfig = {};
  var recordConfig = {};
  var ruleengineConfig = {};
  var behaviorConfig = {};

  // Don't remove. Required for uglify to keep them
  baseConfig.enabled = true;
  feedbackConfig.enabled = true;
  recordConfig.enabled = true;
  ruleengineConfig.enabled = true;
  behaviorConfig.enabled = true;
  /** @preserve */

  // new configuration objects
var baseConfig = {
  overWritten: false
};
var recordConfig = {
  overWritten: false
};
var feedbackConfig = {
  overWritten: false
};
var ruleengineConfig = {
  overWritten: false
};
var behaviorConfig = {
  overWritten: false
};

baseConfig = {
  "__value": "mFibGVkIjogdHJ1ZSwic2l0ZWlkIjogIjkzMy1sZWktdGVzdCIsInNpdGVUb2tlbiI6ICI1MzgyYzk1YmRmZWYwM2U0NWU4ZGYwOGJjY2U5OGVkNSIsImJyb3dzZXJfY3V0b2ZmIjp7IklFIjoxMSwiSW50ZXJuZXQgRXhwbG9yZXIiOjExLCJTYWZhcmkiOjUuMSwiRmlyZWZveCI6MzEsIkNocm9tZSI6MzYsIkNocm9tZSBNb2JpbGUiOjQ2LCJPcGVyYSI6MjV9LCJwbGF0Zm9ybV9jdXRvZmYiOnsiQW5kcm9pZCI6NC4xLCJXaW5waG9uZSI6OCwiaVBvZCI6NywiaVBob25lIjo3LCJpUGFkIjo3fX0eyJlb",
  "enabled": true,
  "siteid": "933-lei-test",
  "siteToken": "5382c95bdfef03e45e8df08bcce98ed5",
  "browser_cutoff": {
    "IE": 11,
    "Internet Explorer": 11,
    "Safari": 5.1,
    "Firefox": 31,
    "Chrome": 36,
    "Chrome Mobile": 46,
    "Opera": 25
  },
  "platform_cutoff": {
    "Android": 4.1,
    "Winphone": 8,
    "iPod": 7,
    "iPhone": 7,
    "iPad": 7
  }
};

feedbackConfig = {
  "siteid": "933-lei-test",
  "instances": [
    {
      "redactFeedbackResponses": true,
      "customCss": {
        "align": "center"
      },
      "backgroundColor": "#F31347",
      "fontColor": "#FFFFFF",
      "triggerbehavior": "I",
      "brand": "show",
      "triggerdelayseconds": "10",
      "triggerhalfwaydownpage": false,
      "targetingdevicedesktop": true,
      "targetingdevicemobile": true,
      "triggerpagefilter": "A",
      "filterpages": [
        ""
      ],
      "filterpagesInclude": [
        "*test=1*"
      ],
      "fbdirection": "horizontal",
      "label": "Feedback ",
      "targetingcap": "100",
      "popupDelayEnabled": false,
      "exitPopupEnabled": true,
      "autoHide": true,
      "popupDelaySeconds": "10",
      "specificFormEnable": false,
      "feedbackThrottles": {
        "cookie": "auryc.fbt",
        "abandoned": 7,
        "submitted": 90,
        "sampling": 100
      },
      "logoAlt": "Auryc Feedback Logo",
      "surveyLink": "https://survey-dev.auryc.com/survey?fbId=6013&siteId=933-lei-test",
      "delay": 0,
      "fblocation": "bottomleft",
      "popup": false,
      "fbtype": "badge",
      "disabled": false,
      "fbanimate": false,
      "fbfixed": false,
      "topics": [
        {
          "order": 0,
          "id": "11311",
          "answerId": "479475998001119A001",
          "whitelistActive": false,
          "whitelistData": "",
          "topicText": "Default Question Group"
        },
        {
          "order": 1,
          "id": "11541",
          "answerId": "479475998001119A002",
          "whitelistActive": false,
          "whitelistData": "",
          "topicText": "New Question Group 2"
        }
      ],
      "templates": "default",
      "showBadge": true,
      "redirectUrl": "https://www.yahoo.com/",
      "version": 18,
      "mid": "rkSS5ZWKMHdMIFj1ulGG8E6u3sqSZJ0i",
      "projectId": 6013,
      "datauri": "https://feedback-api.auryc.dev/view/feedback-json",
      "posturi": "https://feedback-api.auryc.dev/submit-feedback"
    }

  ]
};
recordConfig = {
  
        //recordConfig//
        "isRedactTextEnabled": true,
        "disableSRTextCapture": true,
        "srOnlyDisableTextCaptureEnabled": false,
        
  "enabled": true,
  "cb": 1,
  "keepInputs": true,
  "keepInputsWhiteList": "",
  "serializeCss": true,
  "serializeImg": false,
  "isSameDocClone": true,
};
ruleengineConfig = {
  "__value": "XRlaWQiOiAiOTMzLWxlaS10ZXN0IiwiY3JlYXRpdmVzIjogW3siaWQiOiAxLCJ0ZW1wbGF0ZSI6ICJzaWdudXAiLCJkaXNwbGF5IjogeyJjb2xvciI6ICIjZmZmZmZmIn0sImNvbnRlbnQiOiB7ImltZyI6ICJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vcHVibGljLWFzc2V0cy5hdXJ5Yy5jb20vY3JlYXRpdmVzL3Rlc3QvdGVlYy5wbmcifSwidHJpZ2dlcnMiOiB7InNlcmlhbGl6ZWQiOiAiZi5wdiA-IDIgYW5kIGYucGFnZWxvYWQifSwiZ29hbCI6IHsiZXZlbnQiOiAiY2xpY2siLCJ0YXJnZXQiOiAiI2dvYWwxIn19LHsiaWQiOiAyLCJ0ZW1wbGF0ZSI6ICJmYmxpa2UiLCJkaXNwbGF5IjogeyJjb2xvciI6ICIjZmZmZmZmIn0sImNvbnRlbnQiOiB7ImltZyI6ICJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vcHVibGljLWFzc2V0cy5hdXJ5Yy5jb20vY3JlYXRpdmVzL3Rlc3QvZmJsaWtlX3RlZWMuanBnIn0sInRyaWdnZXJzIjogeyJzZXJpYWxpemVkIjogImYucHYgPiAyIGFuZCBmLmhhbGZ3YXlkb3duIGFuZCBmLnVybCA9ICd0ZWFtbWVtYmVyJyAifSwiZ29hbCI6IHsiZXZlbnQiOiAiY2xpY2siLCJ0YXJnZXQiOiAiI2dvYWwxIn19XX0eyJza",
  "siteid": "933-lei-test",
  "creatives": [{
    "id": 1,
    "template": "signup",
    "display": {
      "color": "#ffffff"
    },
    "content": {
      "img": "https://s3.amazonaws.com/public-assets.auryc.com/creatives/test/teec.png"
    },
    "triggers": {
      "serialized": "f.pv > 2 and f.pageload"
    },
    "goal": {
      "event": "click",
      "target": "#goal1"
    }
  }, {
    "id": 2,
    "template": "fblike",
    "display": {
      "color": "#ffffff"
    },
    "content": {
      "img": "https://s3.amazonaws.com/public-assets.auryc.com/creatives/test/fblike_teec.jpg"
    },
    "triggers": {
      "serialized": "f.pv > 2 and f.halfwaydown and f.url = 'teammember' "
    },
    "goal": {
      "event": "click",
      "target": "#goal1"
    }
  }]
};
behaviorConfig = {
  
        //behaviorConfig//
        "ignoreHeapTextCapture": true,
        
  "enabled": true,
  "preloadDomContent": true,
  "renewSession": true,
  "pageTypeVar": "pagetype.name",
  "remote_cfg": "disabled",
  "crossdomain": true,
  "forceXhrOverride": true,
  "disableWinName": true,
  "siteid": "933-lei-test",
  "samesite": true,
  "autotracking": true,
  "cookieEncode": "base64",
  "sessionDuration": 1800,
  "frustrationTrack": {
    "enabled": true
  },
  "trackingMode": "new",
  "trackResource": true,
  "doNotTrack": {
    "blocked": { ".*": ".hide-this,.hide-that,input[id='new_card_0_num'],input[id='new_card_0_cvv'],select[id='new_card_0_month'],select[id='new_card_0_year'],input[id='new_card_1_num'], input[id='new_card_1_cvv'],input[id='number'],select[id='validThruYear'],select[id='validThruMonth'],select[id='new_card_1_month'],select[id='new_card_1_year'],input[id='new_card_2_num'],input[id='new_card_2_cvv'],select[id='new_card_2_month'],select[id='new_card_2_year'],input[id='new_card_3_num'],input[id='new_card_3_cvv'],select[id='new_card_3_month'],select[id='new_card_3_year'],div[id='pii']" },
    "ip": {
      // "wl": ["24.38.87.12", "12.199.206.122", "207.140.63.242", "206.81.16.", "3.112.172.182", "27.26.*"],
      // "bl": ["3.112.172.182", "206.81.16.17"]
    }
  },
  "sampling": 100,
  "ajax": true,
  "adobe_analytics": {
    "enabled": true,
    "sampling": 100,
    "selectors": {
      "name": [
        "^((?!internalSearchClick).)*$"
      ],
      "name_prefix": "adobe_",
      "payloads": [
        "eVar",
        "prop"
      ]
    }
  },
  "urlObfuscation": {
    "redactUrlPath": true,
    "redactUrlQuery": true,
  },
  "gtm_datalayer": {
    "enabled": true,
    "sampling": 100,
    "events": {
      "prefix": "dl",
      "names": [
        "eventTracker|addToCart|checkout|purchase|detail"
      ],
      "properties": {
        "__shared__": [
          "ecommerce(.*)(\\.id|\\.price|\\.quantity)"
        ],
        "eventTracker": [
          "eventAction|eventCategory|eventLabel"
        ],
        "purcahse": [
          "coupon|orderId|PepperJam|Products|Revenue"
        ],
        "detail": [
          "color|\\.id|\\.name"
        ]
      }
    },
    "session": {
      "prefix": "dl",
      "properties": [
        "loggedInState"
      ]
    },
    "user": {
      "prefix": "dl",
      "properties": [
        "demandwareID|loggedInState|customer\\.email|customer\\.firstName|customer\\.id|customer\\.lastName|customer\\.phone"
      ]
    }
  },
  "userProperties": [
    {
      "context": {
        "cssSelector": "[class*='alert-danger'],[id*='alert-danger'],[id*='card-errors']"
      },
      "dynamic": true,
      "visible": false,
      "properties": [
        {
          "name": "SiteError",
          "dataType": "customEvent",
          "attribute": [
            {
              "name": "error_message",
              "value": {
                "cssSelector": "[class*='alert-danger'],[id*='alert-danger'],[id*='card-errors']",
                "attribute": "innerText"
              },
              "required": "true"
            }
          ]
        }
      ]
    }
  ],
  "crossDomain": {
    "property": {
      "cssSelector": "#crossWithNewTab #mutationDiv form[name=search]"
    }
  },
  "excluded": {
    "urls": [
      "marketo",
      "xfinityChat",
      "https://www.bradleycorp.com/tools/virtual-design-tool/#/",
      "iframe5_1"
    ],
    "ua": []
  },
  "included": {
    "urls": []
  },
  "netinfo": false,
  "trackConsole": false,
  "trackNetwork": false,
  "selectiveRecording": false,
  "ajaxRequestWhitelist": [
    {
      "reg": "login",
      "req": {
        "type": "specific",
        "fields": "signInName,request_type"
      },
      "res": {
        "type": "specific",
        "fields": "message,status"
      }
    },
    {
      "reg": "com",
      "req": {
        "type": "all",
        "fields": ""
      },
      "res": {
        "type": "all",
        "fields": ""
      }
    }
  ],
  "ajaxRequestWhitelistBak": [
    {
      "reg": "www.bradleycorp.com",
      "req": {
        "type": "all",
        "fields": ""
      },
      "res": {
        "type": "all",
        "fields": ""
      }
    }
  ]
};
window.aurycLoadedTime = win.performance && win.performance.timing ? win.performance.timing.responseStart : new Date().getTime();


  /** @preserve */
  win.aurycLoadedTime = win.performance && win.performance.timing ? win.performance.timing.responseStart : new Date().getTime();

  // new configuration objects
  /*eslint-disable */
  win.aurycJsLibConfig = {
    base: baseConfig,
    feedback: feedbackConfig,
    record: recordConfig,
    ruleengine: ruleengineConfig,
    behavior: behaviorConfig
  };
  /*eslint-enable */

  return true;
}

function loadScript(scriptUrlToLoad, callback) {
  var scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript';
  scriptTag.setAttribute('data-cfasync', false);
  scriptTag.charset = 'UTF-8';
  scriptTag.async = true;
  scriptTag.src = scriptUrlToLoad;
  if (callback) {
    scriptTag.onload = callback;
  }

  var scripts = document.getElementsByTagName('script');
  if (scripts.length > 0) {
    scripts[0].parentNode.insertBefore(scriptTag, scripts[0]);
  } else {
    document.head.appendChild(scriptTag);
  }
}

function getOverrideParams(key, product) {
  var params = window['__AURYC_PARAMS_OVERRIDE__'];
  return ((params || {})[product] || {})[key];
}

/*eslint-disable */
function getConfigUrl() {
  try {
    switch ("local".toLowerCase()) {
      case 'local':
      case 'automation':
      case 'development':
        return 'https://client-api.auryc.dev/releasesettings?lib=Web';
      case 'production':
        return 'https://client-api.auryc.com/releasesettings?lib=Web';
      default:
        return '';
    }
  } catch (e) {
    return '';
  }
}
/*eslint-disable */
function getScriptLoc(version) {
  var jslibLoc = getOverrideParams('jslibPath', 'container') || window['__AURYC_JSLIB_PATH__'];
  switch ("local".toLowerCase()) {
    case 'local':
      return jslibLoc || 'http://localhost:8887/';
    case 'automation':
      return '';
    case 'development':
      return jslibLoc || 'https://cdn.auryc.dev/libs/' + version + '/';
    case 'production':
      return jslibLoc || 'https://cdn.auryc.com/libs/' + version + '/';
    default:
      return '';
  }
}
/*eslint-enable */

function init() {
  var loadJS = function loadJS(version) {
    {
      console.log('Auryc Library Version: ' + version);
    }
    window.aurycJsLibConfig = window.aurycJsLibConfig || {};
    window.aurycJsLibConfig.version = version;
    var scriptUrl = getScriptLoc(version) + 'auryc.lib.js';
    loadScript(scriptUrl);
  };
  var params = {
    url: getConfigUrl(),
    siteid: window.aurycJsLibConfig.base.siteid,
    siteToken: window.aurycJsLibConfig.base.siteToken
  };
  pickVersions(params, loadJS);
}

var toLoad = beforeLoad(window);
if (toLoad) {
  if (window.aurycJsLibConfig && window.aurycJsLibConfig.behavior && window.aurycJsLibConfig.behavior.deferredLoading) {
    var load = function load() {
      setTimeout(init, window.aurycJsLibConfig.behavior.deferredLoading);
    };
    domReady(load);
  } else {
    domReady(init);
  }
}

}());
