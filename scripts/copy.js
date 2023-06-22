const { readFile, writeFile, readdir, mkdir } = require('fs').promises;
const path = require('path');

async function run() {
    const htmlStrings = {}

    const files = await readdir(path.resolve(__dirname, 'htmls'));
    for (const file of files) {
        const htmlString = await readFile(path.resolve(__dirname, 'htmls', file), 'utf8');
        htmlStrings[file] = htmlString;
    }

    const containerText = await readFile(path.resolve(__dirname, 'container.js'), 'utf8');

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 2; k++) {
                for (l = 0; l < 2; l++) {
                    for (m = 0; m < 2; m++) {
                        for (const file of files) {
                            const htmlString = htmlStrings[file];
                            const newHTML = await updateHTML(i, j, k, l, m, htmlString);
                            const pathname = `qa/new/${i}_${j}_${k}_${l}_${m}/`
                            await mkdir(pathname, { recursive: true });
                            await writeFile(path.join(__dirname, '..', pathname + '/' + file), newHTML);

                            const newContainer = await updateContainer(i, j, k, l, m, containerText);
                            await writeFile(path.join(__dirname, '..', pathname + '/container.js'), newContainer);
                        }
                    }
                }
            }
        }
    }
}

function updateContainer(
    srOnlyDisableTextCaptureEnabled,
    disableTextCapture,
    ignoreHeapTextCapture,
    isRedactTextEnabled,
    disableSRTextCapture,
    cntrTxt
) {
    const behaveTxt = `
        //behaviorConfig//
        "ignoreHeapTextCapture": ${!!ignoreHeapTextCapture},
        `;
    const recordTxt = `
        //recordConfig//
        "isRedactTextEnabled": ${!!isRedactTextEnabled},
        "disableSRTextCapture": ${!!disableSRTextCapture},
        "srOnlyDisableTextCaptureEnabled": ${!!srOnlyDisableTextCaptureEnabled},
        `;
    return cntrTxt.replace('//behaviorConfig//', behaveTxt)
        .replace('//recordConfig//', recordTxt);

}
async function updateHTML(
    srOnlyDisableTextCaptureEnabled,
    disableTextCapture,
    ignoreHeapTextCapture,
    isRedactTextEnabled,
    disableSRTextCapture,
    htmlString
) {

    const ret = {
        config: {
            disableTextCapture: !!disableTextCapture,
        }
    };
    const scrpt = `
    <script type="text/javascript">
        localStorage.removeItem('_ar_:behavior:ignoreHeapTextCapture');
        localStorage.removeItem('_ar_:record:disableSRTextCapture');
        localStorage.removeItem('_ar_:record:isRedactTextEnabled');
        localStorage.removeItem('_ar_:record:srOnlyDisableTextCaptureEnabled');

        window._auryc_is_inner_frame_ =  true;
        window['__AURYC_JSLIB_PATH__'] = 'https://cdn.auryc.dev/libs/latest/';
        window.heap = ${JSON.stringify(ret)}
    </script>
    `;
    return htmlString.replace('<head>', '<head>' + scrpt);
}

run();