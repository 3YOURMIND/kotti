import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  number,
  boolean,
  array,
  select,
  color,
  date,
  button
} from '@storybook/addon-knobs/vue';

import KtComment from '../packages/kotti-comment';

storiesOf('Comment', module)
  .add('Default', () => ({
  components: { KtComment },
  template: `<KtComment :name="comment.name" :message="comment.message" :replies="replies"/>`,
  data() {
    return {
      comment: {
        name: 'Margaret Atwood',
        message: 'Marine Le Pen, a Fierce Campaigner, Heads to Finale in French Election'
      },
      replies: [
        {
          name: 'Benni',
          message: 'Join Bright Side Now!'
        },
        {
          name: 'Cooky',
          message: 'RE: Your trip to Montreal'
        }
      ]
    };
  }
}));
