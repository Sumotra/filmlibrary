<template lang="pug">
	.content-wrapper
		section
			.container
				.auth
					.auth__banner
						h1.ui-title-1 Hello
						img(src="../../assets/kino.png")
					.auth__form
						span.ui-title-1 Login
						form(
						@submit.prevent="onSubmit"
						)
							.form-item(
							:class="{ errorInput: $v.email.$error }"
							)
								input(
								type="email"
								placeholder="Email"
								v-model="email"
								:class="{ error: $v.email.$error }"
								@change="$v.email.$touch()"
								@blur="$v.email.$touch()"
								)
								span.error(v-if="!$v.email.required") Field is required
								span.error(v-if="!$v.email.email") Email is not correct
							.form-item(
							:class="{ errorInput: $v.password.$error }"
							)
								input(
								type="password"
								placeholder="Password"
								v-model="password"
								:class="{ error: $v.password.$error }"
								@change="$v.password.$touch()"
								@blur="$v.password.$touch()"
								)
								span.error(v-if="!$v.password.required") Field is required
								span.error(v-if="!$v.password.minLength")
									| Password must have at least {{ $v.password.$params.minLength.min }} letters
							.buttons
								.buttons-list
									button.button.button-primary(
									type="submit"
									) Login
									.buttons-list.buttons-list--info
										p.submit-text(v-if="submitStatus === 'OK'") Welcome back!
										p.submit-text.submit-text_error(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
										p.submit-text(v-else) {{ submitStatus }}
								.buttons-list.buttons-list--login
									span Need account?
										router-link(
										to="/registration"
										) Create here
</template>

<script>
	import { required, email, minLength } from 'vuelidate/lib/validators'
	export default {
		data() {
			return {
				email: '',
				password: '',
				submitStatus: null,
			}
		},
		validations: {
			email: {
				required,
				email
			},
			password: {
				required,
				minLength: minLength(6)
			}
		},
		methods: {
			onSubmit () {
				this.$v.$touch()
				if (this.$v.$invalid) {
					this.submitStatus = 'ERROR'
				} else {
					const user = {
						email: this.email,
						password: this.password
					}
					this.$store.dispatch('loginUser', user)
						.then(() => {
							console.log('LOGIN!');
							this.submitStatus = 'OK';
							this.$router.push('/')
						})
						.catch(err => {
							console.log('error');
							console.log(err);
							this.submitStatus = err.message
						})
				}
			}
		},
		computed: {
			loading () {
				return this.$store.getters.loading
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.auth
		display flex
		margin 0 auto
		&__form
			flex-basis 55%
			min-width 500px
		&__banner
			flex-basis 45%
			text-align center
		img
			width 80%

	.form-item
		position relative
		display flex
		flex-direction column
		margin-bottom 8px
		.error
			display none
		&.errorInput
			.error
				display block

	input
		&.error
			border-color #fc5c65
			animation shake .3s

	span.error
		color #fc5c65
		font-size 10px
		line-height 1.2em
		position absolute
		bottom 0
		left 14px

	.buttons
		display flex
		justify-content space-between

	.buttons-list--login
		margin-left 25px
		line-height 34px
		a
			color #444ce0
			margin-left 5px
			&:hover
				text-decoration underline

	.submit-text
		font-size 13px
		line-height 3em
		margin-left 2px
		&_error
			color #fc5c65

</style>