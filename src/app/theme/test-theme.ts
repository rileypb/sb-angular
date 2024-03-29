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

export const testTheme: Theme = {
  name: 'test',
  fonts: "https://fonts.googleapis.com/css2?family=Lato&family=Yellowtail&display=swap",
  properties: {
    '--background': slate,
    '--on-background': orange,

    '--primary-dark': darkgreen,
    '--on-primary-dark': orange,
    '--primary': green,
    '--on-primary': red,
    '--primary-light': lightgreen,
    '--on-primary-light': red,

    '--secondary-dark': darkblue,
    '--on-secondary-dark': orange,
    '--secondary': blue,
    '--on-secondary': red,
    '--secondary-light': lightblue,
    '--on-secondary-light': red,

    '--accent-1-dark': darkgreen,
    '--on-accent-1-dark': orange,
    '--accent-1': green,
    '--on-accent-1': red,
    '--accent-1-light': lightgreen,
    '--on-accent-1-light': red,

    '--accent-2-dark': darkblue,
    '--on-accent-2-dark': white,
    '--accent-2': blue,
    '--on-accent-2': slate,
    '--accent-2-light': lightblue,
    '--on-accent-2-light': slate,

    '--surface': white,
    '--on-surface': slate,

    '--dark-gray': darkpurple,
    '--gray': purple,
    '--light-gray': lightpurple,

    '--error': red,
    '--on-error': white,
    '--okay': darkgreen,
    '--on-okay': slate,

    '--warning': orange,
    '--on-warning': white,

    '--banner-font': 'Yellowtail, monospace',
    '--text-font': 'Lato, sans-serif',
    '--menu-font': 'Lato, sans-serif',
    '--user-font': '"Roboto Mono", monospace'
  }
};