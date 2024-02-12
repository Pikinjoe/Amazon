export let cartItem = JSON.parse(localStorage.getItem('cart'));

if (!cartItem) {
    cartItem = [{
        productId: '112f2-2211-9611',
        quantity: 1,
        deliveryOptionId: '1'
    }, {
        productId: '2160-401a1-9012',
        quantity: 1,
        deliveryOptionId: '2'
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
        quantity: cartValue,
        deliveryOptionId: '1'
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

export function calculateCartQuantity() {
    let cartQuantity = 0;

    cartItem.forEach((item) => {
        cartQuantity += item.quantity;
    })
    document.querySelectorAll('.cart-output')
    .forEach((output) => {
    output.innerHTML = cartQuantity;
    });
}

export function updateNewCartQuantity(productId, newQuantity) {
    let sameItem;
    cartItem.forEach((cart) => {
        if (cart.productId === productId) {
            sameItem = cart;
        }
    });
    sameItem.quantity = newQuantity;
    saveToStorage();

}