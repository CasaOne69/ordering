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
    let originalPrice = ordersArr.reduce((acc, order) => acc + order.value, 0);
    let discount = 0;

    if (ordersArr.length >= 2) {
        discount = originalPrice * 0.1;
    }

    const discountedPrice = originalPrice - discount;

    let totalPriceMessage = `Total Price: £${discountedPrice.toFixed(2)}`;
    if (discount > 0) {
        totalPriceMessage += ` (Original: £${originalPrice.toFixed(2)}, Saved: £${discount.toFixed(2)})`;
    }

    document.getElementById('totalprice').textContent = totalPriceMessage;

    // Check if ordersArr is empty and hide #hiddenSection if it is
    if (ordersArr.length === 0) {
        toggleDisplay('#hiddenSection', 'none');
    }
}

function toggleDisplay(selector, displayValue) {
    const elem = document.querySelector(selector);
    elem.style.display = displayValue;
}

// ... (rest of the code remains unchanged)



document.getElementById('completeOrder').addEventListener('click', function() {
    toggleDisplay('.popup', 'block');
});

document.getElementById('closePopup').addEventListener('click', function() {
    toggleDisplay('.popup', 'none');
});

document.getElementById('payButton').addEventListener('click', function(e) {
    e.preventDefault();
    toggleDisplay('.popup', 'none');
    toggleDisplay('.review-popup', 'block');
});

document.getElementById('submitReview').addEventListener('click', function() {
    const ratingElems = document.querySelectorAll('.star-rating input');
    let selectedRating;

    ratingElems.forEach(elem => {
        if (elem.checked) {
            selectedRating = elem.value;
        }
    });

    const comment = document.getElementById('reviewComment').value;
    displayUserFeedback(selectedRating, comment);

    toggleDisplay('.review-popup', 'none');
    document.getElementById('orderdetails').innerHTML = '';
    document.getElementById('totalprice').textContent = 'Total Price: £0.00';
    ordersArr = [];
    toggleDisplay('#hiddenSection', 'none');
    updateCustomerReviewSectionVisibility();
});

function displayUserFeedback(rating, comment) {
    const reviewList = document.getElementById('reviewsList'); 
    const reviewEntry = document.createElement('div');
    reviewEntry.className = 'review-entry';
    reviewEntry.innerHTML = `
        <strong>Rating:</strong> <span class="star-rating">${"☆".repeat(parseInt(rating)).split("").map(star => `<span class="rated">${star}</span>`).join("")}</span><br>
        <strong>Comment:</strong> ${comment}
    `;
    reviewList.appendChild(reviewEntry);

    const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
    const isDuplicate = reviews.some(review => review.rating === rating && review.comment === comment);
    if (!isDuplicate) {
        reviews.push({ rating, comment });
        localStorage.setItem('customerReviews', JSON.stringify(reviews));
    }

    updateCustomerReviewSectionVisibility();
}

document.getElementById('cancelReview').addEventListener('click', function() {
    toggleDisplay('.review-popup', 'none');
});

function loadReviewsFromLocalStorage() {
    const savedReviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
    const reviewList = document.getElementById('reviewsList');
    reviewList.innerHTML = '';
    savedReviews.forEach(review => {
        displayUserFeedback(review.rating, review.comment);
    });
    updateCustomerReviewSectionVisibility();
}

document.getElementById('items').innerHTML = renderFood(menuArray);
loadReviewsFromLocalStorage();

document.getElementById('clearReviews').addEventListener('click', function() {
    localStorage.removeItem('customerReviews');
    const reviewList = document.getElementById('reviewsList');
    reviewList.innerHTML = '';
    updateCustomerReviewSectionVisibility();
    alert("All reviews have been cleared.");
});

function updateCustomerReviewSectionVisibility() {
    const savedReviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
    if (savedReviews.length > 0) {
        toggleDisplay('#customerReviews', 'block');
        toggleDisplay('#clearReviews', 'block');
    } else {
        toggleDisplay('#customerReviews', 'none');
    }
}
