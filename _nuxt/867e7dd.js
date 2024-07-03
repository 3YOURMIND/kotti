(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{1035:function(e,t,n){"use strict";n.r(t);var o={name:"IndexPage",layout:"fullpage",data:function(){return{KottiReadMe:'<section><h1 align="center">@3yourmind/kotti-ui</h1>\n<p align="center">\n\t<a href="https://npmjs.com/package/@3yourmind/kotti-ui"><img src="https://img.shields.io/npm/dm/@3yourmind/kotti-ui.svg?style=for-the-badge"/></a>\n\t<a href="https://npmjs.com/package/@3yourmind/kotti-ui"><img src="https://img.shields.io/npm/types/@3yourmind/kotti-ui.svg?style=for-the-badge"/></a>\n</p>\n<p align="center">\n\t<a href="https://bundlephobia.com/result?p=@3yourmind/kotti-ui"><img src="https://img.shields.io/bundlephobia/minzip/@3yourmind/kotti-ui.svg?style=for-the-badge"/></a>\n\t<a href="https://www.npmjs.com/package/@3yourmind/kotti-ui"><img src="https://img.shields.io/npm/v/@3yourmind/kotti-ui.svg?style=for-the-badge"/></a>\n</p>\n<table border="0" width="100%">\n<col style="width:33%">\n<col style="width:33%">\n<col style="width:33%">\n<tbody>\n<tr style="border: 0px !important;">\n<td valign="top" style="border: 0px !important;"><b>Complete</b>. The most commonly-needed components are implemented in Kotti. More components will be implemented when there is a specific need for them.</td>\n<td valign="top" style="border: 0px !important;"><b>TypeScript Support</b>. Kotti is transitioning to a fully TypeScript-based code-base. While Vue doesn’t support all TS features, we believe that it’s still benefitial in the supported cases.</td>\n<td valign="top" style="border: 0px !important;"><b>Modern</b>. Kotti aims to be a modern UI framework, regularly iterating over the existing design and adjusting it with newer UX improvements.</td>\n</tr>\n<tr style="border: 0px !important;">\n<td valign="top" style="border: 0px !important;"><b>Consistent</b>. The goal is to provide consistent, intuitive, and easy-to-use Vue components that users can immediately understand. Similar components shouldn’t defy expectations.</td>\n<td valign="top" style="border: 0px !important;"><b>Fail-fast</b>. We believe that it’s better to error early than to have hard-to-catch bugs due to API misuse. Our components provide prop validation to catch common mistakes and throw errors in unexpected situations.</td>\n<td valign="top" style="border: 0px !important;"><b>Open-Source</b>. Kotti is licensed under the MIT License — one of the most-permissible software licenses out there. Feel free to fork, modify, and use it. For any project you want.</td>\n</tr>\n</tbody>\n</table>\n<h2>Installation</h2>\n<pre>\n<a href="https://yarnpkg.com">yarn</a> add <a href="https://yarnpkg.com/en/package/@3yourmind/kotti-ui">@3yourmind/kotti-ui</a>\n</pre>\n<p>or</p>\n<pre>\n<a href="https://npmjs.com">npm</a> install --save <a href="https://npmjs.com/package/@3yourmind/kotti-ui">@3yourmind/kotti-ui</a>\n</pre>\n<h2>Documentation &amp; Usage</h2>\n<p><strong>Documentation</strong>: <a href="https://3yourmind.github.io/kotti/">https://3yourmind.github.io/kotti/</a></p>\n<pre><code class="language-typescript"><span class="hljs-comment">// in main.ts / entrypoint</span>\n<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>\n<span class="hljs-keyword">import</span> KottiUI <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@3yourmind/kotti-ui&#x27;</span>\n<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@3yourmind/kotti-ui/dist/style.css&#x27;</span>\n\n<span class="hljs-comment">// (optional) register all KtComponents globally</span>\nVue.use(KottiUI)\n\n<span class="hljs-comment">// Alternatively, import the components you need</span>\n<span class="hljs-keyword">import</span> { KtForm } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@3yourmind/kotti-ui&#x27;</span>\n\n<span class="hljs-keyword">const</span> CustomVueComponent = {\n\t<span class="hljs-comment">// ...</span>\n\t<span class="hljs-attr">components</span>: {\n\t\t<span class="hljs-comment">//...</span>\n\t\tKtForm,\n\t},\n}\n</code></pre>\n<h2>Packages</h2>\n<table>\n<thead>\n<tr>\n<th style="text-align:right">Name</th>\n<th style="text-align:left">NPM</th>\n<th style="text-align:left">Downloads (Month)</th>\n<th style="text-align:left">Downloads (Total)</th>\n<th style="text-align:left">Size</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style="text-align:right"><a href="/packages/kotti-ui"><code>@3yourmind/kotti-ui</code></a></td>\n<td style="text-align:left"><a href="https://npmjs.com/package/@3yourmind/kotti-ui"><img src="https://img.shields.io/npm/v/@3yourmind/kotti-ui" alt=""></a></td>\n<td style="text-align:left"><img src="https://img.shields.io/npm/dm/@3yourmind/kotti-ui.svg" alt=""></td>\n<td style="text-align:left"><img src="https://img.shields.io/npm/dt/@3yourmind/kotti-ui.svg" alt=""></td>\n<td style="text-align:left"><img src="https://img.shields.io/bundlephobia/minzip/@3yourmind/kotti-ui.svg" alt=""></td>\n</tr>\n<tr>\n<td style="text-align:right"><a href="/packages/yoco"><code>@3yourmind/yoco</code></a></td>\n<td style="text-align:left"><a href="https://npmjs.com/package/@3yourmind/yoco"><img src="https://img.shields.io/npm/v/@3yourmind/yoco" alt=""></a></td>\n<td style="text-align:left"><img src="https://img.shields.io/npm/dm/@3yourmind/yoco.svg" alt=""></td>\n<td style="text-align:left"><img src="https://img.shields.io/npm/dt/@3yourmind/yoco.svg" alt=""></td>\n<td style="text-align:left"><img src="https://img.shields.io/bundlephobia/minzip/@3yourmind/yoco.svg" alt=""></td>\n</tr>\n<tr>\n<td style="text-align:right"><a href="/packages/vue-use-tippy"><code>@3yourmind/vue-use-tippy</code></a></td>\n<td style="text-align:left"><a href="https://npmjs.com/package/@3yourmind/vue-use-tippy"><img src="https://img.shields.io/npm/v/@3yourmind/vue-use-tippy" alt=""></a></td>\n<td style="text-align:left"><img src="https://img.shields.io/npm/dm/@3yourmind/vue-use-tippy.svg" alt=""></td>\n<td style="text-align:left"><img src="https://img.shields.io/npm/dt/@3yourmind/vue-use-tippy.svg" alt=""></td>\n<td style="text-align:left"><img src="https://img.shields.io/bundlephobia/minzip/@3yourmind/vue-use-tippy.svg" alt=""></td>\n</tr>\n</tbody>\n</table>\n<h2>Dependencies</h2>\n<p>Some features of <code>KtFieldFileUpload</code> rely on <a href="https://webrtc.org/"><code>WebRTC</code></a>. This technology should be available on all modern browsers as well as on native clients for all major platforms.</p>\n<p>If you have issues accessing the device\'s camera, include the <a href="https://www.npmjs.com/package/webrtc-adapter"><code>webrtc-adapter</code></a> package.</p>\n<h2>Development Workflow</h2>\n<h3>Initial Setup</h3>\n<p>Remember to use <a href="https://github.com/settings/emails">your GitHub email</a> for this repo</p>\n<pre><code class="language-bash">git <span class="hljs-built_in">clone</span> git@github.com:3yourmind/kotti\n\n<span class="hljs-built_in">cd</span> kotti\n\n<span class="hljs-comment"># configure github email for this repository</span>\ngit config user.email <span class="hljs-string">&quot;123456+githubusername@users.noreply.github.com&quot;</span>\n\n<span class="hljs-comment"># install dependencies</span>\nyarn config <span class="hljs-built_in">set</span> workspaces-experimental <span class="hljs-literal">true</span>\nyarn install\nyarn run lerna bootstrap\n</code></pre>\n<h3>Develop</h3>\n<pre><code class="language-bash"><span class="hljs-comment"># auto-build/watch</span>\nyarn run watch\n</code></pre>\n<p>or</p>\n<pre><code class="language-bash"><span class="hljs-comment"># having to build should hopefully be resolved in a future update</span>\nyarn workspace @3yourmind/sass-node-modules-importer run build\nyarn workspace @3yourmind/yoco run build\nyarn workspace @3yourmind/vue-use-tippy run build\nyarn workspace @3yourmind/kotti-ui run build\n<span class="hljs-comment"># serve at http://localhost:3000</span>\nyarn workspace @3yourmind/documentation run serve\n</code></pre>\n<h3>Handling Rebases</h3>\n<p>There are two workflows to help with rebasing pull requests:</p>\n<ol>\n<li>Rebase<br>\nCommenting <code>/rebase</code> on any pull request will trigger a GitHub Action that rebases the PR.<br>\nThis is best used when attempting to rebase a PR without auto-rebase before merging.</li>\n<li>Auto-Rebase<br>\nAdding the <code>autorebase:opt-in</code> label to any pull request will automatically rebase the PR as soon as it’s out-of-date.<br>\nThis should preferrably be used by the author, as it requires them to be aware of having to use <code>git pull --rebase</code></li>\n</ol>\n<h3>Linting</h3>\n<pre><code class="language-bash"><span class="hljs-comment"># es-lint (with --fix)</span>\nyarn run fix:eslint\n<span class="hljs-comment"># es-lint (without --fix)</span>\nyarn run check:eslint\n\n<span class="hljs-comment"># stylelint (with --fix)</span>\nyarn run fix:stylelint\n<span class="hljs-comment"># stylelint (without --fix)</span>\nyarn run check:stylelint\n</code></pre>\n<h3>Testing</h3>\n<pre><code class="language-bash">yarn run <span class="hljs-built_in">test</span>\n</code></pre>\n<h3>Publishing</h3>\n<p>This monorepo supports a semi-automatic release workflow. To trigger an automatic release:</p>\n<ul>\n<li>make sure that the package that should be auto-released is mentioned in <code>packagesToConsider</code> of <a href="internals/scripts/source/publish.ts">this file</a></li>\n<li>bump the package\'s version in the relevant <code>package.json</code></li>\n<li>merge this change to <code>master</code>. This will trigger the repo\'s <code>publish</code> workflow which publishes any new versions it finds.</li>\n</ul>\n<h4>Kotti</h4>\n<ol>\n<li>\n<p>Prepare a new release draft <a href="https://github.com/3YOURMIND/kotti/releases/new">here</a></p>\n<p>a. Tag format: <code>versions/kotti-ui/1.2.3</code> (select <code>Create new tag: versions/kotti-ui/1.2.3 on publish</code>)</p>\n<p>b. Title format: <code>kotti-ui@1.2.3: tldr of what\'s happening</code></p>\n<p>c. Release notes: Follow guidelines of previous releases</p>\n<p>d. Click on <code>Save draft</code></p>\n</li>\n<li>\n<p>Optional: If you haven\'t already, make sure to functionally test:</p>\n</li>\n</ol>\n<pre><code class="language-bash">yarn run watch <span class="hljs-comment"># or if already merged to master, go to &lt;https://3yourmind.github.io/kotti/&gt;</span>\n</code></pre>\n<ol start="3">\n<li>\n<p>Create a pull request that bumps the version:<br>\na. Update the version in <code>packages/kotti-ui/package.json</code><br>\nb. Commit message format: <code>version(kotti-ui@1.2.3): tldr of what\'s happening</code></p>\n</li>\n<li>\n<p>Merge the pull request and publish the release draft from <code>step 1</code> <a href="https://github.com/3YOURMIND/kotti/releases">here</a></p>\n</li>\n<li>\n<p>Announce the new version in the <code>#kotti</code> slack channel</p>\n</li>\n</ol>\n<h4>Yoco</h4>\n<ol>\n<li>\n<p>Prepare a new release draft <a href="https://github.com/3YOURMIND/kotti/releases/new">here</a></p>\n<p>a. Tag format: <code>versions/yoco/1.2.3</code> (select <code>Create new tag: versions/yoco/1.2.3 on publish</code>)</p>\n<p>b. Title format: <code>Yoco 1.2.3: tldr of what\'s happening</code></p>\n<p>c. Release notes: Follow guidelines of previous releases</p>\n<p>d. Click on <code>Save draft</code></p>\n</li>\n<li>\n<p>Optional: If you haven\'t already, make sure to functionally test:</p>\n</li>\n</ol>\n<pre><code class="language-bash">yarn run watch <span class="hljs-comment"># or if already merged to master, go to &lt;https://3yourmind.github.io/kotti/&gt;</span>\n</code></pre>\n<ol start="3">\n<li>\n<p>Create a pull request that bumps the version:<br>\na. Update the version in <code>packages/yoco/package.json</code><br>\nb. Update the yoco version in <code>packages/kotti-ui/package.json</code> (consider bumping kotti-ui, if the changes need to be used there as well)<br>\nc. Commit message format: <code>version(yoco@1.2.3): tldr of what\'s happening</code></p>\n</li>\n<li>\n<p>Merge the pull request and publish the release draft from <code>step 1</code> <a href="https://github.com/3YOURMIND/kotti/releases">here</a></p>\n</li>\n<li>\n<p>Announce the new version in the <code>#kotti</code> slack channel</p>\n</li>\n</ol>\n<h4>Debugging</h4>\n<p>In case this does not work as expected, you want to check out the <a href="internals/scripts/source/publish.ts">publish script</a> and the <a href=".github/workflows/publish.yml">github workflow definition</a> that drive this action</p>\n<h3>Build</h3>\n<pre><code class="language-bash">yarn run build\n</code></pre>\n<h2>Debugging</h2>\n<h3>Creating tarballs</h3>\n<p>For all packages that are published you can also create a tarball by running</p>\n<pre><code class="language-bash"><span class="hljs-comment"># Create tarballs for all relevant packages</span>\nyarn run tarball\n\n<span class="hljs-comment"># Create tarball for a specific package</span>\nyarn run tarball --filter @3yourmind/yoco\n\n<span class="hljs-comment"># Can be combined with other commands</span>\nyarn run build tarball\n\n<span class="hljs-comment"># How the created tarballs can be installed in another project (yarn@1)</span>\nyarn cache clean &amp;&amp; yarn remove @3yourmind/yoco &amp;&amp; yarn add ../path/to/kotti/packages/yoco/package.tar.gz\n</code></pre>\n<p>See more:</p>\n<ul>\n<li><a href="https://docs.npmjs.com/cli/v6/commands/npm-pack">https://docs.npmjs.com/cli/v6/commands/npm-pack</a></li>\n<li><a href="https://classic.yarnpkg.com/en/docs/cli/add">https://classic.yarnpkg.com/en/docs/cli/add</a></li>\n</ul>\n<h2>Internals</h2>\n<h3>Important Folders</h3>\n<table>\n<thead>\n<tr>\n<th style="text-align:left">Path</th>\n<th style="text-align:left">Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style="text-align:left"><code>packages/documentation</code></td>\n<td style="text-align:left">Nuxt-managed documentation</td>\n</tr>\n</tbody>\n</table>\n<h3>Turborepo Tooling</h3>\n<h4>Debugging</h4>\n<p>The best starting point for debugging turbo is:</p>\n<ol>\n<li>Figure out what turbo command gets run (e.g. by checking <code>package.json</code>)</li>\n<li>Check the relevant tasks in <code>turbo.json</code> and <code>packages/*/turbo.json</code></li>\n</ol>\n<p>The <a href="https://turbo.build/repo/docs">Turborepo Documentation</a> is an excellent resource, also make sure you have the <code>@recommended</code> <code>Vercel.turbo-vsc</code> extension installed as it provides autocomplete and linting for <code>turbo.json</code>.</p>\n<p>It is also possible to <a href="https://turbo.build/repo/docs/reference/command-line-reference/run#--graph">visualize the graph used by <code>turbo run</code></a></p>\n<pre><code class="language-sh"><span class="hljs-comment"># generate a graph of turbo run build (needs graphviz)</span>\nyarn run debug:turbo\n</code></pre>\n</section>\n'}}},r=n(32),component=Object(r.a)(o,(function(){var e=this;return(0,e._self._c)("div",{domProps:{innerHTML:e._s(e.KottiReadMe)}})}),[],!1,null,null,null);t.default=component.exports}}]);