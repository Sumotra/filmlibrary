import firebase from 'firebase/app'

import User from './user_help'

export default {
	state: {
		user: null,

	},
	mutations: {
		setUser (state, payload) {
			state.user = payload
		}
	},
	actions: {
		async registerUser ({commit}, {email, password}) {
			commit('clearError');
			commit('setLoading', true);
			try {
				const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
				commit('setUser', new User(user.user.uid));
				commit('setLoading', false);
				console.log(user)
			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.message);
				throw error;
			}
			// console.log(user)
		}
	},
	getters: {
		user (state) {
			return state.user
		},
		checkUser (state) {
			return state.user !== null
		}
	}
}