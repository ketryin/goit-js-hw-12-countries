import '../css/styles.css';
import countryCardTpl from '../templates/country-card.hbs';
import listItemTpl from '../templates/list-item.hbs';
import fetchCountries from './fetchCountries';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';

import { notice, error, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';;
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});
const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(event) {
    const inputValue = event.target.value;
    refs.cardContainer.innerHTML = '';

    if (inputValue != '') {
        fetchCountries(inputValue)
            .then(renderCountry)
            .catch(errorMessage);
    }
}

function renderCountry(countries) {
    
    if (countries.length === 1) {
        const markup = countryCardTpl(countries[0]);
        refs.cardContainer.innerHTML = markup;
    } else if (countries.length >= 2 && countries.length <= 10) {
        const markup2 = listItemTpl(countries);
        refs.cardContainer.innerHTML = markup2;
    } else if (countries.length >10) {
        notice({
            title: 'Oh No!',
            text: 'Enter more characters'
        });
    }
}

function errorMessage() {
    error({
        title: 'Oh No!',
        text: 'Invalid entered value. Try again'
    });   
}
