import { computed, ref } from 'vue'

const colorScheme = ref<'dark' | 'light'>('light')

export const isDarkMode = computed(() => colorScheme.value === 'dark')
export const setColorScheme = (value: 'dark' | 'light'): void => {
	colorScheme.value = value
}
