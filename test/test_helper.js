import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import jsdom from 'jsdom';

const html = "<!doctype html><html><head><meta charset='utf-8'></head><body></body></html>";

global.document = jsdom.jsdom(html, {
  globalize: true,
  console: true,
  useEach: false,
  skipWindowCheck: false,
});

global.window = document.defaultView;
// window.navigator = { userAgent: 'Chrome/49.0.2454.85' };
global.navigator = window.navigator;

global.expect = expect;
global.shallow = shallow;
global.sinon = sinon;
