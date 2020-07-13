<template>
  <div class="dogs">

    <div class="dogs-list">

      <v-dog-image v-for="(image, i) in favorites" :key="image + '/' + i" :image="image" is-fav/>

    </div>

  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  import VDogImage from './VDogImage'

  export default {

    name: 'Favorites',

    components: {VDogImage},

    computed: {

      ...mapGetters(['favorites'])

    }

  }

</script>
