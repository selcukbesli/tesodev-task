// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import JSON_DATA from './data/data.json';

/**
 * Create a mock localStorage for localStorage
 */
const fakeLocalStorage = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return JSON.stringify(JSON_DATA);
    },
    setItem: function (key, JSON_DATA) {
      store[key] = JSON_DATA.toString();
    },
  };
})();

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: fakeLocalStorage,
  });
});
