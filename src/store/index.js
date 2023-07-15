import Vuex from 'vuex'
import logIn from './modules/logIn'
import appcommon from './modules/appcommon';

const state = {
  author: ''
}
const actions = {}
const mutations = {
  setAuthor(state, value){
      state.author = value;
  }
}
const store = new Vuex.Store({
  modules: {
      logIn,
      pub: appcommon,
  },
  state,
  mutations,
  actions,
})
export default store;