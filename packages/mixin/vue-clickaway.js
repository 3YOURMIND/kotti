/**The MIT License (MIT)

Copyright (c) 2015 Denis Karabaza

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
**/
import Vue from 'vue'

export var version = '2.2.2'

var compatible = /^2\./.test(Vue.version)
if (!compatible) {
	Vue.util.warn(
		'VueClickaway ' +
			version +
			' only supports Vue 2.x, and does not support Vue ' +
			Vue.version,
	)
}

// @SECTION: implementation

var HANDLER = '_vue_clickaway_handler'

function bind(el, binding, vnode) {
	unbind(el)

	var vm = vnode.context

	var callback = binding.value
	if (typeof callback !== 'function') {
		if (process.env.NODE_ENV !== 'production') {
			Vue.util.warn(
				'v-' +
					binding.name +
					'="' +
					binding.expression +
					'" expects a function value, ' +
					'got ' +
					callback,
			)
		}
		return
	}

	// @NOTE: Vue binds directives in microtasks, while UI events are dispatched
	//        in macrotasks. This causes the listener to be set up before
	//        the "origin" click event (the event that lead to the binding of
	//        the directive) arrives at the document root. To work around that,
	//        we ignore events until the end of the "initial" macrotask.
	// @REFERENCE: https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
	// @REFERENCE: https://github.com/simplesmiler/vue-clickaway/issues/8
	var initialMacrotaskEnded = false
	setTimeout(function() {
		initialMacrotaskEnded = true
	}, 0)

	el[HANDLER] = function(ev) {
		// @NOTE: this test used to be just `el.containts`, but working with path is better,
		//        because it tests whether the element was there at the time of
		//        the click, not whether it is there now, that the event has arrived
		//        to the top.
		// @NOTE: `.path` is non-standard, the standard way is `.composedPath()`
		var path = ev.path || (ev.composedPath ? ev.composedPath() : undefined)
		if (
			initialMacrotaskEnded &&
			(path ? path.indexOf(el) < 0 : !el.contains(ev.target))
		) {
			return callback.call(vm, ev)
		}
	}

	document.documentElement.addEventListener('click', el[HANDLER], false)
}

function unbind(el) {
	document.documentElement.removeEventListener('click', el[HANDLER], false)
	delete el[HANDLER]
}

export var directive = {
	bind: bind,
	update: function(el, binding) {
		if (binding.value === binding.oldValue) return
		bind(el, binding)
	},
	unbind: unbind,
}

export var mixin = {
	directives: {
		onClickaway: directive,
	},
}
