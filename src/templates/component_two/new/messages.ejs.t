---
to: "<%= cwd %>/<%= cam %>/messages.js"
sh: cd <%= cwd %> && prettier --write <%= cwd %>/<%= cam %>/messages.js
---
export const messages = {
}
