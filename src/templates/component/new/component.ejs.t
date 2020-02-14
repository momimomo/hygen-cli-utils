---
to: "<%= cwd %>/<%= cam %>/<%= cam %>.js"
sh: cd <%= cwd %> && prettier --write <%= cwd %>/<%= cam %>/<%= cam %>.js
---
import React from 'react';
import PropTypes from 'prop-types';
import { messages } from './messages';

const <%= cam %> = props => {
const {

} = props;
  return (
    <div>

    </div>
  );
};

<%= cam %>.defaultProps = {
};

<%= cam %>.propTypes = {
};

export default <%= cam %>;
