import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cartWishlist', () => {
    const cart = ref([]);
    const wishlist = ref([]);

    const addToCart = (product) => {
        if (!cart.value.some(item => item.id === product.id)) {
            cart.value.push(product);
        } else {
            cart.value = cart.value.filter(item => item.id !== product.id);
        }
    };

    const removeFromCart = (product) => {
        cart.value = cart.value.filter(item => item.id !== product.id);
    };

    const addToWishList = (product) => {
        if (!wishlist.value.some(item => item.id === product.id)) {
            wishlist.value.push(product);
        } else {
            wishlist.value = wishlist.value.filter(item => item.id !== product.id);
        }
    };

    const removeFromWishList = (index) => {
        wishlist.value = wishlist.value.filter(item => item.id !== index);
    };

    const isInCart = (product) => {
        return cart.value.some(item => item.id === product.id);
    };

    const isInWishList = (product) => {
        return wishlist.value.some(item => item.id === product.id);
    };

    return { cart, wishlist, addToCart, removeFromCart, addToWishList, isInCart, isInWishList, removeFromCart, removeFromWishList};
});
