// @ts-check
//-----------------------------------------------------------------------------------------
//                                      SCRIPT
//-----------------------------------------------------------------------------------------

// Scopes all variables on page so that they don't become global (except functions)
(() => {
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

// Modals
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

// URLS
/**
 * Returns the URL Search Parameters
 * @returns {URLSearchParams} The URL parameters object
 */
function getURLParams() {
  return new URLSearchParams(window.location.search);
}

// Decks
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

// Cards
/**
 * Creates a new card and appends it to a deck
 */
function createNewCard() {
  const form = document.querySelector('#form-new_card');

  if (form instanceof HTMLFormElement) {
    handleCreateNewCardFormSubmission(form);
  }

  // If close button is clicked, close early
}

/**
 * Handles form submission, gathers input data, and updates the URL with the form data.
 * @param {HTMLFormElement} form
 */
function handleCreateNewCardFormSubmission(form) {
  const frontInput = document.querySelector('#front-of-card');
  const backInput = document.querySelector('#back-of-card');

  if (
    frontInput instanceof HTMLInputElement &&
    backInput instanceof HTMLInputElement
  ) {
    form.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();

        // Get the input values
        const frontText = frontInput.value.trim();
        const backText = backInput.value.trim();

        // Create a new URLSearchParams object and append the inputs
        const params = new URLSearchParams(window.location.search);
        params.set('front', frontText);
        params.set('back', backText);

        // Update the URL with the new parameters without reloading the page
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({ path: newUrl }, '', newUrl);

        closeModal('modal-new_card', 'form-new_card');
      },
      { once: true }
    );
  } else {
    console.error('Form inputs not found or not valid.');
  }
}
