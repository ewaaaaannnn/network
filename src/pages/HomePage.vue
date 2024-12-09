<script setup>
import { AppState } from '@/AppState';
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { postService } from '@/services/PostService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)
const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

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

async function changePage(pageNumber) {
  logger.log('Changing Page')
  try {
    await postService.changeHomePage(pageNumber)
  }
  catch (error) {
    Pop.error(error);
  }
}




</script>

<template>
  <PostForm v-if="account" />
  <div class="container-fluid">
    <section v-for="post in posts" :key="post.id" class="row m-4">
      <PostList :post-prop="post" />
    </section>
    <div class="d-flex justify-content-end align-center">
      <button @click="changePage(currentPage - 1)" class="btn btn-outline-primary mdi mdi-chevron-left"></button>
      <p class="mx-2">Page {{ currentPage }} of {{ totalPages }}</p>
      <button @click="changePage(AppState.currentPage + 1)"
        class="btn btn-outline-primary mdi mdi-chevron-right"></button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
