async function getData() {
    const data = await fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",{
        method: "GET"
    });
    const listItems = await data.json();

    displayList(listItems, list, rows, currentPage);
    paginationSetup(listItems, pagination, rows);
}
getData();

const list = document.getElementById('lists');
const pagination = document.getElementById('pagination');

let currentPage = 1;
let rows = 12;

function displayList(items, wrapper, perPage, page) {
    wrapper.innerHTML = "";
    page--;

    let start = perPage * page;
    let end = start + perPage;
    let paginatedItems = items.slice(start, end);

    paginatedItems.forEach((item) => {
        const userContainer = document.createElement("div");
        userContainer.className = "item";

        userContainer.innerHTML = 
        `<div>Name</div>
        <div>${item.name}</div>
        <div>Email ID</div>
        <a href="mailto:${item.email}" class="mailId">${item.email}</a>`;

        wrapper.append(userContainer);
    });
}
function paginationSetup(items, wrapper, perPage) {

    wrapper.innerHTML = "";
    let pageCount = Math.ceil(items.length / perPage);

    for(let i = 1; i < pageCount + 1; i++) {
        let btn = paginationButton(i, items);
        wrapper.append(btn);
    }

    function paginationButton(page, items) {
        let button = document.createElement('button');
        button.innerText = page;
    
        if(currentPage == page) {
            button.classList.add('active');
        }

        button.addEventListener('click', function () {
            currentPage = page;
            displayList(items, list, rows, currentPage);
    
            let currentButton = document.querySelector('.pageNo button.active');
            currentButton.classList.remove('active');
    
            button.classList.add('active');
        });
        return button;    
    }
}
