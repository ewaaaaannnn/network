<script setup>
import { Post } from '@/models/Post';

defineProps({
  postProp: { type: Post, required: true }
})
</script>

<template>
  <div class="col-md-9 p-3 border border-primary rounded shadow">
    <img class="creator-img" :src="postProp.creator.picture" alt="">
    <h4>{{ postProp.creator.name }}</h4>
    <p>{{ postProp.createdAt.toLocaleString() }}</p>
    <p>{{ postProp.body }}</p>
  </div>
</template>

<style scoped lang="scss">
.creator-img {
  height: 4rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}
</style>