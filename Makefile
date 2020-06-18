VERSION := $(shell node ./get-version.js)
NEXT_VERSION := $(shell node ./get-next-version.js)

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

start-release:
	git checkout develop
	git pull origin develop
	git checkout -b release/$(NEXT_VERSION) develop
	npm run release

push-release:
	# tag release branch
	git tag -a v$(VERSION) -m 'Release $(VERSION)'
	# push release branch
	git push --set-upstream origin release/$(VERSION)
	# push tag
	git push origin v$(VERSION)
