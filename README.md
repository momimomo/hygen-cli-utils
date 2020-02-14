#  hygen.io CLI utility

## Overview
This project is a set of preconfigured useful defaults that allow quicker:
- use of templates and config stored in user home directory as preconfigured hygen commands in clear CLI.
- example component and structure for extending with other CLI tools for generating templates in `home`/_templates, `home`/.hygen.js)
- Run hygen commands in home direcotry to extend with more templates and generators
- OR use _templates for syncing submodules (!)

## Installation:
- install `hygen` globally. http://www.hygen.io/
- clone this repo, run make-install in project root.

## Main Features:
Anywhere on your machine, type the command specified in `bin` in package.json. (`cgen` is default).
You will have access to CLI utility that can be configured in index.js and rebuilt with `make reload`.

The options chosen in CLI will result in running preconfigured hygen commands regardless of project structure,
if no .hygen.js is present in current directory.

Some of them can be useful in any conditions, some require running them always in root, depending on project structure.
(e.g Redux + TypeScript).

If .hygen.js is found, all of specified defaults can be overwritten by custom project config.
