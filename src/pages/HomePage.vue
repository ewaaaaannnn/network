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
  <PostForm v-if="account" />
  <div class="container-fluid">
    <section v-for="post in posts" :key="post.id" class="row m-4">
      <PostList :post-prop="post" />
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
