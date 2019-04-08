// Array that will contain the objects of all catalogue items
var allItems = [];

// Variable that tracks the total number of votes
var totalVotes = 0;

// This array contains the DOM elements for the 3 images onscreen.
var imgArray = [document.getElementById('img1'), document.getElementById('img2'), document.getElementById('img3')];


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

  for (var i = 0 ; i < 3 ; i++) {
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


// These are the event listeners for all 3 images.


imgArray[0].addEventListener('click', function() {
  totalVotes++;
  if (totalVotes > 24) {
    alert('You have completed the survey!');
  }
  allItems[prevRandomArray[0]].voteCount ++;
  console.log('Voted for image 1');

  newItems();

});

imgArray[1].addEventListener('click', function() {
  totalVotes++;
  if (totalVotes > 24) {
    alert('You have completed the survey!');
  }
  allItems[prevRandomArray[1]].voteCount ++;
  console.log('Voted for image 2');

  newItems();

});

imgArray[2].addEventListener('click', function() {
  totalVotes++;
  if (totalVotes > 24) {
    alert('You have completed the survey!');
  }
  allItems[prevRandomArray[2]].voteCount ++;
  console.log('Voted for image 3');

  newItems();

});


// This line displays 3 images upon loading the page.
newItems();
