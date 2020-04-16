install:
	npm install

start:
	node bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish --dry-run
