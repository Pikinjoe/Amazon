import {cartItem, addToCart} from "../javascript/cart.js";
import {products} from "../javascript/product.js";
import {formatCurrency} from "../utility/money.js";



// Nav Bar javascript
const navBar = document.querySelector('.js-nav-bar');
const navList = document.querySelector('.js-nav-list');
const navHead = document.querySelector('.js-nav-head');

navBar.addEventListener('click', () => {
    navList.classList.toggle('hidden');
    navHead.classList.toggle('nav');
    navList.classList.toggle('nav_list')
})

// Generating Html with JS
let productHtml = '';
products.forEach((product) => {
    productHtml += `
    <div class="w-1/2 sm:w-2/6 md:w-1/4 lg:w-1/5 xl:w-1/6 pt-8 border border-slate-200 border-l-0 border-t-0">
    <div class="w-5/6 mx-auto">
        <div class="flex items-center h-[180px] mb-2">
            <img src="${product.image}" alt="" class="max-h-full max-w-full">
        </div>
        <p class="my-2 multiline-ellipsis leading-tight">${product.name}</p>
        <div class="flex">
            <img src="./Ratings/rating-${product.rating.stars * 10}.png" alt="" class="w-28">
            <div class="text-blue-500 ml-1">
                ${product.rating.count}
            </div>
        </div>
        <p class="my-2 font-bold">$${formatCurrency(product.priceCent)}</p>
        <div>
            <select class="bg-slate-200 border border-slate-300 focus:outline-yellow-500 py-[2px] px-[5px] rounded-lg my-2 quantity-selector-${product.id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
        <div class="js-added-class-${product.id} my-2 text-green-600 opacity-0 flex gap-1 items-center">
            <img src="../Logo/checkmark.png" alt="" class="w-5 h-5"> Added
        </div>
        <div class="w-full mt-3 mb-6">
            <button class="btn bg-yellow-400 hover:bg-yellow-500 py-1 px-4 w-full rounded-full" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    </div>
</div> 
   `;
   
})

document.querySelector('.container-div').innerHTML = productHtml;

function updateCartQuantity() {
    let cartQuantity = 0;

    cartItem.forEach((item) => {
        cartQuantity += item.quantity;
    })
    document.querySelectorAll('.cart-output')
    .forEach((output) => {
    output.innerHTML = cartQuantity;
    });
}


document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', () => {
    const productId = button.dataset.productId;

   addToCart(productId);
   updateCartQuantity()

const addedText = document.querySelector(`.js-added-class-${productId}`);
addedText.classList.replace('opacity-0', 'opacity-100');

setTimeout(() => {
addedText.classList.replace('opacity-100', 'opacity-0');
}, 2000);

})
})