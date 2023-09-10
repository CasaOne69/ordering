import menuArray from '/data.js';

let ordersArr = [];

function renderFood(menuItems) {
    return menuItems.map(function (item) {
        const { name, ingredients, id, price, emoji } = item;
        return `
        <section class="fooditemslist">
            <div class="container">
                <div><p class="image">${emoji}</p></div>
                <div>
                    <div><h2>${name}</h2></div>
                    <div><p>Ingredients: ${ingredients}</p></div>
                    <div><h3>Price: £${price}</h3></div>
                </div>
            </div>
            <div class="add"><p><img src="/images/addtocart.png" alt="Buy" data-id="${id}" data-cost="${price}" data-name="${name}"></p></div>
        </section>
        <hr>
        `;
    }).join("");
}

function getId() {
    document.addEventListener('click', function(e) {
        if (e.target.dataset.id) {
            ordersArr.push({
                id: e.target.dataset.id,
                value: parseFloat(e.target.dataset.cost)
            });
            toggleDisplay('#hiddenSection', 'block');
            renderAdded(e.target.dataset.id, e.target.dataset.cost, e.target.dataset.name);
            updateTotalPrice();
        }
    });
}

document.getElementById('orderdetails').addEventListener('click', function(e) {
    if (e.target.dataset.butid) {
        const itemIdToRemove = e.target.dataset.butid;
        const itemIndexToRemove = ordersArr.findIndex(item => item.id === itemIdToRemove);
        if (itemIndexToRemove !== -1) {
            ordersArr.splice(itemIndexToRemove, 1);
            e.target.parentNode.remove();
            updateTotalPrice();
        }
    }
});

getId();

function renderAdded(id, cost, name) {
    document.getElementById('orderdetails').innerHTML += `
    <div class="output">
        ${name} - £${cost} <button class="remove" data-butid="${id}">Remove</button><br>
    </div>
    `;
}

function updateTotalPrice() {
    const totalPrice = ordersArr.reduce((acc, order) => acc + order.value, 0);
    document.getElementById('totalprice').textContent = `Total Price: £${totalPrice.toFixed(2)}`;

    const totalOrdersSection = document.getElementById('hiddenSection');
    if (ordersArr.length === 0) {
        totalOrdersSection.style.display = 'none';
    } else {
        totalOrdersSection.style.display = 'block';
    }
}

function toggleDisplay(selector, displayValue) {
    const elemType = selector.charAt(0);
    let elem;

    if (elemType === '#') {
        elem = document.getElementById(selector.slice(1));
    } else if (elemType === '.') {
        elem = document.querySelector(selector);
    } else {
        console.error("Unsupported selector type");
        return;
    }

    elem.style.display = displayValue;
}

document.getElementById('completeOrder').addEventListener('click', function() {
    toggleDisplay('.popup', 'block');
});

document.getElementById('closePopup').addEventListener('click', function() {
    toggleDisplay('.popup', 'none');
});

document.getElementById('payButton').addEventListener('click', function(e) {
    e.preventDefault();
    toggleDisplay('.popup', 'none');

    alert("Payment Received! Enjoy Your Food!");

    document.getElementById('orderdetails').innerHTML = '';

    document.getElementById('totalprice').textContent = 'Total Price: £0.00';

    ordersArr = [];

    toggleDisplay('#hiddenSection', 'none');
});

document.getElementById('items').innerHTML = renderFood(menuArray);
