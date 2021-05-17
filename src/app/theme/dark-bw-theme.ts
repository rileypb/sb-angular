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

    '--header-background': black,
    '--on-header-background': white,

    '--footer-background': black,
    '--on-footer-background': white,

    '--default-icon-color': black,

    '--icon-button-background': white,
    '--on-icon-button-background': black,

    '--card-shadow': black,
    '--button-shadow': black,

    '--card-border': black,
    '--card-border-hover': white,
    '--button-border': black,

    '--link': black,
    '--link-active': white,
    '--link-hover': black,
    '--link-visited': black,

    '--background-hover': white,

    '--go-button-background': black,
    '--on-go-button-background': white,
    '--cancel-button-background': white,
    '--on-cancel-button-background': black,
    '--danger-button-background': red,
    '--on-danger-button-background': black,
    '--disabled-button-background': white,
    '--on-disabled-button-background': white,

    '--nav-item-selected-background': black,
    '--on-nav-item-selected-background': white,
    '--nav-item-hover-background': black,
    '--on-nav-item-hover-background': white,

    '--spinner': black,
    '--progress-bar-element': gray,
    '--progress-bar-fill': black,

    '--scrollbar-track': white,
    '--scrollbar': black,
    '--scrollbar-thumb': black,

    '--drag-placeholder-background': white,
    '--drag-placeholder-border': black,

    '--arrow-background': white,
    '--on-arrow-background': black,

    '--selected-state-button-background': black,
    '--on-selected-state-button-background': white,
    '--unselected-state-button-icon': black,
    '--issue-state-card-background': white,

    '--list-selected': black,

    '--form-field-underline': black,
    '--form-field-caret': black,
    '--form-field-fill': "#0000000b",
    '--form-select-color': black,

    '--mat-select-value-text-color': black,

    '--error': red,
    '--on-error': white,
    '--okay': darkgreen,
    '--on-okay': white,

    '--warning': orange,
    '--on-warning': black,

    '--logo-font': 'Helvetica, sans-serif',
    '--banner-font': 'Helvetica, sans-serif',
    '--text-font': 'Consolas, Courier, monospace',
    '--menu-font': 'Helvetica, sans-serif',
    '--user-font': 'Consolas, Courier, monospace'
  }
};