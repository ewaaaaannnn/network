import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Post } from "@/models/Post.js"

class PostService {
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
    const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = posts
  }
  async getPosts() {
    AppState.posts =[]
    const response = await api.get('api/posts')
    logger.log('Got Posts', response.data)
    const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = posts
  }
  
}


export const postService = new PostService()