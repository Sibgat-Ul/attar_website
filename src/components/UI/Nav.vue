<template>
    <div class="navbar">
        <ul>
            <li class="logo">
                <RouterLink to="/">
                    Attar
                </RouterLink>
            </li>

            <li>
                <ul class="links">
                    <li>
                        <RouterLink to="#">New Arrivals!</RouterLink>
                    </li>

                    <li>
                        <RouterLink to="#">Gift Package</RouterLink>
                    </li>

                    <li>
                        <RouterLink to="#">Product</RouterLink>
                    </li>

                    <li>
                        <RouterLink to="#">Shop</RouterLink>
                    </li>

                    <li>
                        <RouterLink to="#">
                            <i class="pi pi-shopping-cart"></i>
                        </RouterLink>
                    </li>

                    <li>
                        <RouterLink to="#">
                            <i class="pi pi-heart"></i>
                        </RouterLink>
                    </li>

                    <li>
                        <RouterLink to="#">
                            <i class="pi pi-user"></i>
                        </RouterLink>
                    </li>


                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue';

</script>

<style scoped>

.navbar {
    position: top;
    background-color: #fff;
    top:0;
    left:0;

    font-family: "Nunito-Regular";
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    padding: 1rem 4rem;
    width: 100%;
    height: 6rem;
    top: 0;
    left: 0;
    transition: all 0.3s;
    z-index: 1000;
}

.blur {
    position: fixed;
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    z-index: 1000;
}

.navbar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.navbar .logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.navbar .links {
    display: flex;
    gap: 1.2em; /* space between links */
}

.navbar li {
    display: inline;
}

.navbar a {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    transition: color 0.3s;
}

.navbar a:hover {
    color: #007bff; /* hover effect */
}

.material-icons {
    font-size: 1.5rem;
    vertical-align: middle;
}

</style>