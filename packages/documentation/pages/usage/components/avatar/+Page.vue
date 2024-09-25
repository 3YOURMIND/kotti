<script setup>
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

import { KtAvatar } from '@3yourmind/kotti-ui'

const component = KtAvatar
</script>

# Markdown This page is written in _Markdown_. Interactive components can be
included in the Markdown.
<ComponentInfo v-bind="{ component }" />
