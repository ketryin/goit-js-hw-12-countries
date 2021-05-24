import '../css/styles.css';
import countryCardTpl from '../templates/country-card.hbs';
import listItemTpl from '../templates/list-item.hbs';
import fetchCountries from './fetchCountries';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';

import { alert, error, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});
const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(event) {
    const inputValue = event.target.value;
    if (inputValue != '') {
        fetchCountries(inputValue)
            .then(renderCountry);
    }
    
    const itemsSearch = document.querySelectorAll('.list-searchCountry-items');
    const card = document.querySelector('.card');

    itemsSearch.forEach(item => item.remove());

    if (card != null) {
        card.remove();
    }
}

function renderCountry(countries) {
    if (countries.length === 1) {
        const markup = countryCardTpl(countries[0]);
        refs.cardContainer.innerHTML = markup;
    } else if (countries.length >= 2 && countries.length <= 10) {
        const markup2 = countries.map(listItemTpl).join('');
        refs.listSearch.insertAdjacentHTML('afterbegin', markup2);


    } else if (countries.length >10) {
        error({
            title: 'Oh No!',
            text: 'Enter more characters'
        });
    }
}

