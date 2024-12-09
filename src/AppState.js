import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {import('./models/Post.js').Post[]} user info from the database*/
  posts: [],


  /** @type {import('./models/Ad.js').Ad[]} user info from the database*/
  ads: [],


   /** @type {import('./models/Account.js').Account} profile information separate from account*/
   activeProfile: null,

   currentPage: 0,
    totalPages: 0
})

