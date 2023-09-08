import menuArray from '/data.js'
let totalSum = 0



//function to redner out the food items
function shitfood (dogshit) {
return dogshit.map(function (ratshit){
    const {name, ingredients, id, price, emoji} = ratshit
    
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
        <div class="add"><p><img src="/images/addtocart.png" alt="Buy" data-id="${name}" data-cost="${ratshit.price}"></p></div>
    </section>
    <hr>
    ` 
}).join("")

 }


 

//function to get the click id
function getId() {
    document.addEventListener('click', function(e){
        if (e.target.dataset.id) {
            renderAdded(e.target.dataset.id, parseFloat(e.target.dataset.cost))
         
        }  
    
    })
    
}
getId()



//function to render to the lower section
function renderAdded(name, cost) {
    document.getElementById('orderdetails').innerHTML += `
    <div class ="output" >
    ${name} - £${cost.toFixed(2)}<br>
    </div>  
    `
   totalSum += cost

   document.getElementById('totalprice').textContent = `Total Price: £${totalSum.toFixed(2)} `

   console.log(cost)
   console.log("Total sum:", totalSum.toFixed(2))
   document.getElementById('hiddenSection').style.display = 'block';
    }
    
   


    

//retunring to the dom    
document.getElementById('items').innerHTML = shitfood(menuArray)





    




