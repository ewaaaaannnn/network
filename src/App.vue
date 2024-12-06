<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import Pop from './utils/Pop';
import { adService } from './services/AdService';
import { computed, onMounted } from 'vue';


const ads = computed(() => AppState.ads)


onMounted(() => {
  getAds()
})


async function getAds() {
  try {
    await adService.getAds()
  }
  catch (error) {
    Pop.error(error);
  }
}



</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">

      <div class="row">
        <div class="col-md-8">
          <router-view />
        </div>
        <div class="col-md-3">
          <div v-for="ad in ads" :key="ad.id">
            <img class="my-3 img-fluid ad-img" :src="ad.square" alt="">
          </div>
        </div>
      </div>
    </div>
  </main>
  <footer>
  </footer>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}


.ad-img {
  width: 100%;
  object-fit: cover;
}
</style>
