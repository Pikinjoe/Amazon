import {cartItem, removeFromCart, calculateCartQuantity, updateNewCartQuantity, updateDeliveryOption} from "../javascript/cart.js";
import {products, getProduct} from "../javascript/product.js";
import {formatCurrency} from "../utility/money.js";
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from "../javascript/deliveryOptions.js";
import {renderPaymentSummary} from "./paymentSummary.js";


export function renderOrderSummary() {
    
    function updateCartQuantity() {
    calculateCartQuantity();
    }

    updateCartQuantity();

    let cartSummaryHTML = '';

    cartItem.forEach(cart => {
        const productId = cart.productId;

        const sameProduct = getProduct(productId);

    const deliveryOptionId = cart.deliveryOptionId; 

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

        
        cartSummaryHTML += `
            <div class="border-gray-300 border rounded-md mb-2 js-cart-container-${sameProduct.id}">
                <div class="w-11/12 mx-auto py-4">
                    <p class="font-bold text-lg text-green-700 mb-4">
                        Delivery date: ${dateString}
                    </p>
                    <div class="lg:flex lg:gap-8">
                        <div class="mb-4 flex gap-3 justify-center lg:w-3/5 overflow-hidden">
                            <div class="basis-1/3">
                                <img src="../${sameProduct.image}" >
                            </div>
                            <div class="basis-2/3">
                                <p class="font-bold mb-2">${sameProduct.name}</p>
                                <p class="text-red-700 font-bold mb-2">$${formatCurrency(sameProduct.priceCent)}</p>
                                <div class="flex flex-wrap gap-1 sm:gap-2">
                                    <p>
                                        Quantity: <span class="quantity-label js-quantity-label-${sameProduct.id}">${cart.quantity}</span>
                                    </p>
                                    <span class="text-blue-400 cursor-pointer update-link" data-product-id="${sameProduct.id}">
                                        Update
                                    </span>
                                    <input class="w-8 h-6 border border-solid quantity-input hidden js-quantity-input-${sameProduct.id}">
                                    <span class="save-quantity-link hidden cursor-pointer" data-product-id="${sameProduct.id}">
                                        Save
                                    </span>
                                    <span class="text-blue-400 cursor-pointer delete-link" data-product-id="${sameProduct.id}">
                                        Delete
                                    </span>
                                </div>
                            </div>
                        </div>    
                        
                        <div class="lg:w-2/5">
                            <p class="font-bold">Choose a delivery option:</p>
                            ${deliveryOptionsHTML(sameProduct, cart)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    function deliveryOptionsHTML(sameProduct, cart) {
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
          const dateString = calculateDeliveryDate(deliveryOption);
            const priceString = deliveryOption.priceCent === 0
                ? 'FREE'
                :`${formatCurrency(deliveryOption.priceCent)} -`; 

        const isChecked = deliveryOption.id === cart.deliveryOptionId;

        html += `
            <div class="my-3 flex items-center gap-2 js-delivery-option" data-product-id="${sameProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked' : ''} name="${sameProduct.id}" class="w-5 h-5 cursor-pointer">
                <div>
                    <p class="text-green-700 font-medium">
                        ${dateString}
                    </p>
                    <p class="text-gray-500">
                        ${priceString} Shipping
                    </p>
                </div>
            </div>
        `  
        });

        return html;
    };

    document.querySelector('.checkout_container')
        .innerHTML = cartSummaryHTML;

    document.querySelectorAll('.delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId
                removeFromCart(productId);
                
                renderOrderSummary();
                renderPaymentSummary();
                updateCartQuantity();
            });
        });

    document.querySelectorAll('.update-link')
        .forEach(link => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                const quantityInput = document.querySelector(`
                    .js-cart-container-${productId} .quantity-input
                `);
                const saveLink = document.querySelector(`
                    .js-cart-container-${productId} .save-quantity-link
                `);
                const quantityLabel = document.querySelector(`
                    .js-cart-container-${productId} .quantity-label
                `);
        
                quantityInput.classList.remove('hidden');
                saveLink.classList.remove('hidden');
                link.classList.add('hidden');
                quantityLabel.classList.add('hidden');

            });
        });

    document.querySelectorAll('.save-quantity-link')
        .forEach(link => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                const quantityInput = document.querySelector(`
                    .js-cart-container-${productId} .quantity-input
                `);
                const updateLink = document.querySelector(`
                    .js-cart-container-${productId} .update-link
                `);
                const quantityLabel = document.querySelector(`
                    .js-cart-container-${productId} .quantity-label
                `);
        
                quantityInput.classList.add('hidden');
                updateLink.classList.remove('hidden');
                link.classList.add('hidden');
                quantityLabel.classList.remove('hidden');
                
                const quantityValue = document.querySelector(`
                    .js-quantity-input-${productId}
                `);
                const newQuantity = Number(quantityValue.value);

                if (newQuantity < 0 || newQuantity >=1000) {
                    alert('Quantity must be at least 0 and less than 1000');
                    return;
                }
                updateNewCartQuantity(productId, newQuantity);

                
                const quantityLabelNumber = document.querySelector(
                    `.js-quantity-label-${productId}`
                );
                quantityLabelNumber.innerHTML = newQuantity;
                renderPaymentSummary()
                updateCartQuantity();
            })
        });

        document.querySelectorAll('.js-delivery-option')
            .forEach(element => {
                element.addEventListener('click', () => {
                    const {productId, deliveryOptionId} = element.dataset;
                    updateDeliveryOption(productId, deliveryOptionId);
                    renderOrderSummary();
                    renderPaymentSummary();
                    updateCartQuantity();
                });
            }); 
            
};