---
to: "<%= cwd %>/<%= cam %>/<%= cam %>.test.js"
sh: cd <%= cwd %> && prettier --write <%= cwd %>/<%= cam %>/<%= cam %>.test.js
---
import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from 'react-testing-library';
import <%= cam %> from './<%= cam %>';
import { messages as <%= cam %>Messages } from './messages';
import 'jest-dom/extend-expect';

const mockSubmit = jest.fn();

const mockValues = {
  first_name: 'Daenerys',
  last_name: 'Targaryen',
};

const fillText = (inputElement, text) => {
  fireEvent.change(inputElement, {
    target: { value: text },
  });
};

const DOWN_ARROW = { keyCode: 40 };

jest.setTimeout(10000);

describe('<%= cam %>', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment, getByText, getByDisplayValue } = render(
      <<%= cam %> onSubmit={mockSubmit} initialValues={mockValues} />
    );

    getByText('Daenerys');
    getByText('Targaryen');

    expect(asFragment()).toMatchSnapshot();
  });
});
