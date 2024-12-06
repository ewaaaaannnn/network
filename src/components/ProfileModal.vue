<script setup>
import { AppState } from '@/AppState';
import { accountService } from '@/services/AccountService';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';



const account = computed(() => AppState.account)
onMounted(() => editableAccountData.value = { ...account.value })

const editableAccountData = ref({
  name: '',
  picture: '',
  bio: '',
  coverImg: '',
  github: '',
  linkedin: '',
  class: '',
  graduated: false
})

async function updateAccount() {
  try {
    await accountService.updateAccount(editableAccountData.value)
    Pop.success('Account Changes Saved!')
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>

<template>
  <div class="modal" tabindex="-1" id="postModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Profile</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="updateAccount()">
          <div class="modal-body">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input v-model="editableAccountData.name" type="text" class="form-control" id="name" maxlength="100">
            </div>
            <div class="mb-3">
              <label for="picture" class="form-label">Picture</label>
              <input v-model="editableAccountData.picture" type="url" class="form-control" id="picture" maxlength="500">
            </div>
            <div class="mb-3">
              <label for="bio" class="form-label">Bio</label>
              <textarea v-model="editableAccountData.bio" class="form-control" id="bio" maxlength="1000"
                style="height: 100px"></textarea>
            </div>
            <div class="mb-3">
              <label for="coverImg" class="form-label">Cover Image</label>
              <input v-model="editableAccountData.coverImg" type="url" class="form-control" id="coverImg"
                maxlength="500">
            </div>
            <div class="mb-3">
              <label for="github" class="form-label">GitHub</label>
              <input v-model="editableAccountData.github" type="url" class="form-control" id="github" maxlength="500">
            </div>
            <div class="mb-3">
              <label for="linkedin" class="form-label">LinkedIn</label>
              <input v-model="editableAccountData.linkedin" type="url" class="form-control" id="linkedin"
                maxlength="500">
            </div>
            <div class="mb-3">
              <label for="class" class="form-label">Class</label>
              <input v-model="editableAccountData.class" type="text" class="form-control" id="class" maxlength="100">
            </div>
            <div class="mb-3 form-check">
              <input v-model="editableAccountData.graduated" type="checkbox" class="form-check-input" id="graduated">
              <label class="form-check-label" for="graduated">Graduated</label>
            </div>

          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>