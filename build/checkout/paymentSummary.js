import {cartItem} from "../javascript/cart.js";
import {getProduct} from "../javascript/product.js";
import {getDeliveryOption} from "../javascript/deliveryOptions.js";
import {formatCurrency} from "../utility/money.js";



export function renderPaymentSummary() {
    let productPriceCent = 0;
    let shippingPriceCent = 0;
cartItem.forEach(cart => {
    const product = getProduct(cart.productId);
    productPriceCent += product.priceCent * cart.quantity;

    const deliveryOption = getDeliveryOption(cart.deliveryOptionId);
    shippingPriceCent += deliveryOption.priceCent;
});

const totalBeforeTaxCent = productPriceCent + shippingPriceCent;
const taxCent = totalBeforeTaxCent * 0.1;
const totalCent = totalBeforeTaxCent + taxCent;

let cartQuantity = 0;

cartItem.forEach((item) => {
    cartQuantity += item.quantity;
})

const paymentSummaryHTML =
`
    <div class="w-11/12 mx-auto py-4">
        <p class="font-bold text-lg capitalize">order summary</p>
        <div class="my-2 flex justify-between">
            <p class="font-semibold">Items: (${cartQuantity})</p>
            <p>
                $${formatCurrency(productPriceCent)}
            </p>
        </div>
        <div class="my-2 flex justify-between">
            <p>Shipping & handling:</p>
            <p>
                $${formatCurrency(shippingPriceCent)}
            </p>
        </div>
        <div class="w-14 h-[1px] border-gray-300 border flex ml-auto"></div>
        <div class="my-2 flex justify-between">
            <p>Total before tax:</p>
            <p>
                $${formatCurrency(totalBeforeTaxCent)}
            </p>
        </div>
        <div class="my-2 flex justify-between">
            <p>Estimated tax (10%):</p>
            <p>
                $${formatCurrency(taxCent)}
            </p>
        </div>
        <div class="w-full h-[1px] border-gray-300 border"></div>
        <div class="my-2 flex justify-between text-red-700 font-semibold text-xl">
            <p>Order total:</p>
            <p>
                $${formatCurrency(totalCent)}
            </p>
        </div>
        <div class="flex items-center gap-1 capitalize text-lg my-4">
            <p>use paypal</p>
            <input type="checkbox" class="w-5 h-5 ml-1 cursor-pointer">
        </div>
        <div class="my-2">
            <button class="btn bg-yellow-400 hover:bg-yellow-500 py-2 px-4 w-full text-sm rounded-lg">Place your order</button>
        </div>
    </div>
`;

document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}