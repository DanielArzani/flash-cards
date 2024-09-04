// @ts-check

/**
 * Opens a specified modal
 * Don't add the # as this function assumes an ID
 * @param {string} modalID
 * @returns {void}
 */
export function openModal(modalID) {
  const modal = document.querySelector(`#${modalID}`);
  const closeNewCardModalButton = document.querySelector('.modal-close-btn');

  if (modal instanceof HTMLDivElement) {
    modal.classList.remove('hidden');

    // allows the user to close the new card modal without submitting it
    // this isn't put in the close modal function because it would require 2 clicks in order to close the modal since the event listener would have to be added first then it would have to hear the click event again
    if (closeNewCardModalButton instanceof HTMLButtonElement) {
      closeNewCardModalButton.addEventListener('click', () => {
        closeModal('modal-new_card', 'form-new_card');
      });
    } else {
      console.error('There is a problem with the close Modal Button');
    }
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
export function closeModal(modalID, formID) {
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
