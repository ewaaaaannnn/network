<script setup>
import { AppState } from '@/AppState';
import { Post } from '@/models/Post';
import { postService } from '@/services/PostService';
import Pop from '@/utils/Pop';
import { computed } from 'vue';

const props = defineProps({
  postProp: { type: Post, required: true }
})

const account = computed(() => AppState.account)


async function likePost() {
  try {
    const postId = props.postProp.id
    await postService.likePost(postId)
  }
  catch (error) {
    Pop.error(error);
  }
}





async function deletePost() {
  try {
    const message = `Are you sure you would like to delete this post`
    const confirmed = await Pop.confirm(message)
    if (!confirmed) { return }
    const postId = props.postProp.id
    await postService.deletePost(postId)
    Pop.success(`Post Deleted`)
  }
  catch (error) {
    Pop.error(error);
  }


}


</script>

<template>
  <div v-if="postProp" class="col p-3 border border-primary rounded shadow">
    <RouterLink :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }" :title="`Go to Users Profile!`">
      <img class="creator-img" :src="postProp.creator.picture" alt="">
    </RouterLink>
    <div>
      <h4>{{ postProp.creator.name }}</h4>
      <p>{{ postProp.createdAt.toLocaleString() }}</p>
      <p>{{ postProp.body }}</p>
    </div>
    <div class="d-flex justify-content-end">
      <h3 @click="likePost()" class="selectable">{{ postProp.likes.length }} <span class="mdi mdi-heart-outline"></span>
      </h3>
      <button v-if="account?.id == postProp.creatorId" @click="deletePost()"
        class="btn btn-outline-danger mdi mdi-trash-can-outline"></button>
    </div>
    <img class="post-img mt-2" :src="postProp.imgUrl" alt="">
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