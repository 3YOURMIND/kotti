import Vue from "vue";
import { storiesOf } from "@storybook/vue";

import KtButton from "../../../packages/kotti-button";

Vue.use(KtButton);

storiesOf("Button", module).add("Button", () => {
  return {
    components: { KtButton },
    template: `<KtButton/>`
  };
});
