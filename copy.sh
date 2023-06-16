rm -rf reg
rm -rf new

mkdir -p reg/1
mkdir -p reg/2
mkdir -p reg/3
mkdir -p reg/4
mkdir -p reg/5

mkdir -p new/1
mkdir -p new/2
mkdir -p new/3
mkdir -p new/4
mkdir -p new/5

cp ../jslib/tests/lws/html/HEAP-43672-feng/test-new-1.html  reg/1/
cp ../jslib/tests/lws/html/HEAP-43672-feng/test-new-2.html  reg/2/
cp ../jslib/tests/lws/html/HEAP-43672-feng/test-new-3.html  reg/3/

cp ../jslib/tests/lws/html/HEAP-43672-feng/test-new-1.html  new/1/
cp ../jslib/tests/lws/html/HEAP-43672-feng/test-new-2.html  new/2/
cp ../jslib/tests/lws/html/HEAP-43672-feng/test-new-3.html  new/3/
cp ../jslib/tests/lws/html/HEAP-43672-feng/test-new-4.html  new/4/

cp ../jslib/tests/_lws_docroot_/container.js reg/1/
cp ../jslib/tests/_lws_docroot_/container.js reg/2/
cp ../jslib/tests/_lws_docroot_/container.js reg/3/

cp ../jslib/tests/_lws_docroot_/container.js new/1/
cp ../jslib/tests/_lws_docroot_/container.js new/2/
cp ../jslib/tests/_lws_docroot_/container.js new/3/
cp ../jslib/tests/_lws_docroot_/container.js new/4/
