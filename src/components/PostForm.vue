<script setup>
import { postService } from '@/services/PostService';
import Pop from '@/utils/Pop';
import { ref } from 'vue';



const editablePostData = ref({
  body: '',
  imgUrl: ''
})

async function createPost() {
  try {
    await postService.createPost(editablePostData.value)
    editablePostData.value = {
      body: '',
      imgUrl: ''
    }
    Pop.success('Post Successfully Created')
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>

<template>
  <form @submit.prevent="createPost()">
    <div class="mb-3">
      <label for="body" class="form-label">Create a Post!</label>
      <textarea v-model="editablePostData.body" type="text" class="form-control" id="body" rows="3"></textarea>
    </div>
    <div class="mb-3">
      <label for="imgUrl" class="form-label">Image</label>
      <input v-model="editablePostData.imgUrl" type="url" class="form-control" id="imgUrl">
    </div>
    <button type="submit" class="btn btn-outline-primary rounded-pill">Post</button>
  </form>
</template>

<style scoped lang="scss"></style>