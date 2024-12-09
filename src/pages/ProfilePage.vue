<script setup>
import { AppState } from '@/AppState';
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import ProfileModal from '@/components/ProfileModal.vue';
import { postService } from '@/services/PostService';
import { profileService } from '@/services/ProfileService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';



const account = computed(() => AppState.account)
const profile = computed(() => AppState.activeProfile)
const posts = computed(() => AppState.posts)
const route = useRoute()

watch(route, () => {
  getProfileById()
  getPostsbyCreatorId()
}, { immediate: true })

async function getProfileById() {
  try {
    const profileId = route.params.profileId
    await profileService.getProfileById(profileId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getPostsbyCreatorId() {
  try {
    const profileId = route.params.profileId
    await postService.getPostsbyCreatorId(profileId)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}

</script>

<template>
  <div v-if="profile" class="container-fluid bg-light rounded shadow m-2">
    <section class="row">
      <img class="cover-img img-fluid p-2" :src="profile.coverImg" alt="">
    </section>
    <section class="row mx-3">
      <div>
        <img class="creator-img" :src="profile.picture" alt="">
      </div>
      <div class="text-end fs-1">
        <a v-if="profile.github" class="mdi mdi-github" :href="profile.github"></a>
        <a v-if="profile.linkedin" class="mdi mdi-linkedin" href=""></a>
      </div>
      <div class="profile-margin">
        <h2>{{ profile.name }} <span v-if="profile.graduated == true" class="mdi mdi-school"></span></h2>
        <p>{{ profile.class }}</p>
      </div>
      <p>{{ profile.bio }}</p>
      <button v-if="profile.id == account.id" data-bs-toggle="modal" data-bs-target="#postModal" type="button"
        class="btn btn-outline-primary mb-3">Edit
        Profile</button>
    </section>
    <section v-if="profile.id == account.id">
      <PostForm />
    </section>
    <section v-for="post in posts" :key="post.id" class="row my-3 p-3">
      <PostList :post-prop="post" />
    </section>
  </div>


  <ProfileModal v-if="account" />
</template>

<style scoped lang="scss">
.cover-img {
  width: 100%;
  height: 15rem;
  object-fit: cover;
}


.creator-img {
  height: 10rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -19em;
  position: relative;
  top: 8em;
}

.profile-margin {
  margin-top: 3em
}
</style>