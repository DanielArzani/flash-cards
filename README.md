# Flash Cards App

## USER STORIES

When I go to the application site I will

- See a page with a button to add a card my decks that contain the list of cards if any

When I click on the Add a Card button then

- A modal with form shows up where I can enter whats on the front and back of the card
- A save button to save it to local storage

When I click on Decks

- I will see my available decks of which I can choose one
- If I have none then I can create a new deck

After choosing a deck

- I can create new cards if required
- If I'm satisfied with my cards I can click on Play to start

After clicking on the Play button then

- The first card created will show up and I can answer it to myself (not by writing it down on the screen as an answer)
- I can click on the card to see the answer

After seeing the answer

- Control option buttons will appear underneath
- If I had gotten it incorrect I will click on the Incorrect button
- If I had gotten it incorrect once before but correct this time, I will click on the re-done button
- If I had gotten it correct on the first try then I will click on the Correct button

After clicking on one of the buttons (except the Incorrect one) the next card should come

- Until the review is completed

The correctly answered cards will have a time set for 1 day later, if correct then too then it will double (i.e. 2 days later, 4 days, etc...)

The incorrectly answered cards will have their time set back down to 1 day no matter at what point they were

For now the limit of the days will be 7

## Notes

- Use [this](https://frontendmasters.com/blog/patterns-for-memory-efficient-dom-manipulation/) site as a reference for faster DOM manipulation
