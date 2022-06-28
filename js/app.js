'use strict'
// elements
let searchResult = document.querySelector('.search-result');
let likeBox = document.querySelector('.favourite');
let likeNum = document.querySelector('.favourite-num');
let charactersList = document.querySelector('.characters-list');
let elList = document.querySelector('.characters-list');
let favouriteBox = document.querySelector('.favourite-box');
let favouriteBoxClose = document.querySelector('.favourite-box--close');
let favouriteBoxList = document.querySelector('.favourite-box .favourite-box__inner');
let elForm = document.querySelector('.form');
let elModal = document.querySelector('.modal');
let elModalClose = document.querySelector('.modal__close');
let elSelect = document.querySelector('.sort');
let elAdd = document.querySelector('.add');
let search = [];
let sortedByAlphabit = [];
let sortedByYear = [];
let parsedData = JSON.parse(window.localStorage.getItem('characters'));
let cardLikeBox;
let newSortedArr;
let newSortedBirthYear;

if (!parsedData) {
    cardLikeBox = [];
} else {
    cardLikeBox = parsedData;
}
// render characters function
let renderCharacters = (fullArr, htmlElement) => {
    fullArr.forEach(element => {
        let newCard = document.createElement('li');
        let newCardImg = document.createElement('img');
        let newCardTitle = document.createElement('h3');
        let newCardDateOfBirth = document.createElement('p');
        let newCardBtn = document.createElement('button');
        let newCardLike = document.createElement('i');

        //set attribute
        newCard.setAttribute('class', 'card');
        newCardImg.setAttribute('src', element.image);
        newCardImg.setAttribute('alt', 'undefined')
        newCardImg.setAttribute('class', 'card__img');
        newCardTitle.setAttribute('class', 'card__title');
        newCardBtn.setAttribute('class', 'card__btn');
        newCardLike.setAttribute('class', 'fa-solid fa-heart card__like')

        //textContent
        newCardTitle.textContent = element.name;
        newCardDateOfBirth.textContent = element.dateOfBirth;
        newCardBtn.textContent = "Read more";

        // data set
        newCardLike.dataset.cardLikeId = element.id;
        newCardBtn.dataset.cardReaMoreBtn = element.id;


        //append child
        htmlElement.appendChild(newCard);
        newCard.appendChild(newCardLike);
        newCard.appendChild(newCardImg);
        newCard.appendChild(newCardTitle);
        newCard.appendChild(newCardBtn);
    });
}
//render favourite characters function
let renderFavouriteCharacters = (selectedArr, htmlElement) => {
    selectedArr.forEach(element => {
        let favouriteItem = document.createElement('li');
        let favouriteImg = document.createElement('img');
        let favouriteTitle = document.createElement('h4');
        let favouriteDeleteIcon = document.createElement('i');

        favouriteItem.setAttribute('class', 'favourite-item');
        favouriteImg.setAttribute('src', element.image);
        favouriteImg.setAttribute('class', 'favourite-item--img');
        favouriteTitle.setAttribute('class', 'favourite-item__title');
        favouriteDeleteIcon.setAttribute('class', 'favourite-item__delete fa-solid fa-trash-can');

        favouriteTitle.textContent = element.name;

        favouriteDeleteIcon.dataset.deleteIcon = element.id;

        htmlElement.appendChild(favouriteItem);
        favouriteItem.appendChild(favouriteImg);
        favouriteItem.appendChild(favouriteTitle);
        favouriteItem.appendChild(favouriteDeleteIcon);

    })
}

