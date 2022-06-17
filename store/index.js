import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		token:null,
		userinfo:{}
	},
	mutations: {
		SET_TOKEN(state, payload){
			console.log(payload);
			state.token = payload;
		},
		SET_userinfo(state, payload){
			state.userinfo = payload;
		},
		
	}
})

export default store
