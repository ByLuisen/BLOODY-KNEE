<!doctype html>
<html lang="en" class="scroll-smooth" data-critters-container>

<head>
    <meta charset="utf-8">
    <title>Bloody Knee</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <style type="text/css">
        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fCRc4AMP6lbBP.woff2) format('woff2');
            unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fABc4AMP6lbBP.woff2) format('woff2');
            unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fCBc4AMP6lbBP.woff2) format('woff2');
            unicode-range: U+1F00-1FFF;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fBxc4AMP6lbBP.woff2) format('woff2');
            unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fCxc4AMP6lbBP.woff2) format('woff2');
            unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fChc4AMP6lbBP.woff2) format('woff2');
            unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fBBc4AMP6lQ.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2) format('woff2');
            unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu5mxKKTU1Kvnz.woff2) format('woff2');
            unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu7mxKKTU1Kvnz.woff2) format('woff2');
            unicode-range: U+1F00-1FFF;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4WxKKTU1Kvnz.woff2) format('woff2');
            unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu7WxKKTU1Kvnz.woff2) format('woff2');
            unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.woff2) format('woff2');
            unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fCRc4AMP6lbBP.woff2) format('woff2');
            unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fABc4AMP6lbBP.woff2) format('woff2');
            unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fCBc4AMP6lbBP.woff2) format('woff2');
            unicode-range: U+1F00-1FFF;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBxc4AMP6lbBP.woff2) format('woff2');
            unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fCxc4AMP6lbBP.woff2) format('woff2');
            unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fChc4AMP6lbBP.woff2) format('woff2');
            unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
    </style>
    <style type="text/css">
        @font-face {
            font-family: 'Material Icons';
            font-style: normal;
            font-weight: 400;
            src: url(https://fonts.gstatic.com/s/materialicons/v142/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
        }

        .material-icons {
            font-family: 'Material Icons';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
        }
    </style>
    <style>
        @import"https://fonts.googleapis.com/css2?family=Aclonica&display=swap";

        html {
            --mat-option-selected-state-label-text-color: #3f51b5;
            --mat-option-label-text-color: rgba(0, 0, 0, .87);
            --mat-option-hover-state-layer-color: rgba(0, 0, 0, .04);
            --mat-option-focus-state-layer-color: rgba(0, 0, 0, .04);
            --mat-option-selected-state-layer-color: rgba(0, 0, 0, .04)
        }

        html {
            --mat-optgroup-label-text-color: rgba(0, 0, 0, .87)
        }

        html {
            --mdc-filled-text-field-caret-color: #3f51b5;
            --mdc-filled-text-field-focus-active-indicator-color: #3f51b5;
            --mdc-filled-text-field-focus-label-text-color: rgba(63, 81, 181, .87);
            --mdc-filled-text-field-container-color: whitesmoke;
            --mdc-filled-text-field-disabled-container-color: #fafafa;
            --mdc-filled-text-field-label-text-color: rgba(0, 0, 0, .6);
            --mdc-filled-text-field-disabled-label-text-color: rgba(0, 0, 0, .38);
            --mdc-filled-text-field-input-text-color: rgba(0, 0, 0, .87);
            --mdc-filled-text-field-disabled-input-text-color: rgba(0, 0, 0, .38);
            --mdc-filled-text-field-input-text-placeholder-color: rgba(0, 0, 0, .6);
            --mdc-filled-text-field-error-focus-label-text-color: #f44336;
            --mdc-filled-text-field-error-label-text-color: #f44336;
            --mdc-filled-text-field-error-caret-color: #f44336;
            --mdc-filled-text-field-active-indicator-color: rgba(0, 0, 0, .42);
            --mdc-filled-text-field-disabled-active-indicator-color: rgba(0, 0, 0, .06);
            --mdc-filled-text-field-hover-active-indicator-color: rgba(0, 0, 0, .87);
            --mdc-filled-text-field-error-active-indicator-color: #f44336;
            --mdc-filled-text-field-error-focus-active-indicator-color: #f44336;
            --mdc-filled-text-field-error-hover-active-indicator-color: #f44336;
            --mdc-outlined-text-field-caret-color: #3f51b5;
            --mdc-outlined-text-field-focus-outline-color: #3f51b5;
            --mdc-outlined-text-field-focus-label-text-color: rgba(63, 81, 181, .87);
            --mdc-outlined-text-field-label-text-color: rgba(0, 0, 0, .6);
            --mdc-outlined-text-field-disabled-label-text-color: rgba(0, 0, 0, .38);
            --mdc-outlined-text-field-input-text-color: rgba(0, 0, 0, .87);
            --mdc-outlined-text-field-disabled-input-text-color: rgba(0, 0, 0, .38);
            --mdc-outlined-text-field-input-text-placeholder-color: rgba(0, 0, 0, .6);
            --mdc-outlined-text-field-error-caret-color: #f44336;
            --mdc-outlined-text-field-error-focus-label-text-color: #f44336;
            --mdc-outlined-text-field-error-label-text-color: #f44336;
            --mdc-outlined-text-field-outline-color: rgba(0, 0, 0, .38);
            --mdc-outlined-text-field-disabled-outline-color: rgba(0, 0, 0, .06);
            --mdc-outlined-text-field-hover-outline-color: rgba(0, 0, 0, .87);
            --mdc-outlined-text-field-error-focus-outline-color: #f44336;
            --mdc-outlined-text-field-error-hover-outline-color: #f44336;
            --mdc-outlined-text-field-error-outline-color: #f44336;
            --mat-form-field-disabled-input-text-placeholder-color: rgba(0, 0, 0, .38)
        }

        html {
            --mat-select-panel-background-color: white;
            --mat-select-enabled-trigger-text-color: rgba(0, 0, 0, .87);
            --mat-select-disabled-trigger-text-color: rgba(0, 0, 0, .38);
            --mat-select-placeholder-text-color: rgba(0, 0, 0, .6);
            --mat-select-enabled-arrow-color: rgba(0, 0, 0, .54);
            --mat-select-disabled-arrow-color: rgba(0, 0, 0, .38);
            --mat-select-focused-arrow-color: rgba(63, 81, 181, .87);
            --mat-select-invalid-arrow-color: rgba(244, 67, 54, .87)
        }

        html {
            --mat-autocomplete-background-color: white
        }

        html {
            --mat-menu-item-label-text-color: rgba(0, 0, 0, .87);
            --mat-menu-item-icon-color: rgba(0, 0, 0, .87);
            --mat-menu-item-hover-state-layer-color: rgba(0, 0, 0, .04);
            --mat-menu-item-focus-state-layer-color: rgba(0, 0, 0, .04);
            --mat-menu-container-color: white
        }

        html {
            --mat-paginator-container-text-color: rgba(0, 0, 0, .87);
            --mat-paginator-container-background-color: white;
            --mat-paginator-enabled-icon-color: rgba(0, 0, 0, .54);
            --mat-paginator-disabled-icon-color: rgba(0, 0, 0, .12);
            --mat-paginator-container-size: 56px
        }

        html {
            --mdc-checkbox-disabled-selected-icon-color: rgba(0, 0, 0, .38);
            --mdc-checkbox-disabled-unselected-icon-color: rgba(0, 0, 0, .38);
            --mdc-checkbox-selected-checkmark-color: #fff;
            --mdc-checkbox-selected-focus-icon-color: #ff4081;
            --mdc-checkbox-selected-hover-icon-color: #ff4081;
            --mdc-checkbox-selected-icon-color: #ff4081;
            --mdc-checkbox-selected-pressed-icon-color: #ff4081;
            --mdc-checkbox-unselected-focus-icon-color: #212121;
            --mdc-checkbox-unselected-hover-icon-color: #212121;
            --mdc-checkbox-unselected-icon-color: rgba(0, 0, 0, .54);
            --mdc-checkbox-unselected-pressed-icon-color: rgba(0, 0, 0, .54);
            --mdc-checkbox-selected-focus-state-layer-color: #ff4081;
            --mdc-checkbox-selected-hover-state-layer-color: #ff4081;
            --mdc-checkbox-selected-pressed-state-layer-color: #ff4081;
            --mdc-checkbox-unselected-focus-state-layer-color: black;
            --mdc-checkbox-unselected-hover-state-layer-color: black;
            --mdc-checkbox-unselected-pressed-state-layer-color: black
        }

        html {
            --mdc-checkbox-state-layer-size: 40px
        }

        html {
            --mat-table-background-color: white;
            --mat-table-header-headline-color: rgba(0, 0, 0, .87);
            --mat-table-row-item-label-text-color: rgba(0, 0, 0, .87);
            --mat-table-row-item-outline-color: rgba(0, 0, 0, .12);
            --mat-table-header-container-height: 56px;
            --mat-table-footer-container-height: 52px;
            --mat-table-row-item-container-height: 52px
        }

        html {
            --mat-badge-background-color: #3f51b5;
            --mat-badge-text-color: white;
            --mat-badge-disabled-state-background-color: #b9b9b9;
            --mat-badge-disabled-state-text-color: rgba(0, 0, 0, .38)
        }

        html {
            --mat-bottom-sheet-container-text-color: rgba(0, 0, 0, .87);
            --mat-bottom-sheet-container-background-color: white;
            --mat-legacy-button-toggle-text-color: rgba(0, 0, 0, .38);
            --mat-legacy-button-toggle-state-layer-color: rgba(0, 0, 0, .12);
            --mat-legacy-button-toggle-selected-state-text-color: rgba(0, 0, 0, .54);
            --mat-legacy-button-toggle-selected-state-background-color: #e0e0e0;
            --mat-legacy-button-toggle-disabled-state-text-color: rgba(0, 0, 0, .26);
            --mat-legacy-button-toggle-disabled-state-background-color: #eeeeee;
            --mat-legacy-button-toggle-disabled-selected-state-background-color: #bdbdbd;
            --mat-standard-button-toggle-text-color: rgba(0, 0, 0, .87);
            --mat-standard-button-toggle-background-color: white;
            --mat-standard-button-toggle-state-layer-color: black;
            --mat-standard-button-toggle-selected-state-background-color: #e0e0e0;
            --mat-standard-button-toggle-selected-state-text-color: rgba(0, 0, 0, .87);
            --mat-standard-button-toggle-disabled-state-text-color: rgba(0, 0, 0, .26);
            --mat-standard-button-toggle-disabled-state-background-color: white;
            --mat-standard-button-toggle-disabled-selected-state-text-color: rgba(0, 0, 0, .87);
            --mat-standard-button-toggle-disabled-selected-state-background-color: #bdbdbd;
            --mat-standard-button-toggle-divider-color: #e0e0e0;
            --mat-standard-button-toggle-height: 48px;
            --mat-datepicker-calendar-date-selected-state-text-color: white;
            --mat-datepicker-calendar-date-selected-state-background-color: #3f51b5;
            --mat-datepicker-calendar-date-selected-disabled-state-background-color: rgba(63, 81, 181, .4);
            --mat-datepicker-calendar-date-today-selected-state-outline-color: white;
            --mat-datepicker-calendar-date-focus-state-background-color: rgba(63, 81, 181, .3);
            --mat-datepicker-calendar-date-hover-state-background-color: rgba(63, 81, 181, .3);
            --mat-datepicker-toggle-active-state-icon-color: #3f51b5;
            --mat-datepicker-calendar-date-in-range-state-background-color: rgba(63, 81, 181, .2);
            --mat-datepicker-calendar-date-in-comparison-range-state-background-color: rgba(249, 171, 0, .2);
            --mat-datepicker-calendar-date-in-overlap-range-state-background-color: #a8dab5;
            --mat-datepicker-calendar-date-in-overlap-range-selected-state-background-color: #46a35e;
            --mat-datepicker-toggle-icon-color: rgba(0, 0, 0, .54);
            --mat-datepicker-calendar-body-label-text-color: rgba(0, 0, 0, .54);
            --mat-datepicker-calendar-period-button-icon-color: rgba(0, 0, 0, .54);
            --mat-datepicker-calendar-navigation-button-icon-color: rgba(0, 0, 0, .54);
            --mat-datepicker-calendar-header-divider-color: rgba(0, 0, 0, .12);
            --mat-datepicker-calendar-header-text-color: rgba(0, 0, 0, .54);
            --mat-datepicker-calendar-date-today-outline-color: rgba(0, 0, 0, .38);
            --mat-datepicker-calendar-date-today-disabled-state-outline-color: rgba(0, 0, 0, .18);
            --mat-datepicker-calendar-date-text-color: rgba(0, 0, 0, .87);
            --mat-datepicker-calendar-date-outline-color: transparent;
            --mat-datepicker-calendar-date-disabled-state-text-color: rgba(0, 0, 0, .38);
            --mat-datepicker-calendar-date-preview-state-outline-color: rgba(0, 0, 0, .24);
            --mat-datepicker-range-input-separator-color: rgba(0, 0, 0, .87);
            --mat-datepicker-range-input-disabled-state-separator-color: rgba(0, 0, 0, .38);
            --mat-datepicker-range-input-disabled-state-text-color: rgba(0, 0, 0, .38);
            --mat-datepicker-calendar-container-background-color: white;
            --mat-datepicker-calendar-container-text-color: rgba(0, 0, 0, .87)
        }

        html {
            --mat-divider-color: rgba(0, 0, 0, .12);
            --mat-expansion-container-background-color: white;
            --mat-expansion-container-text-color: rgba(0, 0, 0, .87);
            --mat-expansion-actions-divider-color: rgba(0, 0, 0, .12);
            --mat-expansion-header-hover-state-layer-color: rgba(0, 0, 0, .04);
            --mat-expansion-header-focus-state-layer-color: rgba(0, 0, 0, .04);
            --mat-expansion-header-disabled-state-text-color: rgba(0, 0, 0, .26);
            --mat-expansion-header-text-color: rgba(0, 0, 0, .87);
            --mat-expansion-header-description-color: rgba(0, 0, 0, .54);
            --mat-expansion-header-indicator-color: rgba(0, 0, 0, .54);
            --mat-expansion-header-collapsed-state-height: 48px;
            --mat-expansion-header-expanded-state-height: 64px;
            --mat-icon-color: inherit
        }

        html {
            --mat-sidenav-container-divider-color: rgba(0, 0, 0, .12);
            --mat-sidenav-container-background-color: white;
            --mat-sidenav-container-text-color: rgba(0, 0, 0, .87);
            --mat-sidenav-content-background-color: #fafafa;
            --mat-sidenav-content-text-color: rgba(0, 0, 0, .87);
            --mat-sidenav-scrim-color: rgba(0, 0, 0, .6);
            --mat-stepper-header-icon-foreground-color: white;
            --mat-stepper-header-selected-state-icon-background-color: #3f51b5;
            --mat-stepper-header-selected-state-icon-foreground-color: white;
            --mat-stepper-header-done-state-icon-background-color: #3f51b5;
            --mat-stepper-header-done-state-icon-foreground-color: white;
            --mat-stepper-header-edit-state-icon-background-color: #3f51b5;
            --mat-stepper-header-edit-state-icon-foreground-color: white;
            --mat-stepper-container-color: white;
            --mat-stepper-line-color: rgba(0, 0, 0, .12);
            --mat-stepper-header-hover-state-layer-color: rgba(0, 0, 0, .04);
            --mat-stepper-header-focus-state-layer-color: rgba(0, 0, 0, .04);
            --mat-stepper-header-label-text-color: rgba(0, 0, 0, .54);
            --mat-stepper-header-optional-label-text-color: rgba(0, 0, 0, .54);
            --mat-stepper-header-selected-state-label-text-color: rgba(0, 0, 0, .87);
            --mat-stepper-header-error-state-label-text-color: #f44336;
            --mat-stepper-header-icon-background-color: rgba(0, 0, 0, .54);
            --mat-stepper-header-error-state-icon-foreground-color: #f44336;
            --mat-stepper-header-error-state-icon-background-color: transparent
        }

        html {
            --mat-stepper-header-height: 72px
        }

        html {
            --mat-toolbar-container-background-color: whitesmoke;
            --mat-toolbar-container-text-color: rgba(0, 0, 0, .87)
        }

        html {
            --mat-toolbar-standard-height: 64px;
            --mat-toolbar-mobile-height: 56px
        }

        *,
        :before,
        :after {
            box-sizing: border-box;
            border-width: 0;
            border-style: solid;
            border-color: #e5e7eb
        }

        :before,
        :after {
            --tw-content: ""
        }

        html {
            line-height: 1.5;
            -webkit-text-size-adjust: 100%;
            tab-size: 4;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, system-ui, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
            font-feature-settings: normal;
            font-variation-settings: normal;
            -webkit-tap-highlight-color: transparent
        }

        body {
            margin: 0;
            line-height: inherit
        }

        *,
        :before,
        :after {
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-pan-x: ;
            --tw-pan-y: ;
            --tw-pinch-zoom: ;
            --tw-scroll-snap-strictness: proximity;
            --tw-gradient-from-position: ;
            --tw-gradient-via-position: ;
            --tw-gradient-to-position: ;
            --tw-ordinal: ;
            --tw-slashed-zero: ;
            --tw-numeric-figure: ;
            --tw-numeric-spacing: ;
            --tw-numeric-fraction: ;
            --tw-ring-inset: ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgb(63 131 248 / .5);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-blur: ;
            --tw-brightness: ;
            --tw-contrast: ;
            --tw-grayscale: ;
            --tw-hue-rotate: ;
            --tw-invert: ;
            --tw-saturate: ;
            --tw-sepia: ;
            --tw-drop-shadow: ;
            --tw-backdrop-blur: ;
            --tw-backdrop-brightness: ;
            --tw-backdrop-contrast: ;
            --tw-backdrop-grayscale: ;
            --tw-backdrop-hue-rotate: ;
            --tw-backdrop-invert: ;
            --tw-backdrop-opacity: ;
            --tw-backdrop-saturate: ;
            --tw-backdrop-sepia: ;
            --tw-contain-size: ;
            --tw-contain-layout: ;
            --tw-contain-paint: ;
            --tw-contain-style:
        }

        .scroll-smooth {
            scroll-behavior: smooth
        }

        html,
        body {
            height: 100%
        }

        body {
            margin: 0;
            font-family: Roboto, Helvetica Neue, sans-serif
        }
    </style>
    <link rel="stylesheet" href="styles.9792daac2e800c47.css" media="print" onload="this.media='all'"><noscript>
        <link rel="stylesheet" href="styles.9792daac2e800c47.css">
    </noscript>
</head>

<body>
    <app-root></app-root>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
    <script src="runtime.89bfad0fe920d2c9.js" type="module"></script>
    <script src="polyfills.f42e8324c5c7cbb0.js" type="module"></script>
    <script src="scripts.85a3dc3291b06442.js" defer></script>
    <script src="main.42072f240fab1f44.js" type="module"></script>
</body>

</html>
