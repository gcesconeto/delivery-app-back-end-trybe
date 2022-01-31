import React, { createContext } from 'react';
import { node } from 'prop-types';

export const Context = createContext();

export function Provider({ children }) {
  return (
    <Context.Provider
      value={ {
      } }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: node.isRequired,
};

export default {
  Context,
  Provider,
};
