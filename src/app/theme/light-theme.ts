import { Theme } from './symbols';

let foreground = '#444444';
let black = '#000';
let white = '#fff';

let darkgray = '#595959';
let gray = '#B2B2B2';
let lightgray = '#D6D6D6';

let red = '#A4232B';
let orange = '#FFBD00';
let darkgreen = '#33A532';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--background': white,
    '--on-background': foreground,

    '--header-background': lightgray,
    '--on-header-background': darkgray,

    '--footer-background': gray,
    '--on-footer-background': white,

    '--default-icon-color': darkgray,

    '--icon-button-background': white,
    '--on-icon-button-background': foreground,

    '--card-shadow': gray,
    '--button-shadow': gray,

    '--card-border': gray,
    '--card-border-hover': darkgray,
    '--button-border': gray,

    '--link': foreground,
    '--link-active': lightgray,
    '--link-hover': gray,
    '--link-visited': darkgray,

    '--background-hover': white,

    '--go-button-background': darkgray,
    '--on-go-button-background': white,
    '--cancel-button-background': white,
    '--on-cancel-button-background': darkgray,
    '--danger-button-background': red,
    '--on-danger-button-background': darkgray,
    '--disabled-button-background': lightgray,
    '--on-disabled-button-background': white,

    '--nav-item-selected-background': foreground,
    '--on-nav-item-selected-background': white,
    '--nav-item-hover-background': foreground,
    '--on-nav-item-hover-background': white,

    '--spinner': foreground,
    '--progress-bar-element': gray,
    '--progress-bar-fill': foreground,

    '--scrollbar-track': white,
    '--scrollbar': foreground,
    '--scrollbar-thumb': foreground,

    '--drag-placeholder-background': white,
    '--drag-placeholder-border': foreground,

    '--arrow-background': lightgray,
    '--on-arrow-background': darkgray,

    '--selected-state-button-background': darkgray,
    '--on-selected-state-button-background': white,
    '--unselected-state-button-icon': gray,
    '--issue-state-card-background': lightgray,

    '--list-selected': black,

    '--error': red,
    '--on-error': white,
    '--okay': darkgreen,
    '--on-okay': white,

    '--warning': orange,
    '--on-warning': foreground,

    '--logo-font': 'Helvetica, sans-serif',
    '--banner-font': 'Helvetica, sans-serif',
    '--text-font': '"Times New Roman", serif',
    '--menu-font': 'Helvetica, sans-serif',
    '--user-font': 'Consolas, Courier, monospace'
  }
};