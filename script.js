// @ts-check
(() => {
  initEventListeners();
})();

/**
 * Initializes event listeners on page load
 */
function initEventListeners() {
  const newCardButton = document.querySelector('.new-card-btn');

  if (newCardButton instanceof HTMLButtonElement) {
    newCardButton.addEventListener('click', createNewCard);
  } else {
    console.error('The clicked element is not a button');
  }
}

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
 * Closes a specified modal and resets the form if any
 * Don't add the # as this function assumes an ID
 * @param {string} modalID
 * @param {string?} formID
 * @returns {void}
 */
function closeModal(modalID, formID) {
  const modal = document.querySelector(`#${modalID}`);
  const form = formID ? document.querySelector(`#${formID}`) : null;

  if (form instanceof HTMLFormElement) {
    form.reset();
  }

  if (modal instanceof HTMLDivElement) {
    modal.classList.add('hidden');
  } else {
    console.error(`Modal with ID ${modalID} not found.`);
  }
}

/**
 * Creates a new card and appends it to a deck
 */
function createNewCard() {
  openModal('modal-new_card');

  const closeModalBtn = document.querySelector('.modal-close-btn');

  if (closeModalBtn instanceof HTMLButtonElement) {
    closeModalBtn.addEventListener(
      'click',
      () => {
        closeModal('modal-new_card', 'form-new_card');
      },
      { once: true }
    );
  } else {
    console.error('Close button not found or is not a button.');
  }
}
