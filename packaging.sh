#!/bin/bash
#set -x     #- for debug

npm i -D
rm -R ./dist/*.zip
mkdir ./dist

VERSION="${1:-`date +%-m.%-d.%-H.%-M`}"
echo "Build version $VERSION"

MANIFEST_FILE_NAME="manifest.json"
MANIFEST_FILE_NAME_V2="manifestv2.json"
CSS_BUNDLE_FILE="global.css"
VERSION_JS_FILE_NAME="util/version.js"

##
## $1: string version in format x.x.x
##
function sed_version {
  echo "Stream version"
  sed -i "s/0\.0\.0/$VERSION/g" "${DIST_MODULE}/${MANIFEST_FILE_NAME}"
  sed -i "s/0\.0\.0/$VERSION/g" "${DIST_MODULE}/${MANIFEST_FILE_NAME_V2}"
  sed -i "s/__VERSION__/$VERSION/g" "${DIST_MODULE}/${VERSION_JS_FILE_NAME}"
}

function minified() {
  for v in "$@"; do
    # npx terser "$v" -o "$v"
    echo "Minified: $v"
  done
}
export -f minified


DIST_MODULE="./dist/firefox"
echo '------------------------------------------------------------'
echo 'MODULE -- Firefox'
echo '------------------------------------------------------------'
echo ''
mkdir "${DIST_MODULE}"
cp -r src/* "${DIST_MODULE}"
sed_version

cp readme.md "${DIST_MODULE}"
## Patch to use manifest v2
rm "${DIST_MODULE}/${MANIFEST_FILE_NAME}"
mv "${DIST_MODULE}/${MANIFEST_FILE_NAME_V2}" "${DIST_MODULE}/${MANIFEST_FILE_NAME}"
## Modifing chrome-extension:// to moz-extension://
sed -i "s/chrome/moz/g" "${DIST_MODULE}/${CSS_BUNDLE_FILE}"
(cd "${DIST_MODULE}" && \
  zip -qr -X "../ogi-firefox.zip" .)
echo "Packing zip for firefox complete!"
rm -rf "${DIST_MODULE}"


DIST_MODULE="./dist/chrome"
echo '------------------------------------------------------------'
echo 'MODULE -- Edge, Chrome and Chromium'
echo '------------------------------------------------------------'
echo ''
mkdir "${DIST_MODULE}"
cp -r src/* "${DIST_MODULE}"
sed_version

find "${DIST_MODULE}" \
  -type f -iname '*.js' \
  -not -path '*/libs/*' \
  -exec bash -c 'minified "$@"' bash {} +

(cd "${DIST_MODULE}" && \
  zip -qr -X "../ogi-chrome.zip" .)
echo "Packing zip for chrome complete!"

sed -i '31d' "${DIST_MODULE}/${MANIFEST_FILE_NAME}" ##- What is this line for?
(cd "${DIST_MODULE}" && \
  zip -qr -X "../ogi-edge.zip" .)
echo "Packing zip for edge complete!"
rm -rf "${DIST_MODULE}"
