// @ts-check
//-----------------------------------------------------------------------------------------
//                                      IMPORTS
//-----------------------------------------------------------------------------------------
import { openModal, closeModal } from './modal.js';
import { loadAllCards, loadAllDecks, saveNewCard } from './localStorage.js';
import {
  backCardTemplate,
  frontCardTemplate,
  appendTemplate,
} from './templates.js';

//-----------------------------------------------------------------------------------------
//                                      SCRIPT
//-----------------------------------------------------------------------------------------
// In Memory Array, localStorage is synced to this
let allDecks = []; // string[]
let allCards = []; // {deck: string, card: {question:string, answer:string}}[]

// For scoping purposes
(() => {
  loadAllDecks(allDecks);
  // @ts-ignore
  loadAllCards(allCards);
  initEventListeners();
})();

/**
 * Initializes event listeners on page load
 */
function initEventListeners() {
  const newCardButton = document.querySelector('.new-card-btn');
  const seeAllDecksButton = document.querySelector('.decks-btn');

  // allows the user to create a new card
  if (newCardButton instanceof HTMLButtonElement) {
    newCardButton.addEventListener('click', () => {
      openModal('modal-new_card');
      createNewCard();
    });
  } else {
    console.error('The New Card Button is not of type button!');
  }

  // allows the user to check all of their decks
  if (seeAllDecksButton instanceof HTMLButtonElement) {
    seeAllDecksButton.addEventListener('click', getAllDecks);
  } else {
    console.error('The see all decks button is not of type button');
  }
}

//-----------------------------------------------------------------------------------------
//                                      FUNCTIONS
//-----------------------------------------------------------------------------------------

//^ DECKS
/**
 * Gets the currently used deck.
 * Defaults to "default deck"
 */
function getCurrentDeck() {}

/**
 * Returns an array of all decks
 * @returns {string[]}
 */
function getAllDecks() {
  console.log('Does nothing for now');
  return [];
}

//^ CARDS
/**
 * Creates a new card and appends it to a deck
 */
function createNewCard() {
  const form = document.querySelector('#form-new_card');

  // send form data to URL
  if (form instanceof HTMLFormElement) {
    handleCreateNewCardFormSubmission(form);

    // @ts-ignore
    saveNewCard(allCards);

    // append the new card
    const playArea = document.querySelector('.play-area');

    if (playArea instanceof HTMLDivElement) {
      appendTemplate(playArea, frontCardTemplate, 'First Question');
      appendTemplate(playArea, backCardTemplate, 'First Answer');
    }
  } else {
    console.error("This isn't a form element");
  }
}

//^ FORM SUBMISSIONS
/**
 * Handles form submission, gathers input data, and updates the URL with the form data.
 * @param {HTMLFormElement} form
 */
function handleCreateNewCardFormSubmission(form) {
  const frontInput = document.querySelector('#front-of-card');
  const backInput = document.querySelector('#back-of-card');
  const deckSelect = document.querySelector('#all-decks');

  if (
    frontInput instanceof HTMLInputElement &&
    backInput instanceof HTMLInputElement &&
    deckSelect instanceof HTMLSelectElement
  ) {
    form.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();

        // Get the input values
        const frontText = frontInput.value.trim();
        const backText = backInput.value.trim();
        const selectedDeck = deckSelect.value;

        // Create a new URLSearchParams object and append the inputs
        const params = new URLSearchParams(window.location.search);
        params.set('front', frontText);
        params.set('back', backText);
        params.set('deck', selectedDeck);

        // Update the URL with the new parameters without reloading the page
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({ path: newUrl }, '', newUrl);

        // Close the modal after form submission
        closeModal('modal-new_card', 'form-new_card');
      },
      { once: true }
    );
  } else {
    console.error('Form inputs not found or not valid.');
  }
}

//^ BATCH INSERTS
/**
 * This function will take any number of cards and decks and batch insert them on page load
 */
function batchInsert() {}
// const fragment = document.createDocumentFragment();
// for (let i = 0; i < 1000; i++) {
//   const li = document.createElement('li');
//   li.textContent = `Item ${i}`;
//   fragment.appendChild(li);
// }
// document.getElementById('myList').appendChild(fragment);
