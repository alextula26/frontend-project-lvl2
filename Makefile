install:
	npm install

start:
	npx babel-node bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish --dry-run
