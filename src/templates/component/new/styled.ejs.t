---
to: "<%= cwd %>/<%= cam %>/<%= cam %>.styled.js"
sh: cd <%= cwd %> && prettier --write <%= cwd %>/<%= cam %>/<%= cam %>.styled.js
---
import styled from 'styled-components';

export const Wrapper = styled.div`
`;
