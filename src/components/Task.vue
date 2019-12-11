<template lang="pug">
	.content-wrapper
		section
			.container
				.task-list__header
					h1.ui-title-1 Tasks
					.buttons-list
						.button.button--round.button-default(
							@click ="filter = 'active'"
							:class="{ activeButton: filter === 'active' }"
						) Active
						.button.button--round.button-default(
							@click ="filter = 'completed'"
							:class="{ activeButton: filter === 'completed' }"
						) Completed
						.button.button--round.button-default(
							@click ="filter = 'all'"
							:class="{ activeButton: filter === 'all' }"
						) All
				.task-list
					transition-group(name="taskList")
						.task-item(
							v-for="task in tasksFilter"
							:key="task.id"
							:class="{ completed: task.completed }"
						)
							.ui-card.ui-card--shadow
								.task-item__info
									.task-item__main-info
										span.ui-label.ui-label--light {{ task.whatWatch }}
										span Total time: {{ task.time }}
									span.button-close
								.task-item__content
									.task-item__header
										.ui-checkbox-wrapper
											input.ui-checkbox(
												type='checkbox'
												v-model="task.completed"
											)
										span.ui-title-3 {{ task.title }}
									.task-item__body
										p.ui-text-regular {{ task.description }}
									.task-item__footer
										.tag-list.tag-list--all
											.ui-tag__wrapper(
												v-for="tag in task.tags"
												:key="tag.title"
											)
												.ui-tag
													span.tag-title {{ tag.title }}


</template>

<script>
	export default {
		data () {
			return {
				filter: 'active'
			}
		},
		computed: {
			tasksFilter () {
				if (this.filter === 'active') {
					return this.$store.getters.taskNotCompleted
				} else if (this.filter === 'completed') {
					return this.$store.getters.taskCompleted
				} else if (this.filter === 'all') {
					return this.$store.getters.tasks
				}
				return this.filter === 'active'
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.task-list__header
		display flex
		justify-content space-between
		.ui-title-1
			margin-right 25px
		.buttons-list
			margin-top 8px
			.button
				margin-right 15px
				&:last-child
					margin-right 0

	.activeButton
		background-color #444ce0
		color white

	.task-item
		margin-bottom 20px
		&:last-child
			margin-bottom 0
		&.completed
			.ui-title-3
				text-decoration line-through
				color #909399

	.ui-label
		margin-right 8px

	.task-item__info
		display flex
		align-items center
		justify-content space-between
		margin-bottom 20px
		.button-close
			width 20px
			height @width

	.task-item__header
		display flex
		align-items baseline
		margin-bottom 18px
		.ui-checkbox-wrapper
			margin-right 8px
			display flex
			align-items center
		.ui-title-3
			margin-bottom 0

	.ui-tag__wrapper
		margin-right 12px
		&:last-child
			margin-right 0

	.task-item__footer
		margin-top 14px
</style>