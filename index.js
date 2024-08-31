/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  const gamesContainer = document.getElementById("games-container");

  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    gameCard.innerHTML = `
      <img src="${game.img}" alt="${game.name}" class="game-img">
      <h2>${game.name}</h2>
      <p>${game.description}</p>
      <p>Pledged: $${game.pledged.toLocaleString()}</p>
      <p>Goal: $${game.goal.toLocaleString()}</p>
      <p>Backers: ${game.backers.toLocaleString()}</p>
    `;

    gamesContainer.appendChild(gameCard);
  }
}

// Call the addGamesToPage function with the GAMES_JSON array
addGamesToPage(GAMES_JSON);

// create a new div element, which will become the game card

// add the class game-card to the list

// set the inner HTML using a template literal to display some info
// about each game
// TIP: if your images are not displaying, make sure there is space
// between the end of the src attribute and the end of the tag ("/>")

// append the game to the games-container

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
  return total + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((total, game) => {
  return total + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalgames = GAMES_JSON.length;

// set inner HTML using template literal
gamesCard.innerHTML = `${totalgames.toLocaleString()}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // Use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });

  //console.log(unfundedGames);

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

//filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });
  // use the function we previously created to add unfunded games to the DOM

  //console.log(fundedGames);

  addGamesToPage(fundedGames);
}

//filterFundedOnly();

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM

  const allGames = GAMES_JSON.filter((game) => {
    return game.pledged;
  });

  addGamesToPage(allGames);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);

const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly);

const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(
  (game) => game.pledged < game.goal
).length;

const unfundedGamesStr = `There ${
  numUnfundedGames === 1 ? "is" : "are"
} ${numUnfundedGames} unfunded ${
  numUnfundedGames === 1 ? "game" : "games"
} remaining. Please consider funding!`;

const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalgames} ${
  totalgames === 1 ? "game" : "games"
}. Currently, ${numUnfundedGames} ${
  numUnfundedGames === 1 ? "game remains" : "games remain"
} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const unfundedGamesElement = document.createElement("p");
unfundedGamesElement.innerHTML = unfundedGamesStr;
descriptionContainer.appendChild(unfundedGamesElement);

const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = displayStr;
descriptionContainer.appendChild(descriptionElement);

// Set the inner HTML of the paragraph element to the template string
descriptionElement.innerHTML = displayStr;

// Append the new paragraph element to the description container
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort(
  (item1, item2) => item2.pledged - item1.pledged
);

// Use destructuring to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

// Create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.innerHTML = `${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// Do the same for the runner-up item
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);

// Search Bar Code
// Function to handle searching games by name
function searchGames() {
  const searchInput = document.getElementById("search-bar").value.toLowerCase();

  // Filter games based on the search input
  const filteredGames = GAMES_JSON.filter((game) => {
    return game.name.toLowerCase().includes(searchInput);
  });

  // Update the page with the filtered games
  deleteChildElements(gamesContainer);
  addGamesToPage(filteredGames);
}

// Add event listener for the search button
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", searchGames);

// Optional: Add event listener for pressing "Enter" in the search bar
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchGames();
  }
});
