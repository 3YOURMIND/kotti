<template>
  <kt-comment-reply class="comment-reply">
    <div class="avatar">
      <img src="https://picsum.photos/200/200">
    </div>
    <div class="wrapper">
      <div class="info">
        <div class="name" v-text="name">Brett Patterson</div>
        <div class="time">2018-04-02 14:30</div>
      </div>
      <div class="comment__text" v-text="message">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis pulvinar est, sed tempus risus.
      </div>
      <!-- <div class="comment__action">
        <div class="action__reply">
          <i class="yoco">comment</i> Reply
        </div>
        <div class="action__more">
          <i class="yoco">dots</i>
        </div>
      </div> -->
    </div>
  </kt-comment-reply>
</template>

<script>
export default {
	name: 'Comment-Reply',
	props: {
		name: String,
		message: String,
	},
};
</script>


<style lang="scss" scoped>
.comment-reply {
	display: flex;
	flex-flow: row;
	padding: 0.4rem 0;
	.avatar {
		width: 1.6rem;
		height: 1.6rem;
		flex: 0 0 1.6rem;
		border-radius: 100%;
		background: #ddd;
		img {
			width: 100%;
			height: 100%;
			border-radius: 100%;
		}
	}
	.wrapper {
		width: 100%;
		margin-left: 0.4rem;
		display: flex;
		flex-direction: column;
	}
	.info {
		width: 100%;
		display: flex;
		font-size: 0.65rem;
		line-height: 0.8rem;
		flex-direction: row;
	}
	.name {
		flex: 1 1;
		font-weight: 600;
	}
	.time {
		flex: 1 1;
		color: #a8a8a8;
		text-align: right;
	}
	.text {
		font-size: 0.7rem;
		line-height: 1.1rem;
	}
}
</style>
