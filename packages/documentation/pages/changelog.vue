<template>
	<div>
		<h1>Changelog</h1>
		<section v-for="release in sortedReleases" :key="release.tag_name">
			<h2>
				<a
					:href="`#${release.tag_name}`"
					:name="release.tag_name"
					v-text="release.name"
				/>
			</h2>
			<div class="tags">
				<div
					v-if="release.prerelease"
					class="tag"
					style="
						--color: var(--yellow-70);
						--background-color: var(--yellow-20);
					"
				>
					<div class="tag__left">⚠️</div>
					<div class="tag__right" v-text="'Prerelease'" />
				</div>
				<div
					class="tag"
					style="--color: var(--green-70); --background-color: var(--green-20);"
				>
					<div class="tag__left">Tag</div>
					<a
						class="tag__right"
						:href="release.html_url"
						v-text="release.tag_name"
					/>
				</div>
				<div
					class="tag"
					style="
						--color: var(--primary-70);
						--background-color: var(--primary-20);
					"
				>
					<div class="tag__left">Date</div>
					<div
						class="tag__right"
						v-text="dayjs(release.created_at).format('YYYY-MM-DD')"
					/>
				</div>
				<div
					class="tag"
					style="--color: var(--red-70); --background-color: var(--red-20);"
				>
					<div class="tag__left">NPM</div>
					<a
						class="tag__right"
						:href="`https://npmjs.com/package/@3yourmind/kotti-ui/v/${release.tag_name.replace(
							/^v/,
							'',
						)}`"
						v-text="release.tag_name"
					/>
				</div>
				<div
					class="tag"
					style="
						--color: var(--orange-70);
						--background-color: var(--orange-20);
					"
				>
					<div class="tag__left">Released By</div>
					<a class="tag__right" :href="release.author.html_url">
						<img :src="release.author.avatar_url" />
						<div v-text="release.author.login" />
					</a>
				</div>
			</div>
			<!-- eslint-disable-next-line vue/no-v-html -->
			<div class="content" v-html="renderMarkdown(release.body)" />
		</section>
	</div>
</template>

<script lang="ts">
import { Octokit } from '@octokit/rest'
import { Endpoints } from '@octokit/types'
import {
	computed,
	onBeforeMount,
	defineComponent,
	ref,
	Ref,
} from '@vue/composition-api'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'
import marked from 'marked'
import naturalSort from 'natural-sort'

const octokit = new Octokit()

const convertPoundToIssueLink = (string: string) =>
	string.replace(
		/#(\d+)/g,
		'[#$1](https://github.com/3YOURMIND/kotti/issues/$1)',
	)

// disable ban-ts-ignore because vscode sees this as an error but nuxt doesn’t
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore layout is not added to the type definition of defineComponent
export default defineComponent({
	name: 'DocumentationPageChangelog',
	layout: 'fullpage',
	setup() {
		const releases: Ref<
			Endpoints['GET /repos/:owner/:repo/releases']['response']['data']
		> = ref([])

		onBeforeMount(async () => {
			releases.value = (
				await octokit.repos.listReleases({
					owner: '3yourmind',
					// eslint-disable-next-line @typescript-eslint/camelcase
					per_page: 1000,
					repo: 'kotti',
				})
			).data
		})

		return {
			dayjs,
			renderMarkdown: (markdown: string) =>
				marked(convertPoundToIssueLink(markdown)),
			releases,
			sortedReleases: computed(() =>
				cloneDeep(releases.value).sort((a, b) =>
					naturalSort({ direction: 'desc' })(a.tag_name, b.tag_name),
				),
			),
		}
	},
})
</script>

<style lang="scss" scoped>
section ::v-deep img {
	display: block;
	overflow: hidden;
	border: 1px solid var(--ui-02);
	border-radius: 5px;
}

section:not(:first-of-type) {
	margin-top: 64px;
}

h2 {
	display: flex;
	align-items: center;

	a {
		color: inherit;
	}
}

.tags {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin: -5px;

	> * {
		margin: 5px;
	}
}

.tag {
	display: flex;
	align-items: stretch;

	overflow: hidden;

	border: 1px solid var(--color);
	border-radius: 3px;

	&__left,
	&__right {
		display: flex;
		align-items: center;
		padding: 2px 8px;

		> *:not(:first-child) {
			margin-left: 5px;
		}
	}

	img {
		width: 1em;
		height: 1em;
	}

	a.tag__right {
		&:hover {
			text-decoration: underline;
		}
	}

	&__left {
		font-weight: bold;
		color: var(--color);
		background-color: var(--background-color);
		border-right: 1px solid var(--color);
	}
}

.content {
	margin-top: 16px;
}
</style>
