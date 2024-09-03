// @ts-check
(() => {
  const newCardButton = document.querySelector('.new-card-btn');

  // WHEN USER CLICKS CREATE NEW CARD BUTTON, OPEN MODAL
  if (newCardButton instanceof HTMLButtonElement) {
    newCardButton.addEventListener('click', createNewCard);
  } else {
    console.error('The clicked on element is not a button');
  }

  // CREATE THE NEW CARD
})();

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
  const form = document.querySelector(`#${formID}`);

  // if this modal has a form, its input fields will be reset
  if (form instanceof HTMLFormElement) {
    form.reset();
  }

  if (modal instanceof HTMLDivElement) {
    modal.classList.add('hidden');
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
  }
}
