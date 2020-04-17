install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

publish:
	npm publish --dry-run
