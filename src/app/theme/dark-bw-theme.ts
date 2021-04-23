import { Theme } from './symbols';


let black = '#000';
let white = '#fff';

let darkgray = '#595959';
let gray = '#B2B2B2';
let lightgray = '#D6D6D6';

let red = '#A4232B';
let orange = '#FFBD00';
let darkgreen = '#33A532';

export const darkBWTheme: Theme = {
  name: 'dark-bw',
  properties: {
    '--background': white,
    '--on-background': black,

    '--primary-dark': black,
    '--on-primary-dark': white,
    '--primary': gray,
    '--on-primary': black,
    '--primary-light': lightgray,
    '--on-primary-light': black,

    '--secondary-dark': darkgray,
    '--on-secondary-dark': white,
    '--secondary': gray,
    '--on-secondary': black,
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

    '--banner-font': '"Segoe UI", Roboto, sans-serif',
    '--text-font': 'Consolas, monospace',
    '--menu-font': 'serif'
  }
};