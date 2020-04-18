install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test
