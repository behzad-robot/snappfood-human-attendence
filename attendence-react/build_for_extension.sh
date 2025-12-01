bun run build
rm -rf ../my-chrome-extension/assets/*
mv dist/index.html dist/react.html
cp -a dist/ ../my-chrome-extension/