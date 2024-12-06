<script setup>
import { Post } from '@/models/Post';

defineProps({
  postProp: { type: Post, required: true }
})
</script>

<template>
  <div v-if="postProp" class="col p-3 border border-primary rounded shadow">
    <RouterLink :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }" :title="`Go to Users Profile!`">
      <img class="creator-img" :src="postProp.creator.picture" alt="">
    </RouterLink>
    <h4>{{ postProp.creator.name }}</h4>
    <p>{{ postProp.createdAt.toLocaleString() }}</p>
    <p>{{ postProp.body }}</p>
    <img class="post-img" :src="postProp.imgUrl" alt="">
  </div>
</template>

<style scoped lang="scss">
.creator-img {
  height: 4rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}


.post-img {
  width: 100%;
  max-height: 45rem;
  object-fit: cover;
}
</style>