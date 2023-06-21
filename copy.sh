#!/bin/bash

node scripts/copy.js

ROOT=./qa
HTTP="/"
OUTPUT="index.html" 

i=0
echo "<html><body style='font-family:verdana ' >"  > $OUTPUT
echo "<div style='position:sticky; top: 0; padding: 1em; right: 0;margin: 1em 2em;font-size: 20px; color: #fff; background: darkslategrey;'>"  >>$OUTPUT
echo "<OL style='margin: 0 auto; width: 40em;'> " >> $OUTPUT
echo "    <li>srOnlyDisableTextCaptureEnabled</li>" >> $OUTPUT
echo "    <li>disableTextCapture</li>" >> $OUTPUT
echo "    <li>ignoreHeapTextCapture</li>" >> $OUTPUT
echo "    <li>isRedactTextEnabled</li>" >> $OUTPUT
echo "    <li>disableSRTextCapture</li>" >> $OUTPUT
echo "</OL>" >> $OUTPUT
echo "</div>" >> $OUTPUT

echo "<UL>" >> $OUTPUT
for filepath in `find "$ROOT" -maxdepth 1 -mindepth 1 -type d| sort`; do
  path=`basename "$filepath"`
  echo "  <LI>$path</LI>" >> $OUTPUT
  echo "  <UL>" >> $OUTPUT
  for i in `find "$filepath" -maxdepth 1 -mindepth 1 -type f| sort`; do
    file=`basename "$i"`
    echo "    <LI><a href=\"/qa/$path/$file\">$file</a></LI>" >> $OUTPUT
  done
  echo "  </UL>" >> $OUTPUT
done
echo "</UL>" >> $OUTPUT
echo "</body></html>" >> $OUTPUT




# rm -rf reg
# rm -rf new

# mkdir -p reg/1
# mkdir -p reg/2
# mkdir -p reg/3
# mkdir -p reg/4
# mkdir -p reg/5

# mkdir -p new/1
# mkdir -p new/2
# mkdir -p new/3
# mkdir -p new/4
# mkdir -p new/5

# cp ../jslib/tests/lws/html/HEAP-43672-feng/test-reg-1.html  reg/1/
# cp ../jslib/tests/lws/html/HEAP-43672-feng/test-reg-2.html  reg/2/
# cp ../jslib/tests/lws/html/HEAP-43672-feng/test-reg-3.html  reg/3/

# cp ../jslib/tests/lws/html/HEAP-43672-feng/test-new-1.html  new/1/
# cp ../jslib/tests/lws/html/HEAP-43672-feng/test-new-2.html  new/2/
# cp ../jslib/tests/lws/html/HEAP-43672-feng/test-new-3.html  new/3/
# cp ../jslib/tests/lws/html/HEAP-43672-feng/test-new-4.html  new/4/


# cp ../jslib/tests/_lws_docroot_/container.js reg/1/
# cp ../jslib/tests/_lws_docroot_/container.js reg/2/
# cp ../jslib/tests/_lws_docroot_/container.js reg/3/

# cp ../jslib/tests/_lws_docroot_/container.js new/1/
# cp ../jslib/tests/_lws_docroot_/container.js new/2/
# cp ../jslib/tests/_lws_docroot_/container.js new/3/
# cp ../jslib/tests/_lws_docroot_/container.js new/4/

# cp ../jslib/tests/_lws_docroot_/BB.css reg/1/
# cp ../jslib/tests/_lws_docroot_/BB.css reg/2/
# cp ../jslib/tests/_lws_docroot_/BB.css reg/3/

# cp ../jslib/tests/_lws_docroot_/BB.css new/1/
# cp ../jslib/tests/_lws_docroot_/BB.css new/2/
# cp ../jslib/tests/_lws_docroot_/BB.css new/3/
# cp ../jslib/tests/_lws_docroot_/BB.css new/4/

# cp ../jslib/tests/_lws_docroot_/test.jpg  reg/1/
# cp ../jslib/tests/_lws_docroot_/test.jpg  reg/2/
# cp ../jslib/tests/_lws_docroot_/test.jpg  reg/3/

# cp ../jslib/tests/_lws_docroot_/test.jpg  new/1/
# cp ../jslib/tests/_lws_docroot_/test.jpg  new/2/
# cp ../jslib/tests/_lws_docroot_/test.jpg  new/3/
# cp ../jslib/tests/_lws_docroot_/test.jpg  new/4/



# window['__AURYC_JSLIB_PATH__'] = 'https://cdn.auryc.dev/libs/latest/';
