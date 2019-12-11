// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.min.css'
import './stylus/main.styl'

import App from './App'
import router from './router'
import store from './store'

// Firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(
	Vuelidate,
	Uimini
)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {App},
	template: '<App/>',
	created () {
		var firebaseConfig = {
				apiKey: "AIzaSyBtz3f1DR37D4SF0VkQAFmBMeAxH-GJzUs",
				authDomain: "flmlbr.firebaseapp.com",
				databaseURL: "https://flmlbr.firebaseio.com",
				projectId: "flmlbr",
				storageBucket: "flmlbr.appspot.com",
				messagingSenderId: "729384397755",
				appId: "1:729384397755:web:8ac0cd0f49a0143a36729e"
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
	}
})
