<template>
    <div class="dogs-item">
        <div class="img">
            <img :src="image" :alt="name" />
        </div>
        <div class="dogs-item-name">{{ name }}</div>
        <div class="dogs-item-fav" :class="{active: isFav}" @click="toggleFavorites(image)" />
    </div>
</template>

<script>

    import {mapMutations} from 'vuex'

    export default {
        name: "VDogImage",
        props: {
            image: String,
            isFav: Boolean,
        },
        computed: {
            name() {
                const matches = this.image.match(/breeds\/([\w]+)/i)
                if (!matches) return 'Unknown'
                return matches[1].substr(0, 1).toUpperCase()+matches[1].substr(1);
            }
        },
        methods: {
            ...mapMutations({
                toggleFavorites: 'toggleFavorites',
            })
        }
    }
</script>
