import {cartItem, removeFromCart} from "cart.js";
import {products} from "product.js";
import {formatCurrency} from "../utility/money.js";

let cartSummaryHTML = '';

cartItem.forEach(cart => {
    const productId = cart.productId;

    let sameProduct;

    products.forEach((product) => {
        if (product.id === productId){
            sameProduct = product
        }
    })

    cartSummaryHTML += `<div class="border-gray-300 border rounded-md mb-2 js-cart-container-${sameProduct.id}">
    <div class="w-11/12 mx-auto py-4">
        <p class="font-bold text-lg text-green-700 mb-4">Delivery date: Tuesday, January 30</p>
        <div class="lg:flex lg:gap-8">
            <div class="mb-4 flex gap-3 justify-center lg:w-3/5 overflow-hidden">
                <div class="basis-1/3">
                    <img src="${sameProduct.image}" >
                </div>
                <div class="basis-2/3">
                    <p class="font-bold mb-2">${sameProduct.name}</p>
                    <p class="text-red-700 font-bold mb-2">$${formatCurrency(sameProduct.priceCent)}</p>
                    <div class="flex gap-2">
                        <p>
                            Quantity: <span>${cart.quantity}</span>
                        </p>
                        <button class="text-blue-400">Update</button>
                        <button class="text-blue-400 delete-link" data-product-id="${sameProduct.id}">Delete</button>
                    </div>
                </div>
            </div>    
            
            <div class="lg:w-2/5">
                <p class="font-bold">Choose a delivery option:</p>
                <div>
                    <div class="my-3 flex items-center gap-2">
                        <input type="radio" name="${sameProduct.id}" class="w-5 h-5 cursor-pointer">
                        <div>
                            <p class="text-green-700 font-medium">Tuesday, January 30</p>
                            <p class="text-gray-500">FREE Shipping</p>
                        </div>
                    </div> 
                    <div class="my-3 flex items-center gap-2">
                        <input type="radio" name="${sameProduct.id}" class="w-5 h-5 cursor-pointer">
                        <div>
                            <p class="text-green-700 font-medium">Wednesday, January 24</p>
                            <p class="text-gray-500">$4.99 - Shipping</p>
                        </div>
                    </div>
                    <div class="my-3 flex items-center gap-2">
                        <input type="radio" name="${sameProduct.id}" class="w-5 h-5 cursor-pointer">
                        <div>
                            <p class="text-green-700 font-medium">Monday, January 22</p>
                            <p class="text-gray-500">$9.99 - Shipping</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
});

document.querySelector('.checkout_container')
    .innerHTML = cartSummaryHTML;

document.querySelectorAll('.delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId
            removeFromCart(productId);
            
            const container = document.querySelector(
                `.js-cart-container-${productId}`
            );
            
            container.remove();
        });
    });