var removeCartItemButtons = document.getElementsByClassName('btn-remove')
console.log(removeCartItemButtons)
for(var i=0; i<removeCartItemButtons.length;i++ ){
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
}

document.getElementsByClassName('purchase-btn')[0].addEventListener('click',purchaseClicked)
function purchaseClicked(){
    alert('Thank you for your purchase. Our team will contact you for the bill in a moment')
    var cartItems = document.getElementsByClassName('cart-item')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }

}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(var i=0; i<removeCartItemButtons.length;i++ ){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

function quantityChanged(event){
    var input = event.target
    var targetStock = input.parentElement.parentElement
    var targetStockValue = targetStock.getElementsByClassName('cart-stock').innerText
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

var addToCartButtons = document.getElementsByClassName('addToCart')
for(var i=0; i< addToCartButtons.length;i++ ){
    var button = addToCartButtons[i]
    button.addEventListener('click',addToCartClick)
}

function addToCartClick(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var name = shopItem.getElementsByClassName('item-name')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    var stock = shopItem.getElementsByClassName('item-stock')[0].innerText
    addItemToCart(name,price,stock)
}

function addItemToCart(name,price,stock){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemsName = cartItems.getElementsByClassName('cart-item-title')
    for(var i=0; i< cartItemsName.length;i++ ){
        if(cartItemsName[i].innerText === name){
            alert('This item has already been added')
            return
        }
    }
    var cartRowContent = `
    <div class="cart-item cart-column">
        <span class="cart-item-title">${name}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-remove" type="button">REMOVE</button>
     </div>
    `
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var total = 0
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    for(var i=0; i< cartRows.length;i++ ){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = priceElement.innerText
        price = Number(price)
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].value = total
}