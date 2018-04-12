<template>
  <kt-comment class="comment">
    <div class="comment__avatar">
      <img src="https://picsum.photos/200/200">
    </div>
    <div class="comment__wrapper">
      <div class="comment__info">
        <div class="info__name" v-text="name" />
        <div class="info__time">2018-04-02 14:30</div>
      </div>
      <div class="comment__text" v-text="message">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis pulvinar est, sed tempus risus.
      </div>
      <div class="comment__action">
        <div class="action__reply">
          <i class="yoco">comment</i> Reply
        </div>
        <div class="action__more">
          <i class="yoco">dots</i>
          <div class="comment__options">
            <a>Edit</a>
            <a>Delete</a>
          </div>
        </div>
      </div>
      <div v-for="reply in replies" :key="reply.name">
        <KtCommentReply :name="reply.name" :message="reply.message" />
      </div>
    </div>
  </kt-comment>
</template>


<script>
import KtCommentReply from './CommentReply.vue';

export default {
  name: 'Kotti-Comment',
  props: {
    name: '',
    time: '',
    message: '',
    replies: Array,
  },
  components : {
    KtCommentReply
  },
  computed: {
    styleObject() {
      return {
        'avatar': true,
        'avatar-selected': this.selected
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  flex-flow: row;
  padding: .4rem 0;
  border-bottom: 1px solid #dbdbdb;
}
.comment__avatar {
  width: 2rem;
  height: 2rem;
  flex: 0 0 2rem; 
  border-radius: 100%;
  background: #ddd;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
}
.comment__wrapper {
  width: 100%;
  margin-left: .4rem;
  display: flex;
  flex-direction: column;
}
.comment__info {
  width: 100%;
  display: flex;
  font-size: .7rem;
  line-height: 1.2rem;
  flex-direction: row;
}
.info__name {
  flex: 1 1;
  font-weight: 600;
}
.info__time {
  flex: 1 1;
  color: #a8a8a8;
  text-align: right;
}
.comment__text {
  font-size: .7rem;
  line-height: 1.1rem;
}
.comment__action {
  display: flex;
  flex-direction: row;
  font-size: .6rem;
  color: #A8A8A8;
  text-transform: uppercase;
  font-weight: 600;
  line-height: 1.2rem;
  i {
    font-size: .8rem;
  }
}
.action__reply {
  flex: 1;
}
.action__more {
  text-align: right;
  position: relative;
  &:hover {
    cursor: pointer;
    color: #8a8a8a;
    .comment__options {
      display: block;
    }
  }
}
.comment__options {
  position: absolute;
  top: 1rem;
  right: 0;
  height: auto;
  padding: .8rem;
  text-align: left;
  background: #FFFFFF;
  border-radius: .1rem;
  box-shadow: 0 0 4px #ddd;
  display: none;
  a {
    padding: .2rem 0;
    display: block;
  }
}
</style>

