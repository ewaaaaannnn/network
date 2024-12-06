import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Post } from "@/models/Post.js"

class PostService {
  async getPosts() {
    const response = await api.get('api/posts')
    logger.log('Got Posts', response.data)
    const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = posts
  }
  
}


export const postService = new PostService()