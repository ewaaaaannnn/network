import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Post } from "@/models/Post.js"

class PostService {
  async likePost(postId) {
    const response = await api.post(`api/posts/${postId}/like`)
    logger.log(response.data)
    
  }
  async searchPosts(searchQuery) {
    const response = await api.get(`api/posts?query=${searchQuery}`)
    logger.log(response.data)
    this.handleResponseData(response.data)
  }
  async changeHomePage(pageNumber) {
   const response = await api.get(`api/posts?/page=${pageNumber}`)
   logger.log('Changed Page', response.data)
   const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
   AppState.posts = posts
   AppState.currentPage = response.data.page
  AppState.totalPages = response.data.totalPages
  logger.log(AppState.currentPage)
  }
  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    logger.log('Car Deleted', response.data)
    const postIndex = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(postIndex, 1)
    
  }
  async createPost(editablePostData) {
    const response = await api.post('api/posts', editablePostData)
    logger.log('POST CREATED', response.data)
    const post = new Post(response.data)
    AppState.posts.push(post)
  }
  async getPostsbyCreatorId(profileId) {
    AppState.posts =[]
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log('GOT POSTS BY CREATOR', response.data)
    this.handleResponseData(response.data)
  }
  async getPosts() {
    AppState.posts =[]
    const response = await api.get('api/posts')
    logger.log('Got Posts', response.data)
    this.handleResponseData(response.data)
  }

  handleResponseData(responseData){
    const posts = responseData.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = posts
    AppState.currentPage = responseData.page
    AppState.totalPages = responseData.totalPages
  }
  
}


export const postService = new PostService()