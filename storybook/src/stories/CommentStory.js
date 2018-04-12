import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, number, boolean, array, select, color, date, button } from '@storybook/addon-knobs/vue'

import KtComment from '../components/Comment.vue'
import KtCommentReply from '../components/CommentReply.vue'
import KtCommentInput from '../components/CommentInput.vue'

storiesOf('Comment', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const name = text('Name', 'John Doe')
    const message = text('Message', 'Text message')
    return {
      components: { KtComment, KtCommentInput },
      template: `<div><KtComment name="${name}" message="${message}"/><KtCommentInput/></div>`
    }
  })
  .add('Commet with reply', () => {
    const name = text('Name', 'John Doe')
    const message = text('Message', 'Text message')
    const replyName = text('Reply Name', 'Bunny Five\'o')
    const replyMessage = text('Reply Message', 'Text message')
    return {
      components: { KtComment, KtCommentReply, KtCommentInput },
      template: `<KtComment name="${name}" message="${message}"><KtCommentReply name="${replyName}" message="${replyMessage}"/></KtComment>`
    }
  })
