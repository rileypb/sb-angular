import { Theme } from './symbols';


let black = '#000';
let white = '#fff';

let maroon = '#800000'

let darkgray = '#767676';
let gray = '#767676';
let lightgray = '#d6d6ce';

let lightred = '#b1746f';

let red = '#8f3931';
let orange = '#c16622';
let darkgreen = '#58593f';

export const uChicagoTheme: Theme = {
  name: 'uchicago',
  properties: {
    '--background': white,
    '--on-background': black,

    '--primary-dark': maroon,
    '--on-primary-dark': white,
    '--primary': red,
    '--on-primary': white,
    '--primary-light': lightred,
    '--on-primary-light': white,

    '--secondary-dark': darkgray,
    '--on-secondary-dark': white,
    '--secondary': gray,
    '--on-secondary': white,
    '--secondary-light': lightgray,
    '--on-secondary-light': black,

    '--accent-1-dark': darkgray,
    '--on-accent-1-dark': white,
    '--accent-1': gray,
    '--on-accent-1': black,
    '--accent-1-light': lightgray,
    '--on-accent-1-light': black,

    '--accent-2-dark': darkgray,
    '--on-accent-2-dark': white,
    '--accent-2': gray,
    '--on-accent-2': black,
    '--accent-2-light': lightgray,
    '--on-accent-2-light': black,

    '--surface': black,
    '--on-surface': white,

    '--dark-gray': darkgray,
    '--gray': gray,
    '--light-gray': lightgray,

    '--error': red,
    '--on-error': white,
    '--okay': darkgreen,
    '--on-okay': white,

    '--warning': orange,
    '--on-warning': white,

    '--logo-font': '"Fette Fraktur", Gotham, "Proxima Nova", Arial, Helvetica, sans-serif',
    '--banner-font': 'Gotham, "Proxima Nova", Arial, Helvetica, sans-serif',
    '--text-font': '"Adobe Garamond", "Times New Roman", serif',
    '--menu-font': 'Gotham, "Proxima Nova", Arial, Helvetica, sans-serif',
    '--user-font': 'Consolas, monospace',
  }
};