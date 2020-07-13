<template>
  <div class="dogs">

    <div class="dogs-breeds">
      <div>
        <span @click="breedsVisible = !breedsVisible" class="dogs-breeds-select" :class="{active: breedsVisible}">Породы</span>
        <router-link class="dogs-breeds-btn active" type="reset" :to="{name:'dogs'}" v-if="breedId">{{ getName(breedId) }}</router-link>
      </div>
      <span @click="sorted = !sorted" class="dogs-sort">Сортировать по алфавиту <span class="switcher" :class="{active: sorted}" /></span>
    </div>

    <transition name="slide">
      <div class="dogs-breeds-list" v-if="breedsVisible">
        <div>
          <router-link class="dogs-breeds-btn" exact exact-active-class="" active-class="active" :to="{name: 'dogs'}">Все пёсели</router-link>
        </div>
        <div>

          <template v-for="(group, letter) in breeds">

            <span class="dogs-breeds-letter" :key="letter">{{ letter }}</span>

            <router-link class="dogs-breeds-btn" v-for="{id, name} in group" :key="id" exact exact-active-class="" active-class="active" :to="{name: 'dogs', params:{breedId: id}}">{{name}}</router-link>

          </template>


        </div>

      </div>
    </transition>

    <div class="dogs-list" ref="list">

      <v-dog-image v-for="(image, i) in getImagesList" :key="image + '/' + i" :image="image" :is-fav="isFavorite(image)"/>

    </div>

  </div>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex'
  import VDogImage from './VDogImage'

  export default {

    name: 'Dogs',

    components: {VDogImage},

    props: {
      breedId: String,
    },

    data() {
      return {
        images: [],
        breedsVisible: false,
        sorted: false,
        loading: true,
        tries: 0,
      }
    },

    watch: {
      breedId() {
        this.load()
        this.breedsVisible = false
      },
      sorted() {
        this.breedsVisible = false
      }
    },

    mounted() {
      this.load()
      window.addEventListener('scroll', this.onScrollAndResize);
      window.addEventListener('resize', this.onScrollAndResize);
      this.onScrollAndResize()
    },

    destroyed() {
      window.removeEventListener('scroll', this.onScrollAndResize);
      window.removeEventListener('resize', this.onScrollAndResize)
    },

    computed: {

      ...mapGetters(['breeds', 'favorites']),

      getImagesList() {

        if (!this.sorted) return this.images

        const images = [...this.images]
        images.sort()
        return images

      }

    },

    methods: {

      ...mapActions({
        getBreeds: 'getBreeds',
        getImages: 'getImages',
      }),

      /**
       * Загрузка картинок
       */
      load() {
        this.tries = 0
        Promise.all([ this.getImages(this.breedId), this.getBreeds() ])
                .then(([images]) => this.images = images)
                .catch(() => {}).finally(() => this.loading = false)
      },

      /**
       * Добавить картинок
       */
      add() {

        this.loading = true
        this.getImages(this.breedId)
                .then(images => {

                  let added = false;

                  (images || []).forEach(image => {
                    if (-1 === this.images.indexOf(image)) {
                      this.images.push(image)
                      added = true
                    }
                  })

                  if (!added) this.tries++

                }).catch(() => {}).finally(() => this.loading = false)

      },

      getName(breed) {
        return breed.substr(0, 1).toUpperCase() + breed.substr(1)
      },

      isFavorite(image) {
        return -1 !== this.favorites.indexOf(image)
      },

      onScrollAndResize() {

        if (this.loading || this.tries > 3) return;

        if (this.$refs.list.clientTop + this.$refs.list.clientHeight - window.scrollY - 300 < window.innerHeight) {
          this.add()
        }

      },

    }

  }
</script>
