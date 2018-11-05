import Promise from 'promise-polyfill';
import './polyfills/startsWith';
import './polyfills/endsWith';
import './polyfills/findIndex';
import './polyfills/find';
import './polyfills/includes';
import { loadFontGroup } from './utils/load-font';

const lyon = [
	{ family: 'Lyon Text Web', weight: 300 },
	{ family: 'Lyon Text Web', weight: 700 },
];

const lyonItalic = [
	{ family: 'Lyon Italic Text Web', weight: 400 }
];

const founders = [
	{ family: 'Founders Grotesk Text Web', weight: 400 },
	{ family: 'Founders Grotesk Text Web', weight: 500 },
	{ family: 'Founders Grotesk Text Web', weight: 600 },
];

// polyfill promise
if (!window.Promise) window.Promise = Promise;

// load fonts
loadFontGroup(lyon);
loadFontGroup(lyonItalic);
loadFontGroup(founders);
