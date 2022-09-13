import './css/styles.css';
import { fetchCountries } from './JS/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryDesc = document.querySelector('.country-info')

console.log(input);

input.addEventListener('input', debounce((event) => {
    fetchCountries(event.target.value)
        .then(countries => {
            if(event.target.value === ''){
                return countryDesc.innerHTML = '';
            };
            return countriesMarkup(countries)})
        .catch(error => console.log(error));
}, 300));

function countriesMarkup(countries) {
    console.log(countries);
    const markup = countries.map(country => {
        return `
        <img src="${country.flags.svg}" alt="flag" width="50">
        <h1 class="title">${country.name}</h1>
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> ${country.languages[0].name}</p>`;
    }
    ).join('');
    countryDesc.innerHTML = markup;
}