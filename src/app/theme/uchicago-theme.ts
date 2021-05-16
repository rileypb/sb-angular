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
let yellow = '#ffa319';

export const uChicagoTheme: Theme = {
  name: 'uchicago',
  properties: {    
    '--background': white,
    '--on-background': black,

    '--header-background': maroon,
    '--on-header-background': white,

    '--footer-background': white,
    '--on-footer-background': maroon,

    '--default-icon-color': maroon,

    '--icon-button-background': maroon,
    '--on-icon-button-background': white,

    '--card-shadow': lightgray,
    '--button-shadow': lightgray,

    '--card-border': lightgray,
    '--card-border-hover': black,
    '--button-border': lightgray,

    '--link': maroon,
    '--link-active': lightred,
    '--link-hover': lightred,
    '--link-visited': lightred,

    '--background-hover': lightgray,

    '--go-button-background': maroon,
    '--on-go-button-background': white,
    '--cancel-button-background': white,
    '--on-cancel-button-background': maroon,
    '--danger-button-background': red,
    '--on-danger-button-background': black,
    '--disabled-button-background': lightred,
    '--on-disabled-button-background': lightgray,

    '--nav-item-selected-background': maroon,
    '--on-nav-item-selected-background': white,
    '--nav-item-hover-background': lightred,
    '--on-nav-item-hover-background': white,

    '--spinner': maroon,
    '--progress-bar-element': lightred,
    '--progress-bar-fill': maroon,

    '--scrollbar-track': white,
    '--scrollbar': lightred,
    '--scrollbar-thumb': lightred,

    '--drag-placeholder-background': lightred,
    '--drag-placeholder-border': black,

    '--arrow-background': maroon,
    '--on-arrow-background': white,

    '--selected-state-button-background': maroon,
    '--on-selected-state-button-background': white,
    '--unselected-state-button-icon': lightred,
    '--issue-state-card-background': lightgray,

    '--list-selected': maroon,

    '--form-field-underline': maroon,
    '--form-field-caret': maroon,
    '--form-field-fill': "#0000000b",
    '--form-select-color': maroon,

    '--error': red,
    '--on-error': white,
    '--okay': darkgreen,
    '--on-okay': white,

    '--warning': yellow,
    '--on-warning': black,

    '--logo-font': '"Fette Fraktur", Gotham, "Proxima Nova", Arial, Helvetica, sans-serif',
    '--banner-font': 'Gotham, "Proxima Nova", Arial, Helvetica, sans-serif',
    '--text-font': '"Adobe Garamond", "Times New Roman", serif',
    '--menu-font': 'Gotham, "Proxima Nova", Arial, Helvetica, sans-serif',
    '--user-font': 'Consolas, monospace',
  }
};