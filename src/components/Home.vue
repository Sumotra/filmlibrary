<template lang="pug">
	.content-wrapper
		section
			.container
				h1.ui-title-1 Home
				input(
					type="text"
					placeholder="What we will watch?"
					v-model="taskTitle"
					@keyup.enter="newTask"
				)
				textarea(
					type="text"
					v-model="taskDescription"
					@keyup.enter="newTask"
				)
				.option-list
					input.what-watch--radio(
						type="radio"
						id="radioFilm"
						value="Film"
						v-model="whatWatch"
					)
					label(
						for="radioFilm"
					) Film
					input.what-watch--radio(
						type="radio"
						id="radioSerial"
						value="Serial"
						v-model="whatWatch"
					)
					label(
						for="radioSerial"
					) Serial
				// Total time
				.total-time

					// Film time
					.total-time__film(
						v-if="whatWatch === 'Film'"
					)
						span.total-title Total Films Time
						span.time-title Hours
						input.time-input(
							type="number"
							v-model="filmHours"
						)
						span.time-title Minutes
						input.time-input(
							type="number"
							v-model="filmMinutes"
						)
						p {{ filmTime }}

					// Serial Time
					.total-time__serial(
						v-if="whatWatch === 'Serial'"
					)
						span.total-title Total Serials Time
						span.time-title How many season?
						input.time-input(
							type="number"
							v-model="serialSeason"
						)
						span.time-title How many series?
						input.time-input(
							type="number"
							v-model="serialSeries"
						)
						span.time-title How long is one series? (min)
						input.time-input(
							type="number"
							v-model="serialSeriesMinutes"
						)
						p {{ serialTime }}

				// TAG LIST
				// Add  New Tag
				.tag-list.tag-list--add
					.ui-tag__wrapper(
						@click="tagMenuShow = !tagMenuShow"
					)
						.ui-tag
							span.tag-title Add New
							span.button-close(
								:class="{ active: !tagMenuShow }"
							)

				// Show Input
				transition(name="fade")
					.tag-list.tag-list--menu(
						v-if="tagMenuShow"
					)
						input.tag-add--input(
							type="text"
							placeholder="New tag"
							v-model="tagTitle"
							@keyup.enter="newTag"
						)
						.button.button-default(
							@click="newTag"
						) Send

				// All tags
				.tag-list.tag-list--all
					transition-group(
						enter-active-class="animated fadeInRight"
						leave-active-class="animated fadeOutDown"
					)
						.ui-tag__wrapper(
							v-for="tag in tags"
							:key="tag.title"
						)
							.ui-tag(
								@click="addTagUsed(tag)"
								:class="{used: tag.use}"
							)
								span.tag-title {{ tag.title }}
								span.button-close

				.button-list
					.button.button--round.button-primary(
						@click="newTask"
					) Send
</template>

<script>
	export default {
		data() {
			return {
				taskTitle: '',
				taskDescription: '',
				whatWatch: 'Film',

					// Total Time
				// Film
				filmHours: 1,
				filmMinutes: 30,
				// Serial
				serialSeason: 1,
				serialSeries: 11,
				serialSeriesMinutes: 40,

				//Tags
				tagTitle: '',
				tagMenuShow: false,
				tagsUsed: []
			}
		},
		methods: {
			newTag() {
				if (this.tagTitle === '') {
					return
				}
				const tag = {
					title: this.tagTitle,
					use: false
				}
				this.$store.dispatch('newTag', tag);
				this.tagTitle = ''
			},
			newTask() {
				if (this.taskTitle === '') {
					return
				}
				let time;
				if (this.whatWatch === 'Film') {
					time = this.filmTime;
				} else {
					time = this.serialTime;
				}
				const task = {
					title: this.taskTitle,
					description: this.taskDescription,
					whatWatch: this.whatWatch,
					time,
					tags: this.tagsUsed,
					completed: false,
					editing: false
				}
				this.$store.dispatch('newTask', task)
				console.log(task);
				// Reset
				this.taskTitle = '';
				this.taskDescription = '';
				this.tagsUsed = []
				for (let i = 0; i < this.tags.length; i++) {
					this.tags[i].use = false
				}
			},
			getHoursAndMinutes(minutes) {
				let hours = Math.trunc(minutes / 60);
				let min = minutes % 60;
				return hours + ' Hours ' + min + ' Minutes';
			},
			addTagUsed(tag) {
				tag.use = !tag.use;
				if (tag.use) {
					this.tagsUsed.push({
						title: tag.title
					});
				} else {
					this.tagsUsed.splice(tag.title, 1);
				}
			}
		},
		computed: {
			tags () {
				return this.$store.getters.tags
			},
			filmTime() {
				let min = (this.filmHours * 60) + (this.filmMinutes * 1);
				return this.getHoursAndMinutes(min);
			},
			serialTime() {
				let min = this.serialSeason * this.serialSeries * this.serialSeriesMinutes;
				return this.getHoursAndMinutes(min);
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.option-list
		display flex
		align-items baseline
		.what-watch--radio
			margin-right 12px
		label
			margin-right 20px
			&:last-child
				margin-bottom 0

	.total-time
		margin-bottom 28px

	.total-title
		margin-bottom 22px
		display block

	.time-title
		display block
		margin-bottom 6px

	.time-input
		max-width 80px
		margin-right 10px

	// Tags
	.tag-list
		margin-bottom 20px

	.ui-tag__wrapper
		margin-right 18px
		margin-bottom 10px
		&:last-child
			margin-right 0

	.tag-list--add
		.button-close
			transform rotate(0deg)
			&.active
				transform rotate(45deg)

	.tag-list--all
		.ui-tag
			.button-close
				&:before
					transform rotate(90deg)
					transition all .3s ease
				&:after
					transform rotate(0deg)
					transition all .3s ease
			&.used
				background-color: #444ce0
				color #fff
				.button-close
					&:before
					&:after
						background-color: #fff
			&.used .button-close
				&:before
					transform rotate(-45deg)
				&:after
					transform rotate(45deg)

	// Tag Menu Show
	.tag-list--menu
		display flex
		justify-content space-between
		align-items center

	// New Tag Input
	.tag-add--input
		margin-bottom 0
		margin-right 10px
		height 42px

	// Total Time
	.total-time
		p
			margin-bottom 6px
		span
			margin-right 16px
		.task-input
			max-width 80px
			margin-bottom 28px
			margin-right 10px

	.button-list
		display flex
		justify-content flex-end

</style>
