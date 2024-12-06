import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"

class PostService {
  async getPosts() {
    const response = await api.get('api/posts')
    logger.log('Got Posts', response.data)
    AppState.posts = response.data.posts
  }
  
}


export const postService = new PostService()