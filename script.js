const userInput = document.getElementById('userInput');
const listContainer = document.querySelector('.user-list');
const listLenght = document.getElementById('list-lenght');
const filterBtns = document.querySelector('.filter-container');

// -----------------------------------------------------------------
// ADD NUMBER ITEMS CONTAINS
function updateListLenght() {
    const arrayChildren = Array.from(listContainer.children);
    listLenght.innerHTML = arrayChildren.length;
}

// -----------------------------------------------------------------
// ---------> Function Create Item
function createItem(value) {
    // ---------> Item Container
    const divItem = document.createElement('div');
    divItem.classList.add('item');
    divItem.classList.add('activate');
    divItem.setAttribute('draggable', true);

    // ---------> Btn Check
    const btnCheck = document.createElement('i');
    btnCheck.classList.add('circle');
    btnCheck.classList.add('fa-solid');
    btnCheck.classList.add('fa-check');

    btnCheck.addEventListener('click', (event) => {
        event.target.classList.toggle('checked');
        event.target.parentElement.classList.toggle('completed');
        event.target.parentElement.classList.toggle('activate');
        nameItem.classList.toggle('name-completed');
    })

    // ---------> Name Item
    const nameItem = document.createElement('p');
    nameItem.classList.add('paragraph-name');
    nameItem.innerHTML = value;

    nameItem.addEventListener('click', (event) => {
        btnCheck.classList.toggle('checked');
        event.target.parentElement.classList.toggle('completed');
        event.target.parentElement.classList.toggle('activate');
        nameItem.classList.toggle('name-completed');
    })
    
    // ---------> Btn Delete
    const btnDelete = document.createElement('img');
    btnDelete.classList.add('icon-delete');
    btnDelete.src = './assets/images/icon-cross.svg';
    
    btnDelete.addEventListener('click', (event) => {
        if (event.target.classList.contains('icon-delete')) {
            const itemDelete = event.target.parentElement;
            listContainer.removeChild(itemDelete);

            listLenght.innerHTML--;
        }
    }) 
    
    // ---------> Add Childs
    divItem.appendChild(btnCheck);
    divItem.appendChild(nameItem);
    divItem.appendChild(btnDelete);
    
    listContainer.appendChild(divItem);

    updateListLenght()
}


// -----------------------------------------------------------------
// ADD ITEM TODO LIST
userInput.addEventListener('keyup', function (event) {
    var key = event.which || event.keyCode;// Verificando número da tecla clicado

    if (key == 13 && this.value !== "") { // Criando um item na lista se a tecla for 'Enter'
        const value = this.value
        createItem(value);

        this.value = '';    
    }
})

// -----------------------------------------------------------------
// ITEM COMPLETE
function itemComplete() {
    document.querySelector('.item').classList.toggle('completed');
    document.querySelector('.circle').classList.toggle('checked');
    document.querySelector('.circle').style.border = 'none';
}

// -----------------------------------------------------------------
// BTN FILTER ALL ITEMS
function filterAll() {
    const arrayChildren = Array.from(listContainer.children);
    const btnArray = Array.from(filterBtns.children);

    for (let all of arrayChildren) {
       if (all.classList.contains('completed') || all.classList.contains('activate')){
            all.style.display = 'flex';
       }
    }
   
    if (btnArray[1].classList.contains('btn-actived') || btnArray[2].classList.contains('btn-actived')) {
        for (let i = 1; i < btnArray.length; i++) {
            btnArray[i].classList.remove('btn-actived');
        }
    }
    btnArray[0].classList.add('btn-actived');
}

// -----------------------------------------------------------------
// BTN FILTER ITEMS ACTIVATE
function filterActivate() {
    const arrayChildren = Array.from(listContainer.children);
    const btnArray = Array.from(filterBtns.children);

    for (let activate of arrayChildren) {
        if (activate.classList.contains('activate')) {
            if(activate.style.display == 'none') {
                activate.style.display = 'flex'; 
            }
        }

        if(activate.classList.contains('completed')) {
            activate.style.display = 'none';
            if(activate.classList.contains('activate')) {
                activate.style.display = 'flex';
            }
        }
    }
    
    if (btnArray[0].classList.contains('btn-actived') || btnArray[2].classList.contains('btn-actived')) {
        btnArray[0].classList.remove('btn-actived');
        btnArray[2].classList.remove('btn-actived');
    }
    btnArray[1].classList.add('btn-actived');
}

// -----------------------------------------------------------------
// BTN FILTER ITEMS COMPLETED

function filterCompleted() {
    const arrayChildren = Array.from(listContainer.children);
    const btnArray = Array.from(filterBtns.children);

    for (let complete of arrayChildren) {
        if (complete.classList.contains('completed')) {
            if(complete.style.display == 'none') {
                complete.style.display = 'flex'; 
            }
        }

        if(complete.classList.contains('activate')) {
            complete.style.display = 'none';
            if(complete.classList.contains('completed')) {
                complete.style.display = 'flex';
            }
        }
    }   

    if (btnArray[0].classList.contains('btn-actived') || btnArray[1].classList.contains('btn-actived')) {
        for (let i = 0; i < btnArray.length - 1; i++) {
            btnArray[i].classList.remove('btn-actived');
        }
    }
    btnArray[2].classList.add('btn-actived');
}

// -----------------------------------------------------------------
// BTN DELETE ALL ITEMS COMPLETE
function deleteItemsComplete() {
    const arrayChildren = Array.from(listContainer.children);

    for (let deleteItemComplete of arrayChildren) {
        if (deleteItemComplete.classList.contains('completed')) {
            listContainer.removeChild(deleteItemComplete);
        }
    }

    updateListLenght()
}


let isSmallScreen = false; // Variável para controlar o estado da tela

function handleResize() {
  const filterContainer = document.querySelector(".filter-container");
  const footerTodo = document.querySelector('.todo');
  const main = document.getElementById('main');
  
  if (window.innerWidth <= 375 && !isSmallScreen) {
    footerTodo.removeChild(filterContainer);
    main.appendChild(filterContainer);
    isSmallScreen = true; // Marque a tela como pequena
  } else if (window.innerWidth > 375 && isSmallScreen) {
    main.removeChild(filterContainer);
    const btnClearCompleted = document.getElementById('clear-completed');
    footerTodo.removeChild(btnClearCompleted);
    footerTodo.appendChild(filterContainer);
    footerTodo.appendChild(btnClearCompleted);
    isSmallScreen = false; // Marque a tela como não pequena
  }
}

window.addEventListener("resize", handleResize);
window.addEventListener("load", handleResize); // Execute a função no carregamento da página

// -----------------------------------------------------------------
// THEME MODE

function themeMode() {
    let imgBg = document.getElementsByClassName('img-bg')[0];
    let imgBtnTheme = document.getElementById('img-theme');
    
    if (!document.body.classList.contains('light')) { 
        imgBg.style.backgroundImage = 'url(./assets/images/bg-desktop-light.jpg)';
        imgBtnTheme.src = './assets/images/icon-moon.svg';

    } else {
        imgBg.style.backgroundImage = 'url(./assets/images/bg-desktop-dark.jpg)';
        imgBtnTheme.src = './assets/images/icon-sun.svg';
    }

    document.body.classList.toggle('light');
}
  
