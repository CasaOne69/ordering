import menuArray from '/data.js';

let ordersArr = [];

// Function to render out the food items
function renderFood(dogshit) {
    return dogshit.map(function (ratshit) {
        const { name, ingredients, id, price, emoji } = ratshit;
        return `
        <section class="fooditemslist">
            <div class="container">
                <div><p class="image">${emoji}</p></div>
                <div>
                    <div><h2>${name}</h2></div>
                    <div><p>Ingredients: ${ingredients}</p></div>
                    <div><h3>Price: £${ratshit.price}</h3></div>
                </div>
            </div>
            <div class="add"><p><img src="/images/addtocart.png" alt="Buy" data-id="${id}" data-cost="${ratshit.price}" data-name="${name}"></p></div>
        </section>
        <hr>
        `;
    }).join("");
}

// Function to get the click id
function getId() {
    document.addEventListener('click', function(e) {
        if (e.target.dataset.id) {
            ordersArr.push({
                id: e.target.dataset.id,
                value: parseFloat(e.target.dataset.cost)
            });
            document.getElementById('hiddenSection').style.display = 'block';
            renderAdded(e.target.dataset.id, e.target.dataset.cost, e.target.dataset.name);
            updateTotalPrice();
        }
    });
}

// Separate event listener for "Remove" buttons
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

// Function to render to the lower section
function renderAdded(id, cost, name) {
    document.getElementById('orderdetails').innerHTML += `
    <div class="output">
        ${name} - £${cost} <button class="remove" data-butid="${id}">Remove</button><br>
    </div>
    `;
}

// Function to calculate and update the total price
function updateTotalPrice() {
    const totalPrice = ordersArr.reduce((acc, order) => acc + order.value, 0);
    document.getElementById('totalprice').textContent = `Total Price: £${totalPrice.toFixed(2)}`;

    // Check if ordersArr is empty and hide the section if it is
    const totalOrdersSection = document.getElementById('hiddenSection');
    if (ordersArr.length === 0) {
        totalOrdersSection.style.display = 'none';
    } else {
        totalOrdersSection.style.display = 'block';
    }
}

// Returning to the DOM
document.getElementById('items').innerHTML = renderFood(menuArray);


