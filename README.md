# Stud-Ease
 Flashcard app that helps the user study.
I used a total of five screens which can be seen used in the App.js file code from lines 21-103. I created TopicsScreen.js and AddDeckScreen.js to be apart of the homescreen in App.js file so when you open the app you will be initially routed at the TopicsScreen, and will have a visible top navigation that is easy to switch between the screens. The other three screens (Deck.js, NewCard.js, and Quiz.js) can be navigated depending on what the user clicks on. 

AddDeckScreen.js allows the user to add and give a title to a deck of cards which will be placed in their TopicScreen. The Topic.js file will then display the deck of cards for the user to see and they can enter it which will lead them to Deck.js. The user then has to input card information in the NewCar.js which will ask them to input both a question and answer and give a warning if no input was entered. Once there are cards added to the deck the user can view cards which will lead them to a page where they can see both the question and answers, or they can press on start quiz which will take them to Quiz.js. Quiz.js will allow the user to see a question, flip the card and pick a button for if they got the answer wrong or right. At the end of the quiz there will be a summary that lets the user know if they passed or failed the quiz and gives the option to leave or retake the quiz.

I used 3 main components for this code which are Answer.js, Questions.js, and Functions.js. Answer.js allows the user to pick answers and check if they got it wrong or right. Questions.js lets the user see the question. And functions have a couple components within the file that allows the app to work as a whole. It has an async function that stores the flashcards the user has created, it retrieves the decks and specific decks with async and also helps merge information so when the user input data it will store in the specific decks such as deckTitle, question, and answers.


Functions.js was used in multiple files since some of the components needed to be used in multiple files. Most of my inputs come from NewCard.js file. I use states in Deck.js line 8-12, NewCard.js I also use state in multple lines of code in order for users to have to input information in for their questions, and answers and if not ot will give an alert.