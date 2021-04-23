import { Theme } from './symbols';

let darkpurple = '#450084';
let purple = '#B599CE';
let lightpurple = '#DACCE6';

let darkgold ='#AD9C65';
let gold = '#CBB677';
let lightgold = '#F4EFE1';

let white = '#fff';
let slate = '#333333';
let darkgray = '#595959';
let gray = '#B2B2B2';
let lightgray = '#D6D6D6';

let darkgreen = '#5F791C';
let green = '#ADCC23';
let lightgreen = '#DEEBA7';

let darkblue = '#3C738B';
let blue = '#5498B6';
let lightblue = '#D2EBF5';

let red = '#A4232B';
let orange = '#FFBD00';

export const jmuTheme: Theme = {
  name: 'jmu',
  properties: {
    '--background': white,
    '--on-background': slate,

    '--primary-dark': darkpurple,
    '--on-primary-dark': white,
    '--primary': purple,
    '--on-primary': slate,
    '--primary-light': lightpurple,
    '--on-primary-light': slate,

    '--secondary-dark': darkgold,
    '--on-secondary-dark': slate,
    '--secondary': gold,
    '--on-secondary': slate,
    '--secondary-light': lightgold,
    '--on-secondary-light': slate,

    '--accent-1-dark': darkgreen,
    '--on-accent-1-dark': white,
    '--accent-1': green,
    '--on-accent-1': slate,
    '--accent-1-light': lightgreen,
    '--on-accent-1-light': slate,

    '--accent-2-dark': darkblue,
    '--on-accent-2-dark': white,
    '--accent-2': blue,
    '--on-accent-2': slate,
    '--accent-2-light': lightblue,
    '--on-accent-2-light': slate,

    '--surface': white,
    '--on-surface': slate,

    '--dark-gray': darkgray,
    '--gray': gray,
    '--light-gray': lightgray,

    '--error': red,
    '--on-error': white,
    '--okay': darkgreen,
    '--on-okay': slate,

    '--warning': orange,
    '--on-warning': white,

    '--banner-font': 'cursive, "Segoe UI", Roboto, sans-serif',
    '--text-font': 'Impact, Georgia, serif'
  }
};