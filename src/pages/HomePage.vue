<script setup>
import { AppState } from '@/AppState';
import { postService } from '@/services/PostService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.posts)

onMounted(() => {
  getPosts()
})

async function getPosts() {
  try {
    await postService.getPosts()
  } catch (error) {
    Pop.meow(error)
    logger.error('GETTING POSTS', error)
  }
}




</script>

<template>
  <p>{{ posts }}</p>
</template>

<style scoped lang="scss"></style>
