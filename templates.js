/**
 * This is a template for the front of the flash card
 * @param {string} question - The question being asked
 * @returns {HTMLElement | null}
 */
export function frontCardTemplate(question) {
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
export function backCardTemplate(answer) {
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
export function appendTemplate(container, template, text) {
  const cardElement = template(text);

  if (cardElement) {
    container.appendChild(cardElement);
  } else {
    console.error('Failed to create the element.');
  }
}
