import menuArray from '/data.js'


function shitfood (dogshit) {
return dogshit.map(function (ratshit){
    const {name, ingredients, id, price, emoji} = ratshit
    return `
    <section class="fooditemslist">
        <div class="container">
            <div><p class="image">${emoji}</p></div>
                    <div>
                        <div><h2>${name}</h2></div>
                        <div> <p>Ingredients: ${ingredients}</p></div>
                        <div><h3>Price: £${ratshit.price}</h3></div>
                    </div>
        </div>
        <div class="add"><p></p><img src="/images/addtocart.png" alt="Buy"></p></div>
    </section>
    <hr>
    ` 
}).join("")
      
       
        
 
    



}
document.getElementById('items').innerHTML = shitfood(menuArray)





    




