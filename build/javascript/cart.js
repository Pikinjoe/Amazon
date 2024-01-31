export let cartItem = JSON.parse(localStorage.getItem('cart'));

if (!cartItem) {
    cartItem = [{
        productId: '112f2-2211-9611',
        quantity: 2,
    },{
        productId: '2160-401a1-9012',
        quantity: 1
    }];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cartItem));
}

export function addToCart(productId) {
    const cartNumber = document.querySelector(`.quantity-selector-${productId}`);
    
    const cartValue = Number(cartNumber.value);
    let sameItem;

    cartItem.forEach((item) => {
        if (productId === item.productId ) {
            sameItem = item;
        }
    });

    if (sameItem) {
        sameItem.quantity += cartValue;
    } else {
    cartItem.push({
        productId: productId,
        quantity: cartValue
    })
  }

  saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    cartItem.forEach((cart) => {
        if (cart.productId !== productId) {
            newCart.push(cart)
        }
    })

    cartItem = newCart;

    saveToStorage();
}