<template>
  <kt-comment-input class="comment-input">
    <div class="comment-input__wrapper" 
      :class="{'comment-input__wrapper--focus' : textFocused}">

      <div class="comment-input__quote">
        <div class="comment-quote__name">Reply to someone</div>
        <div class="comment-quote__close">
          <i class="yoco">close</i>
        </div>
      </div>
            <div class="comment-input__reply">
              <div class="comment-input__avatar">
                <img src="https://picsum.photos/200/200">
              </div>
              <div class="comment-input__input">
                <textarea 
                @focus="textFocused=true" 
                @blur="textFocused=false"
                @input="updateHeight"
                ref="textarea"
                >
                </textarea>
              </div>
              <div class="comment-input__button">
                <button class="text">post</button>
              </div>
              </div>
    </div>
  </kt-comment-input>
</template>

<script>

export default {
  name: 'Kt-CommentInput',
  data() {
    return {
      textFocused: false,
    }
  },
  methods: {
    updateHeight() {
      this.$refs.textarea.style.height = '1.3rem'
      var height = this.$refs.textarea.scrollHeight
      this.$refs.textarea.style.height = `${height}px`
    }
  }
}
</script>


<style lang="scss" scoped>
.comment-input {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  bottom: 0;
  background: #f8f8f8;
}
.comment-input__wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: .8rem;
  border: 1px solid #dbdbdb;
  background: #fff;
  border-radius: .1rem; 
  &--focus {
    border: 1px solid #bbb;
  }
}
.comment-input__reply {
  display: flex;
  width: 100%;
  padding: .4rem;
  align-items: center;
}
.comment-input__quote {
  background: #f8f8f8;
  color: #a8a8a8;
  width: 100%;
  padding: .4rem;
  display: flex;
}
.comment-quote__name {
  flex: 1 1;
}
.comment-input__avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  flex: 0 0 2rem;
  img {
    border-radius: 100%;
    height: 100%;
    width: 100%;
  }
}
.comment-input__input {
  flex: 1 1;
  textarea {
    resize: none;
    width: 100%;
    padding: .4rem .8rem;
    border: 0;
    line-height: 1rem;
    height: 1.6rem;
    &:focus {
      outline: none;
    }
  }
}
.comment-input__button {
  flex: 0 0;
  line-height: 2rem;
}
</style>
