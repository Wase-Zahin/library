const inp = document.querySelectorAll('.input');
const submit = document.querySelector('.submit');
const buttonAdd = document.querySelector('.add');
const theme = document.querySelector('.theme');
const main = document.querySelector('.main-container');
const popup =  document.querySelector('.popup-box');
const overlay = document.createElement('div');
const body = document.querySelector('body');
let myLibrary = [];

// function to store books inside array
function addBookToLibrary(author, title, NOP) {
    this.author = author;
    this.title = title;
    this.NOP = NOP;
    myLibrary.push({author, title, NOP});
}

function setTheme() {
    const root = document.documentElement;
    const newTheme = root.className === 'dark' ? '' : 'dark';
    root.className = newTheme;
}

// when clicked the submit button use a loop to display values in card
function add() {
    let newBook = new addBookToLibrary(`"${author.value}"`, `${title.value}`, `${pages.value} pages`);
    
    // create a div when clicked submit 
    // and give it class 'card', append to main-container    
    card = document.createElement('div');
    main.appendChild(card);
    card.classList.add('card');
    cards = document.querySelectorAll('.card');

    // append book info to card div
    for (let i = 0; i < Object.keys(newBook).length; i++) {
        div = document.createElement('div');
        card.appendChild(div);
        cardDiv = document.querySelectorAll('.card:last-child div');
        cardDiv[i].textContent = Object.values(newBook)[i];
    }

    // create read and remove buttons
    read = document.createElement('div');
    read.textContent = 'Read';
    read.classList.add('read');
    card.appendChild(read);

    remove = document.createElement('div');
    remove.textContent = 'Remove';
    remove.classList.add('remove');
    card.appendChild(remove);
    
    // event listener for read and remove buttons
    read.addEventListener("click", toggleStatus);
    remove.addEventListener('click', removeCard);

    if (document.getElementById('unread').checked) {
        read.classList.add('unread');
        read.textContent = 'Unread';
    };
};

function toggleStatus(e) {
    e.target.classList.toggle('unread');
    if (e.target.textContent == 'Read') e.target.textContent = 'Unread';
    else e.target.textContent = 'Read';
};

function removeCard(e) {
    e.target.parentElement.remove();
};

// onclick popup
function openPopup(e) {
    popup.classList.add('show');
    body.appendChild(overlay);
    overlay.className = 'overlay';
}

function removePopup(e) {
    isClosest = e.target.closest(".popup-box");
    if (e.target != buttonAdd && e.target != popup && !isClosest && popup.classList.contains('show')) {
        clearPlaceholder();
    }
}
function clearPlaceholder () {
    popup.classList.remove('show');
    body.removeChild(overlay);
    document.querySelector('#pages').setAttribute('placeholder', ' Pages');
    document.querySelector('#title').setAttribute('placeholder', ' Title');
    document.querySelector('#author').setAttribute('placeholder', ' Author');
    inp.forEach(inp => {
        inp.classList.remove('required');
        inp.value = '';
    });
}

function errorHandling() {
    inp.forEach((inp) => { 
        if (author.value == '' || title.value == '') {
            inp.classList.add('required');
            inp.placeholder = ' Required!';
        }
        if (isNaN(pages.value) || pages.value == '') {
            pages.value = '';
            pages.classList.add('required');
            pages.placeholder = 'Please enter a number!'
        }
});
    if (!(author.value == '' || title.value == '' || pages.value == '' || isNaN(pages.value))) {
        add();
        clearPlaceholder();
    }
}

// event listeners
window.addEventListener('click', removePopup);
submit.addEventListener('click', errorHandling);
buttonAdd.addEventListener('click', openPopup);
theme.addEventListener('click', setTheme);

//remove.addEventListener('click', removeCard);

