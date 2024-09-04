// @ts-check
import { getURLParams } from './utils.js';

/**
 * Saves the new card to the 'database' then syncs to localStorage
 * @param {[{deck: string;card: {question: string;answer: string;}}]} allCards - Where the new card should be saved
 */
export function saveNewCard(allCards) {
  // add the card data to localStorage
  const params = getURLParams();
  const question = params.get('front');
  const answer = params.get('back');
  const chosenDeck = params.get('deck');

  if (question !== null && answer !== null && chosenDeck !== null) {
    const newCard = {
      deck: chosenDeck,
      card: {
        question,
        answer,
      },
    };

    // Update the in-memory array
    allCards.push(newCard);

    // Sync the array to localStorage
    localStorage.setItem('cards', JSON.stringify(allCards));
  }
}

/**
 * Loads all decks from local storage
 * Should create a default deck on page load if no decks exist
 * @param {string[]} allDecks - Where the decks should be saved
 */
export function loadAllDecks(allDecks) {
  const decks = localStorage.getItem('decks');

  if (decks) {
    try {
      // Attempt to parse the decks data
      allDecks = JSON.parse(decks);
    } catch (e) {
      console.error('Error parsing decks data from localStorage:', e);
      // If there's an error, initialize with the default deck
      allDecks = ['default'];
      localStorage.setItem('decks', JSON.stringify(allDecks));
    }
  } else {
    // Initialize with a default deck if no data exists
    allDecks = ['default'];
    localStorage.setItem('decks', JSON.stringify(allDecks));
  }
}

/**
 * Loads all cards from local storage into the allCards array
 * @param {[{deck: string;card: {question: string;answer: string;}}]} allCards - Where the new card should be loaded from
 */
export function loadAllCards(allCards) {
  const cards = localStorage.getItem('cards');

  if (cards) {
    try {
      // Attempt to parse the cards data
      allCards = JSON.parse(cards);
    } catch (e) {
      console.error('Error parsing cards data from localStorage:', e);
      // If there's an error, initialize with an empty array
      // @ts-ignore
      allCards = [];
      localStorage.setItem('cards', JSON.stringify(allCards));
    }
  } else {
    // Initialize with an empty array if no data exists
    // @ts-ignore
    allCards = [];
    localStorage.setItem('cards', JSON.stringify(allCards));
  }
}
