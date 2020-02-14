install:
	npm install
	npm run build
	npm install -g

uninstall:
	npm uninstall -g
	rm -rf ~/_templates
	rm -rf ~/.hygen.js

reload:
	npm uninstall -g
	npm run build
	npm install -g
	rm -rf ~/_templates
	rm -rf ~/.hygen.js
