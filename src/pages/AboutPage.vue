<script setup>
import { AppState } from '@/AppState';
import PostList from '@/components/PostList.vue';
import { postService } from '@/services/PostService';
import Pop from '@/utils/Pop';
import { computed, ref } from 'vue';

const posts = computed(() => AppState.posts)

const editableSearchQuery = ref('')

async function searchPosts() {
  try {
    await postService.searchPosts(editableSearchQuery.value)
  }
  catch (error) {
    Pop.error(error);
  }
}


</script>

<template>
  <div class="container-fluid">
    <h2>Search the Network</h2>
    <form @submit.prevent="searchPosts()">
      <label for="search" class="form-label">Enter Search</label>
      <input v-model="editableSearchQuery" type="text" id="search" class="form-control"
        aria-describedby="passwordHelpBlock">
      <div id="passwordHelpBlock" class="form-text">
        Feel free to search for anything you like on the Network!
      </div>
      <button type="submit" class="btn btn-outline-primary mdi mdi-check"></button>
    </form>
    <section v-for="post in posts" :key="post.id" class="row m-4">
      <PostList :post-prop="post" />
    </section>
  </div>


</template>

<style scoped lang="scss"></style>