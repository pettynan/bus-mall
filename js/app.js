// Array that will contain the objects of all catalogue items
var allItems = [];

// Variable that tracks the total number of votes
var totalVotes = 0;

// This array contains the DOM elements for the 3 images onscreen.
var imgArray = [document.getElementById('img1'), document.getElementById('img2'), document.getElementById('img3')];

// This variable is the DOM element for the image container.
// var imgContainer = document.getElementById('imgContainer');

var resultsTable = document.getElementById('resultsTable');

// Constructor function for all catalogue item objects.
function Item (itemName, filetype) {

  this.itemIndex = allItems.length;
  this.itemName = itemName;
  this.filepath = './img/' + itemName + filetype;
  this.voteCount = 0;
  this.viewCount = 0;

  allItems.push(this);
}

// Initializes all catalogue item objects.
new Item('bag', '.jpg');
new Item('banana', '.jpg');
new Item('bathroom', '.jpg');
new Item('boots', '.jpg');
new Item('breakfast', '.jpg');
new Item('bubblegum', '.jpg');
new Item('chair', '.jpg');
new Item('cthulhu', '.jpg');
new Item('dog-duck', '.jpg');
new Item('dragon', '.jpg');
new Item('pen', '.jpg');
new Item('pet-sweep', '.jpg');
new Item('scissors', '.jpg');
new Item('shark', '.jpg');
new Item('sweep', '.png');
new Item('tauntaun', '.jpg');
new Item('unicorn', '.jpg');
new Item('usb', '.gif');
new Item('water-can', '.jpg');
new Item('wine-glass', '.jpg');

// This variable is used to store data across separate runs of newItems function.
var prevRandomArray = [];

// This function selects 3 new items, which are unique from each other and from the 3 prior items.
function newItems() {
  var randomArray = [];

  for (var i = 0 ; i < imgArray.length ; i++) {
    var randomIndex = Math.floor(Math.random() * allItems.length);

    while (randomArray.includes(randomIndex) || prevRandomArray.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * allItems.length);
    }

    randomArray.push(randomIndex);
    imgArray[i].src = allItems[randomIndex].filepath;
    imgArray[i].title = allItems[randomIndex].itemName;
    imgArray[i].alt = allItems[randomIndex].itemName;
    allItems[randomIndex].viewCount ++;
  }

  prevRandomArray = randomArray;
}


// This function runs after 25 votes have been cast.
function checkVoteLimit() {
  if (totalVotes === 25) {
    var theadEl = document.createElement('thead');
    var trEl = document.createElement('tr');
    var thEl = document.createElement('th');
    thEl.textContent = 'Item Name';
    trEl.appendChild(thEl);
    var thVoteEl = document.createElement('th');
    thVoteEl.textContent = '# of Votes';
    trEl.appendChild(thVoteEl);
    var thViewEl = document.createElement('th');
    thViewEl.textContent = '# of Views';
    trEl.appendChild(thViewEl);
    theadEl.appendChild(trEl);
    resultsTable.appendChild(theadEl);


    for (var i = 0 ; i < allItems.length ; i++) {
      trEl = document.createElement('tr');
      thEl = document.createElement('th');
      thEl.textContent = allItems[i].itemName;
      trEl.appendChild(thEl);
      var tdVoteEl = document.createElement('td');
      tdVoteEl.textContent = allItems[i].voteCount;
      trEl.appendChild(tdVoteEl);
      var tdViewEl = document.createElement('td');
      tdViewEl.textContent = allItems[i].viewCount;
      trEl.appendChild(tdViewEl);

      resultsTable.appendChild(trEl); // This line adds the finished row to the bottom of the table.
    }

    updateVotesArray();

    // These lines remove the event listeners, to disallow further voting.
    imgArray[0].removeEventListener('click',handleImg1);
    imgArray[1].removeEventListener('click',handleImg2);
    imgArray[2].removeEventListener('click',handleImg3);

  }
}

// For refactoring, try using a single event handler and 'event.target.______' to tell which item was clicked.

// These are event handlers for each image.
function handleImg1() {
  totalVotes++;
  allItems[prevRandomArray[0]].voteCount ++;
  console.log('Voted for image 1');
  checkVoteLimit();
  newItems();
}

function handleImg2() {
  totalVotes++;
  allItems[prevRandomArray[1]].voteCount ++;
  console.log('Voted for image 2');
  checkVoteLimit();
  newItems();
}

function handleImg3() {
  totalVotes++;
  allItems[prevRandomArray[2]].voteCount ++;
  console.log('Voted for image 3');
  checkVoteLimit();
  newItems();
}

// function handleUserClick(event) {
//   if (event.target) {}


// }

// imgContainer.addEventListener('click', handleUserClick);


// These are the event listeners for each image.
imgArray[0].addEventListener('click', handleImg1);

imgArray[1].addEventListener('click', handleImg2);

imgArray[2].addEventListener('click', handleImg3);


// This line displays 3 random images upon loading the page.
newItems();





var items = [];
for (var i = 0 ; i < allItems.length ; i++) {
  items[i] = allItems[i].itemName;
}

var votes = [];
function updateVotesArray() {
  for (var i = 0 ; i < allItems.length ; i++) {
    votes[i] = allItems[i].voteCount;
  }
}

var ctx = document.getElementById('resultsChart').getContext('2d');
var resultsChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: items,
    datasets: [{
      label: '# of Votes',
      data: votes,
      backgroundColor: 'rgb(250,223,118,0.2)',
      borderColor: 'rgb(250,223,118,1)',
      borderWidth: 1
    }]

  }



});
