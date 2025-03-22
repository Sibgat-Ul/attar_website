<template>
    <div class="card">
        <img :src="image" alt="Card image" class="card-img">
        
        <div class="card-content">
            <h3 class="card-title"><slot name="title"></slot></h3>
            <div class="card-body">
                <slot></slot>
            </div>
            <div class="card-buttons">
                <button @click="onPrimaryButtonClick">Buy</button>
                <button @click="onSecondaryButtonClick">Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    
    props: {
        image: {
            type: String,
            required: true
        }
    },

    methods: {
        onPrimaryButtonClick() {
            this.$emit('primary-button-click');
        },
        onSecondaryButtonClick() {
            this.$emit('secondary-button-click');
        }
    }
}
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    width: 300px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 16px;
}

.card-title {
    margin: 0;
    font-size: 1.5em;
}

.card-body {
    margin: 16px 0;
}

.card-buttons {
    display: flex;
    justify-content: space-between;
}
</style>