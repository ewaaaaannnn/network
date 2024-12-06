import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ad } from "@/models/Ad.js"
import { AppState } from "@/AppState.js"

class AdService {
  async getAds() {
    const response = await api.get('api/ads')
    logger.log('Got Ads', response.data)
    const ads = response.data.map(adPOJO => new Ad(adPOJO))
    AppState.ads = ads
  }

}

export const adService = new AdService()