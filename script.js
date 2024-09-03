// @ts-check
//-----------------------------------------------------------------------------------------
//                                      SCRIPT
//-----------------------------------------------------------------------------------------
// In Memory Array, localStorage is synced to this
let allDecks = []; // string[]
let allCards = []; // {deck: string, card: {question:string, answer:string}}[]

// For scoping purposes
(() => {
  loadAllDecks();
  loadAllCards();
  initEventListeners();
})();

/**
 * Initializes event listeners on page load
 */
function initEventListeners() {
  const newCardButton = document.querySelector('.new-card-btn');
  const seeAllDecksButton = document.querySelector('.decks-btn');
  const closeNewCardModalButton = document.querySelector('.modal-close-btn');

  // allows the user to create a new card
  if (newCardButton instanceof HTMLButtonElement) {
    newCardButton.addEventListener('click', () => {
      openModal('modal-new_card');
      createNewCard();
    });
  } else {
    console.error('The clicked on element is not a button');
  }

  // allows the user to close the new card modal without submitting it
  if (closeNewCardModalButton instanceof HTMLButtonElement) {
    closeNewCardModalButton.addEventListener('click', () => {
      closeModal('modal-new_card', 'form-new_card');
    });
  } else {
    console.error('The clicked on element is not a button');
  }

  // allows the user to check all of their decks
  if (seeAllDecksButton instanceof HTMLButtonElement) {
    seeAllDecksButton.addEventListener('click', getAllDecks);
  } else {
    console.error('The clicked on element is not a button');
  }
}

//-----------------------------------------------------------------------------------------
//                                      FUNCTIONS
//-----------------------------------------------------------------------------------------

//^ MODALS
/**
 * Opens a specified modal
 * Don't add the # as this function assumes an ID
 * @param {string} modalID
 * @returns {void}
 */
function openModal(modalID) {
  const modal = document.querySelector(`#${modalID}`);

  if (modal instanceof HTMLDivElement) {
    modal.classList.remove('hidden');
  } else {
    console.error(`Modal with ID ${modalID} not found.`);
  }
}

/**
 * Closes a specified modal and resets the form if any.
 * Also, it attaches an event listener to the close button.
 * Don't add the # as this function assumes an ID
 * @param {string} modalID
 * @param {string?} formID
 * @returns {void}
 */
function closeModal(modalID, formID) {
  const modal = document.querySelector(`#${modalID}`);
  const form = document.querySelector(`#${formID}`);

  if (form instanceof HTMLFormElement) {
    form.reset();
  }

  if (modal instanceof HTMLDivElement) {
    const closeModalBtn = modal.querySelector('.modal-close-btn');

    if (closeModalBtn instanceof HTMLButtonElement) {
      modal.classList.add('hidden');
    } else {
      console.error('Close button not found or is not a button.');
    }
  } else {
    console.error(`Modal with ID ${modalID} not found.`);
  }
}

//^ URLS
/**
 * Returns the URL Search Parameters
 * @returns {URLSearchParams} The URL parameters object
 */
function getURLParams() {
  return new URLSearchParams(window.location.search);
}

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
  } else {
    console.error("This isn't a form element");
  }
}

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

        saveNewCard();

        // append the new card
        const playArea = document.querySelector('.play-area');

        if (playArea instanceof HTMLDivElement) {
          appendTemplate(playArea, frontCardTemplate, 'First Question');
          appendTemplate(playArea, backCardTemplate, 'First Answer');
        }
      },
      { once: true }
    );
  } else {
    console.error('Form inputs not found or not valid.');
  }
}

//^ LOCAL STORAGE
/**
 * Saves the new card to the in memory array then syncs to localStorage
 */
function saveNewCard() {
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
 */
function loadAllDecks() {
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
 */
function loadAllCards() {
  const cards = localStorage.getItem('cards');

  if (cards) {
    try {
      // Attempt to parse the cards data
      allCards = JSON.parse(cards);
    } catch (e) {
      console.error('Error parsing cards data from localStorage:', e);
      // If there's an error, initialize with an empty array
      allCards = [];
      localStorage.setItem('cards', JSON.stringify(allCards));
    }
  } else {
    // Initialize with an empty array if no data exists
    allCards = [];
    localStorage.setItem('cards', JSON.stringify(allCards));
  }
}

//^ TEMPLATES
/**
 * This is a template for the front of the flash card
 * @param {string} question - The question being asked
 * @returns {HTMLElement | null}
 */
function frontCardTemplate(question) {
  const template = document.getElementById('card-front-template');

  if (template instanceof HTMLTemplateElement) {
    const node = template.content.cloneNode(true);
    // @ts-ignore
    const element = node.firstElementChild;

    if (element instanceof HTMLElement) {
      const [cardQuestion] = element.getElementsByTagName('p');
      if (cardQuestion) {
        cardQuestion.textContent = question;
        return element;
      } else {
        console.error('No <p> element found in the template.');
        return null;
      }
    } else {
      console.error('First element child is not an HTMLElement.');
      return null;
    }
  } else {
    console.error(
      'Template with ID card-front-template not found or is not an HTMLTemplateElement.'
    );
    return null;
  }
}

/**
 * This is a template for the back of the flash card
 * @param {string} answer - The answer to the question on the front of the flash card
 */
function backCardTemplate(answer) {
  const template = document.getElementById('card-back-template');

  if (template instanceof HTMLTemplateElement) {
    const node = template.content.cloneNode(true);
    // @ts-ignore
    const element = node.firstElementChild;

    if (element instanceof HTMLElement) {
      const [cardQuestion] = element.getElementsByTagName('p');
      if (cardQuestion) {
        cardQuestion.textContent = answer;
        return element;
      } else {
        console.error('No <p> element found in the template.');
        return null;
      }
    } else {
      console.error('First element child is not an HTMLElement.');
      return null;
    }
  } else {
    console.error(
      'Template with ID card-front-template not found or is not an HTMLTemplateElement.'
    );
    return null;
  }
}

/**
 * This will take a flash card template and append it to a specified container
 * @param {HTMLElement} container - The container to append the template to
 * @param {function} template - The template creation function
 * @param {string} text - The text content of the element
 */
function appendTemplate(container, template, text) {
  const cardElement = template(text);

  if (cardElement) {
    container.appendChild(cardElement);
  } else {
    console.error('Failed to create the element.');
  }
}

//^ BATCH INSERTS
// const fragment = document.createDocumentFragment();
// for (let i = 0; i < 1000; i++) {
//   const li = document.createElement('li');
//   li.textContent = `Item ${i}`;
//   fragment.appendChild(li);
// }
// document.getElementById('myList').appendChild(fragment);
