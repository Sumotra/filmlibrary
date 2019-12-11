<template lang="pug">
	.content-wrapper
		section
			.container
				.auth
					.auth__banner
						h1.ui-title-1 Hello
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
									:disabled="submitStatus === 'PENDING'"
									) Login
									.buttons-list.buttons-list--info
										p.submit-text(v-if="submitStatus === 'OK'") Thanks for your submission!
										p.submit-text.submit-text_error(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
										p.submit-text(v-if="submitStatus === 'PENDING'") Sending...
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
				repeatPassword: '',
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
					console.log('login!');
					const user = {
						email: this.email,
						password: this.password
					}
					console.log(user);
					this.submitStatus = 'PENDING';
					setTimeout(() => {
						this.submitStatus = 'OK'
					}, 500)
				}
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