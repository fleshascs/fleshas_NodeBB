import includes from 'core-js/library/fn/string/virtual/includes';
import repeat from 'core-js/library/fn/string/virtual/repeat';
import assign from 'core-js/library/fn/object/assign';
//import arrayIncludes from 'core-js/library/fn/array/includes';
//import arrayFind from 'core-js/library/fn/array/find';
import 'core-js/modules/es7.array.includes.js';

String.prototype.includes = includes;
String.prototype.repeat = repeat;
Object.assign = assign;
//Array.prototype.includes = arrayIncludes;
//Array.prototype.find = arrayFind;

if (!HTMLElement.prototype.scrollTo) {
	HTMLElement.prototype.scrollTo = function(left, top) {
		this.scrollTop = top;
		this.scrollLeft = left;
	};
}
