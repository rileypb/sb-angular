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
  fonts: 'https://fonts.googleapis.com/css2?family=Open+Sans&family=PT+Sans&family=Roboto+Mono&display=swap',
  properties: {
    '--background': white,
    '--on-background': slate,

    '--header-background': darkpurple,
    '--on-header-background': white,

    '--footer-background': gold,
    '--on-footer-background': slate,

    '--default-icon-color': darkpurple,

    '--icon-button-background': gold,
    '--on-icon-button-background': darkpurple,

    '--card-shadow': gray,
    '--button-shadow': gray,

    '--card-border': gray,
    '--card-border-hover': darkgray,
    '--button-border': gray,

    '--link': darkpurple,
    '--link-active': lightpurple,
    '--link-hover': purple,
    '--link-visited': purple,

    '--background-hover': lightgray,

    '--go-button-background': darkpurple,
    '--on-go-button-background': white,
    '--cancel-button-background': purple,
    '--on-cancel-button-background': purple,
    '--danger-button-background': purple,
    '--on-danger-button-background': purple,
    '--disabled-button-background': purple,
    '--on-disabled-button-background': gray,

    '--nav-item-selected-background': purple,
    '--on-nav-item-selected-background': slate,
    '--nav-item-hover-background': purple,
    '--on-nav-item-hover-background': slate,

    '--spinner': darkpurple,
    '--progress-bar-element': purple,
    '--progress-bar-fill': darkpurple,

    '--scrollbar-track': white,
    '--scrollbar': purple,
    '--scrollbar-thumb': darkpurple,

    '--drag-placeholder-background': gray,
    '--drag-placeholder-border': darkgray,

    '--arrow-background': gold,
    '--on-arrow-background': slate,

    '--selected-state-button-background': gold,
    '--unselected-state-button-icon': purple,
    '--issue-state-card-background': lightgray,

    '--list-selected': darkpurple,

    '--form-field-underline': darkpurple,
    '--form-field-caret': darkpurple,
    '--form-field-fill': "#0000000b",
    '--form-select-color': darkpurple,

    '--error': red,
    '--on-error': white,
    '--okay': darkgreen,
    '--on-okay': white,

    '--warning': orange,
    '--on-warning': slate,

    '--logo-font': '"Open Sans", sans-serif',
    '--banner-font': '"Open Sans", sans-serif',
    '--text-font': '"PT Sans", sans-serif',
    '--menu-font': '"Open Sans", sans-serif',
    '--user-font': '"Roboto Mono", monospace'
  }

};