//renderReadMore function
let renderReadMore = (item, htmlElement) => {
    let modalBlock = document.createElement('div');
    let modalAside = document.createElement('div');
    let modalCharacterImg = document.createElement('img');
    let modalCharacterName = document.createElement('h3');
    let modalCharacterdateOfBirth = document.createElement('span');
    let modalCharacterWand = document.createElement('ul');
    let modalCharacterActor = document.createElement('p');
    let modalClose = document.createElement('i');

    modalBlock.setAttribute('class', 'modal__block');
    modalAside.setAttribute('class', 'modal__aside');
    modalCharacterImg.setAttribute('class', 'modal__img');
    modalCharacterImg.setAttribute('src', item.image)
    modalCharacterName.setAttribute('class', 'modal__title');
    modalCharacterdateOfBirth.setAttribute('class', 'modal__date');
    modalCharacterWand.setAttribute('class', 'modal__wand');
    modalCharacterActor.setAttribute('class', 'modal__actor');
    modalClose.setAttribute('class', 'fa-solid fa-xmark modal__close');

    modalCharacterName.textContent = item.name;
    modalCharacterActor.textContent = item.actor;
    modalCharacterdateOfBirth.textContent = item.dateOfBirth;

    for (let [n, l] of Object.entries(item.wand)) {
        let properties = document.createElement('li');
        properties.setAttribute('class', 'properties__list')
        properties.innerHTML = `${n}:${l}`
        modalCharacterWand.appendChild(properties)
    }

    htmlElement.appendChild(modalBlock);
    modalBlock.appendChild(modalCharacterImg);
    modalBlock.appendChild(modalAside);
    modalAside.appendChild(modalClose)
    modalAside.appendChild(modalCharacterName);
    modalAside.appendChild(modalCharacterActor)
    modalAside.appendChild(modalCharacterdateOfBirth);
    modalAside.appendChild(modalCharacterWand);
}
//sort my name function
let sortMenuByAlphabit = (fullArr) => {
    sortedByAlphabit.length = 0;
    newSortedArr = fullArr.map(item => item.name).sort();
    newSortedArr.forEach(element => {
        fullArr.forEach(item => {
            if (element === item.name) {
                sortedByAlphabit.push(item);
            }
        })
    })
}
//sort by year function
let sortMenuByBirthYear = (fullArr) => {
    sortedByYear.length = 0;
    newSortedBirthYear = fullArr.map(item => item.yearOfBirth * 1).sort();
    newSortedBirthYear.forEach(element => {
        fullArr.forEach(item => {
            if (element === item.yearOfBirth) {
                if (!sortedByYear.includes(item)) sortedByYear.push(item)
            }
        })
    })
}

// search result
searchResult.textContent = characters.length;

// sort menu
elForm.addEventListener('change', (evt) => {
    if (elSelect.value === 'byAlphabit') {
        sortMenuByAlphabit(characters)
        elList.innerHTML = ""
        renderCharacters(sortedByAlphabit, elList)
        searchResult.textContent = characters.length;
    } else if (elSelect.value === 'birthYear') {
        sortMenuByBirthYear(characters);
        elList.innerHTML = ""
        renderCharacters(sortedByYear, elList)
        searchResult.textContent = characters.length;
    } else if (elSelect.value === 'sortMenu') {
        elList.innerHTML = ""
        renderCharacters(characters, elList)
        searchResult.textContent = characters.length;
    }
})

// search input
elForm.addEventListener('input', e => {
    const value = e.target.value;
    search.length = 0;
    characters.forEach(element => {
        if (element.name.includes(value)) {
            search.push(element);
        }
    });
    searchResult.textContent = search.length
    elList.innerHTML = "";
    renderCharacters(search, elList);
})

// open favourites
likeBox.addEventListener('click', () => {
    favouriteBox.classList.add('active-box')
    window.localStorage.setItem('characters', JSON.stringify(cardLikeBox))
    favouriteBoxList.innerHTML = "";
    renderFavouriteCharacters(cardLikeBox, favouriteBoxList)
})

// close favourites
favouriteBoxClose.addEventListener('click', () => {
    favouriteBox.classList.remove('active-box')
})

// likes number
likeNum.textContent = cardLikeBox.length;

// card btns click function
elList.addEventListener('click', (evt) => {
    if (evt.target.matches('.card__like')) {
        let cardLikeId = evt.target.dataset.cardLikeId * 1;
        let cardLikeFind = characters.find((item) => item.id === cardLikeId);
        if (!(cardLikeBox.includes(cardLikeFind))) {
            cardLikeBox.push(cardLikeFind)
            window.localStorage.setItem('characters', JSON.stringify(cardLikeBox))
            favouriteBoxList.innerHTML = "";
            renderFavouriteCharacters(cardLikeBox, favouriteBoxList);
        }
        likeNum.textContent = cardLikeBox.length;
    } else if (evt.target.matches('.card__btn')) {
        let cardReadId = evt.target.dataset.cardReaMoreBtn * 1;
        let cardReadFind = characters.find(item => item.id === cardReadId);
        elModal.classList.add('modal-active');
        renderReadMore(cardReadFind, elModal)
    }
})

//modal close 
elModal.addEventListener('click', (evt) => {
    if (evt.target.matches('.modal__close')) {
        elModal.classList.remove('modal-active');
        elModal.innerHTML = "";
    }
})

// favourites delete 
favouriteBoxList.addEventListener('click', (evt) => {
    let cardDeleteId = evt.target.dataset.deleteIcon * 1;
    let cardDeleteIndex = cardLikeBox.findIndex((item) => item.id === cardDeleteId);
    if (evt.target.matches('.favourite-item__delete')) {
        cardLikeBox.splice(cardDeleteIndex, 1);
        window.localStorage.setItem('characters', JSON.stringify(cardLikeBox))
    }
    if (cardLikeBox.length === 0) {
        window.localStorage.removeItem('characters');
    }
    likeNum.textContent = cardLikeBox.length;
    favouriteBoxList.innerHTML = ""
    renderFavouriteCharacters(cardLikeBox, favouriteBoxList)
})
renderCharacters(characters, elList)