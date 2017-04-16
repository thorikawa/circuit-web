(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],2:[function(require,module,exports){
;(function(undefined) {
  'use strict';

  var __instances = {};

  /**
   * This is the sigma instances constructor. One instance of sigma represent
   * one graph. It is possible to represent this grapĥ with several renderers
   * at the same time. By default, the default renderer (WebGL + Canvas
   * polyfill) will be used as the only renderer, with the container specified
   * in the configuration.
   *
   * @param  {?*}    conf The configuration of the instance. There are a lot of
   *                      different recognized forms to instantiate sigma, check
   *                      example files, documentation in this file and unit
   *                      tests to know more.
   * @return {sigma}      The fresh new sigma instance.
   *
   * Instanciating sigma:
   * ********************
   * If no parameter is given to the constructor, the instance will be created
   * without any renderer or camera. It will just instantiate the graph, and
   * other modules will have to be instantiated through the public methods,
   * like "addRenderer" etc:
   *
   *  > s0 = new sigma();
   *  > s0.addRenderer({
   *  >   type: 'canvas',
   *  >   container: 'my-container-id'
   *  > });
   *
   * In most of the cases, sigma will simply be used with the default renderer.
   * Then, since the only required parameter is the DOM container, there are
   * some simpler way to call the constructor. The four following calls do the
   * exact same things:
   *
   *  > s1 = new sigma('my-container-id');
   *  > s2 = new sigma(document.getElementById('my-container-id'));
   *  > s3 = new sigma({
   *  >   container: document.getElementById('my-container-id')
   *  > });
   *  > s4 = new sigma({
   *  >   renderers: [{
   *  >     container: document.getElementById('my-container-id')
   *  >   }]
   *  > });
   *
   * Recognized parameters:
   * **********************
   * Here is the exhaustive list of every accepted parameters, when calling the
   * constructor with to top level configuration object (fourth case in the
   * previous examples):
   *
   *   {?string} id        The id of the instance. It will be generated
   *                       automatically if not specified.
   *   {?array}  renderers An array containing objects describing renderers.
   *   {?object} graph     An object containing an array of nodes and an array
   *                       of edges, to avoid having to add them by hand later.
   *   {?object} settings  An object containing instance specific settings that
   *                       will override the default ones defined in the object
   *                       sigma.settings.
   */
  var sigma = function(conf) {
    // Local variables:
    // ****************
    var i,
        l,
        a,
        c,
        o,
        id;

    sigma.classes.dispatcher.extend(this);

    // Private attributes:
    // *******************
    var _self = this,
        _conf = conf || {};

    // Little shortcut:
    // ****************
    // The configuration is supposed to have a list of the configuration
    // objects for each renderer.
    //  - If there are no configuration at all, then nothing is done.
    //  - If there are no renderer list, the given configuration object will be
    //    considered as describing the first and only renderer.
    //  - If there are no renderer list nor "container" object, it will be
    //    considered as the container itself (a DOM element).
    //  - If the argument passed to sigma() is a string, it will be considered
    //    as the ID of the DOM container.
    if (
      typeof _conf === 'string' ||
      _conf instanceof HTMLElement
    )
      _conf = {
        renderers: [_conf]
      };
    else if (Object.prototype.toString.call(_conf) === '[object Array]')
      _conf = {
        renderers: _conf
      };

    // Also check "renderer" and "container" keys:
    o = _conf.renderers || _conf.renderer || _conf.container;
    if (!_conf.renderers || _conf.renderers.length === 0)
      if (
        typeof o === 'string' ||
        o instanceof HTMLElement ||
        (typeof o === 'object' && 'container' in o)
      )
        _conf.renderers = [o];

    // Recense the instance:
    if (_conf.id) {
      if (__instances[_conf.id])
        throw 'sigma: Instance "' + _conf.id + '" already exists.';
      Object.defineProperty(this, 'id', {
        value: _conf.id
      });
    } else {
      id = 0;
      while (__instances[id])
        id++;
      Object.defineProperty(this, 'id', {
        value: '' + id
      });
    }
    __instances[this.id] = this;

    // Initialize settings function:
    this.settings = new sigma.classes.configurable(
      sigma.settings,
      _conf.settings || {}
    );

    // Initialize locked attributes:
    Object.defineProperty(this, 'graph', {
      value: new sigma.classes.graph(this.settings),
      configurable: true
    });
    Object.defineProperty(this, 'middlewares', {
      value: [],
      configurable: true
    });
    Object.defineProperty(this, 'cameras', {
      value: {},
      configurable: true
    });
    Object.defineProperty(this, 'renderers', {
      value: {},
      configurable: true
    });
    Object.defineProperty(this, 'renderersPerCamera', {
      value: {},
      configurable: true
    });
    Object.defineProperty(this, 'cameraFrames', {
      value: {},
      configurable: true
    });
    Object.defineProperty(this, 'camera', {
      get: function() {
        return this.cameras[0];
      }
    });
    Object.defineProperty(this, 'events', {
      value: [
        'click',
        'rightClick',
        'clickStage',
        'doubleClickStage',
        'rightClickStage',
        'clickNode',
        'clickNodes',
        'doubleClickNode',
        'doubleClickNodes',
        'rightClickNode',
        'rightClickNodes',
        'overNode',
        'overNodes',
        'outNode',
        'outNodes',
        'downNode',
        'downNodes',
        'upNode',
        'upNodes'
      ],
      configurable: true
    });

    // Add a custom handler, to redispatch events from renderers:
    this._handler = (function(e) {
      var k,
          data = {};

      for (k in e.data)
        data[k] = e.data[k];

      data.renderer = e.target;
      this.dispatchEvent(e.type, data);
    }).bind(this);

    // Initialize renderers:
    a = _conf.renderers || [];
    for (i = 0, l = a.length; i < l; i++)
      this.addRenderer(a[i]);

    // Initialize middlewares:
    a = _conf.middlewares || [];
    for (i = 0, l = a.length; i < l; i++)
      this.middlewares.push(
        typeof a[i] === 'string' ?
          sigma.middlewares[a[i]] :
          a[i]
      );

    // Check if there is already a graph to fill in:
    if (typeof _conf.graph === 'object' && _conf.graph) {
      this.graph.read(_conf.graph);

      // If a graph is given to the to the instance, the "refresh" method is
      // directly called:
      this.refresh();
    }

    // Deal with resize:
    window.addEventListener('resize', function() {
      if (_self.settings)
        _self.refresh();
    });
  };




  /**
   * This methods will instantiate and reference a new camera. If no id is
   * specified, then an automatic id will be generated.
   *
   * @param  {?string}              id Eventually the camera id.
   * @return {sigma.classes.camera}    The fresh new camera instance.
   */
  sigma.prototype.addCamera = function(id) {
    var self = this,
        camera;

    if (!arguments.length) {
      id = 0;
      while (this.cameras['' + id])
        id++;
      id = '' + id;
    }

    if (this.cameras[id])
      throw 'sigma.addCamera: The camera "' + id + '" already exists.';

    camera = new sigma.classes.camera(id, this.graph, this.settings);
    this.cameras[id] = camera;

    // Add a quadtree to the camera:
    camera.quadtree = new sigma.classes.quad();

    // Add an edgequadtree to the camera:
    if (sigma.classes.edgequad !== undefined) {
      camera.edgequadtree = new sigma.classes.edgequad();
    }

    camera.bind('coordinatesUpdated', function(e) {
      self.renderCamera(camera, camera.isAnimated);
    });

    this.renderersPerCamera[id] = [];

    return camera;
  };

  /**
   * This method kills a camera, and every renderer attached to it.
   *
   * @param  {string|camera} v The camera to kill or its ID.
   * @return {sigma}           Returns the instance.
   */
  sigma.prototype.killCamera = function(v) {
    v = typeof v === 'string' ? this.cameras[v] : v;

    if (!v)
      throw 'sigma.killCamera: The camera is undefined.';

    var i,
        l,
        a = this.renderersPerCamera[v.id];

    for (l = a.length, i = l - 1; i >= 0; i--)
      this.killRenderer(a[i]);

    delete this.renderersPerCamera[v.id];
    delete this.cameraFrames[v.id];
    delete this.cameras[v.id];

    if (v.kill)
      v.kill();

    return this;
  };

  /**
   * This methods will instantiate and reference a new renderer. The "type"
   * argument can be the constructor or its name in the "sigma.renderers"
   * package. If no type is specified, then "sigma.renderers.def" will be used.
   * If no id is specified, then an automatic id will be generated.
   *
   * @param  {?object}  options Eventually some options to give to the renderer
   *                            constructor.
   * @return {renderer}         The fresh new renderer instance.
   *
   * Recognized parameters:
   * **********************
   * Here is the exhaustive list of every accepted parameters in the "options"
   * object:
   *
   *   {?string}            id     Eventually the renderer id.
   *   {?(function|string)} type   Eventually the renderer constructor or its
   *                               name in the "sigma.renderers" package.
   *   {?(camera|string)}   camera Eventually the renderer camera or its
   *                               id.
   */
  sigma.prototype.addRenderer = function(options) {
    var id,
        fn,
        camera,
        renderer,
        o = options || {};

    // Polymorphism:
    if (typeof o === 'string')
      o = {
        container: document.getElementById(o)
      };
    else if (o instanceof HTMLElement)
      o = {
        container: o
      };

    // If the container still is a string, we get it by id
    if (typeof o.container === 'string')
      o.container = document.getElementById(o.container);

    // Reference the new renderer:
    if (!('id' in o)) {
      id = 0;
      while (this.renderers['' + id])
        id++;
      id = '' + id;
    } else
      id = o.id;

    if (this.renderers[id])
      throw 'sigma.addRenderer: The renderer "' + id + '" already exists.';

    // Find the good constructor:
    fn = typeof o.type === 'function' ? o.type : sigma.renderers[o.type];
    fn = fn || sigma.renderers.def;

    // Find the good camera:
    camera = 'camera' in o ?
      (
        o.camera instanceof sigma.classes.camera ?
          o.camera :
          this.cameras[o.camera] || this.addCamera(o.camera)
      ) :
      this.addCamera();

    if (this.cameras[camera.id] !== camera)
      throw 'sigma.addRenderer: The camera is not properly referenced.';

    // Instantiate:
    renderer = new fn(this.graph, camera, this.settings, o);
    this.renderers[id] = renderer;
    Object.defineProperty(renderer, 'id', {
      value: id
    });

    // Bind events:
    if (renderer.bind)
      renderer.bind(
        [
          'click',
          'rightClick',
          'clickStage',
          'doubleClickStage',
          'rightClickStage',
          'clickNode',
          'clickNodes',
          'clickEdge',
          'clickEdges',
          'doubleClickNode',
          'doubleClickNodes',
          'doubleClickEdge',
          'doubleClickEdges',
          'rightClickNode',
          'rightClickNodes',
          'rightClickEdge',
          'rightClickEdges',
          'overNode',
          'overNodes',
          'overEdge',
          'overEdges',
          'outNode',
          'outNodes',
          'outEdge',
          'outEdges',
          'downNode',
          'downNodes',
          'downEdge',
          'downEdges',
          'upNode',
          'upNodes',
          'upEdge',
          'upEdges'
        ],
        this._handler
      );

    // Reference the renderer by its camera:
    this.renderersPerCamera[camera.id].push(renderer);

    return renderer;
  };

  /**
   * This method kills a renderer.
   *
   * @param  {string|renderer} v The renderer to kill or its ID.
   * @return {sigma}             Returns the instance.
   */
  sigma.prototype.killRenderer = function(v) {
    v = typeof v === 'string' ? this.renderers[v] : v;

    if (!v)
      throw 'sigma.killRenderer: The renderer is undefined.';

    var a = this.renderersPerCamera[v.camera.id],
        i = a.indexOf(v);

    if (i >= 0)
      a.splice(i, 1);

    if (v.kill)
      v.kill();

    delete this.renderers[v.id];

    return this;
  };




  /**
   * This method calls the "render" method of each renderer, with the same
   * arguments than the "render" method, but will also check if the renderer
   * has a "process" method, and call it if it exists.
   *
   * It is useful for quadtrees or WebGL processing, for instance.
   *
   * @param  {?object}  options Eventually some options to give to the refresh
   *                            method.
   * @return {sigma}            Returns the instance itself.
   *
   * Recognized parameters:
   * **********************
   * Here is the exhaustive list of every accepted parameters in the "options"
   * object:
   *
   *   {?boolean} skipIndexation A flag specifying wether or not the refresh
   *                             function should reindex the graph in the
   *                             quadtrees or not (default: false).
   */
  sigma.prototype.refresh = function(options) {
    var i,
        l,
        k,
        a,
        c,
        bounds,
        prefix = 0;

    options = options || {};

    // Call each middleware:
    a = this.middlewares || [];
    for (i = 0, l = a.length; i < l; i++)
      a[i].call(
        this,
        (i === 0) ? '' : 'tmp' + prefix + ':',
        (i === l - 1) ? 'ready:' : ('tmp' + (++prefix) + ':')
      );

    // Then, for each camera, call the "rescale" middleware, unless the
    // settings specify not to:
    for (k in this.cameras) {
      c = this.cameras[k];
      if (
        c.settings('autoRescale') &&
        this.renderersPerCamera[c.id] &&
        this.renderersPerCamera[c.id].length
      )
        sigma.middlewares.rescale.call(
          this,
          a.length ? 'ready:' : '',
          c.readPrefix,
          {
            width: this.renderersPerCamera[c.id][0].width,
            height: this.renderersPerCamera[c.id][0].height
          }
        );
      else
        sigma.middlewares.copy.call(
          this,
          a.length ? 'ready:' : '',
          c.readPrefix
        );

      if (!options.skipIndexation) {
        // Find graph boundaries:
        bounds = sigma.utils.getBoundaries(
          this.graph,
          c.readPrefix
        );

        // Refresh quadtree:
        c.quadtree.index(this.graph.nodes(), {
          prefix: c.readPrefix,
          bounds: {
            x: bounds.minX,
            y: bounds.minY,
            width: bounds.maxX - bounds.minX,
            height: bounds.maxY - bounds.minY
          }
        });

        // Refresh edgequadtree:
        if (
          c.edgequadtree !== undefined &&
          c.settings('drawEdges') &&
          c.settings('enableEdgeHovering')
        ) {
          c.edgequadtree.index(this.graph, {
            prefix: c.readPrefix,
            bounds: {
              x: bounds.minX,
              y: bounds.minY,
              width: bounds.maxX - bounds.minX,
              height: bounds.maxY - bounds.minY
            }
          });
        }
      }
    }

    // Call each renderer:
    a = Object.keys(this.renderers);
    for (i = 0, l = a.length; i < l; i++)
      if (this.renderers[a[i]].process) {
        if (this.settings('skipErrors'))
          try {
            this.renderers[a[i]].process();
          } catch (e) {
            console.log(
              'Warning: The renderer "' + a[i] + '" crashed on ".process()"'
            );
          }
        else
          this.renderers[a[i]].process();
      }

    this.render();

    return this;
  };

  /**
   * This method calls the "render" method of each renderer.
   *
   * @return {sigma} Returns the instance itself.
   */
  sigma.prototype.render = function() {
    var i,
        l,
        a,
        prefix = 0;

    // Call each renderer:
    a = Object.keys(this.renderers);
    for (i = 0, l = a.length; i < l; i++)
      if (this.settings('skipErrors'))
        try {
          this.renderers[a[i]].render();
        } catch (e) {
          if (this.settings('verbose'))
            console.log(
              'Warning: The renderer "' + a[i] + '" crashed on ".render()"'
            );
        }
      else
        this.renderers[a[i]].render();

    return this;
  };

  /**
   * This method calls the "render" method of each renderer that is bound to
   * the specified camera. To improve the performances, if this method is
   * called too often, the number of effective renderings is limitated to one
   * per frame, unless you are using the "force" flag.
   *
   * @param  {sigma.classes.camera} camera The camera to render.
   * @param  {?boolean}             force  If true, will render the camera
   *                                       directly.
   * @return {sigma}                       Returns the instance itself.
   */
  sigma.prototype.renderCamera = function(camera, force) {
    var i,
        l,
        a,
        self = this;

    if (force) {
      a = this.renderersPerCamera[camera.id];
      for (i = 0, l = a.length; i < l; i++)
        if (this.settings('skipErrors'))
          try {
            a[i].render();
          } catch (e) {
            if (this.settings('verbose'))
              console.log(
                'Warning: The renderer "' + a[i].id + '" crashed on ".render()"'
              );
          }
        else
          a[i].render();
    } else {
      if (!this.cameraFrames[camera.id]) {
        a = this.renderersPerCamera[camera.id];
        for (i = 0, l = a.length; i < l; i++)
          if (this.settings('skipErrors'))
            try {
              a[i].render();
            } catch (e) {
              if (this.settings('verbose'))
                console.log(
                  'Warning: The renderer "' +
                    a[i].id +
                    '" crashed on ".render()"'
                );
            }
          else
            a[i].render();

        this.cameraFrames[camera.id] = requestAnimationFrame(function() {
          delete self.cameraFrames[camera.id];
        });
      }
    }

    return this;
  };

  /**
   * This method calls the "kill" method of each module and destroys any
   * reference from the instance.
   */
  sigma.prototype.kill = function() {
    var k;

    // Dispatching event
    this.dispatchEvent('kill');

    // Kill graph:
    this.graph.kill();

    // Kill middlewares:
    delete this.middlewares;

    // Kill each renderer:
    for (k in this.renderers)
      this.killRenderer(this.renderers[k]);

    // Kill each camera:
    for (k in this.cameras)
      this.killCamera(this.cameras[k]);

    delete this.renderers;
    delete this.cameras;

    // Kill everything else:
    for (k in this)
      if (this.hasOwnProperty(k))
        delete this[k];

    delete __instances[this.id];
  };




  /**
   * Returns a clone of the instances object or a specific running instance.
   *
   * @param  {?string} id Eventually an instance ID.
   * @return {object}     The related instance or a clone of the instances
   *                      object.
   */
  sigma.instances = function(id) {
    return arguments.length ?
      __instances[id] :
      sigma.utils.extend({}, __instances);
  };



  /**
   * The current version of sigma:
   */
  sigma.version = '1.2.0';




  /**
   * EXPORT:
   * *******
   */
  if (typeof this.sigma !== 'undefined')
    throw 'An object called sigma is already in the global scope.';

  this.sigma = sigma;

}).call(this);

/**
 * conrad.js is a tiny JavaScript jobs scheduler,
 *
 * Version: 0.1.0
 * Sources: http://github.com/jacomyal/conrad.js
 * Doc:     http://github.com/jacomyal/conrad.js#readme
 *
 * License:
 * --------
 * Copyright © 2013 Alexis Jacomy, Sciences-Po médialab
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * The Software is provided "as is", without warranty of any kind, express or
 * implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and noninfringement. In no event shall the
 * authors or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising
 * from, out of or in connection with the software or the use or other dealings
 * in the Software.
 */
(function(global) {
  'use strict';

  // Check that conrad.js has not been loaded yet:
  if (global.conrad)
    throw new Error('conrad already exists');


  /**
   * PRIVATE VARIABLES:
   * ******************
   */

  /**
   * A flag indicating whether conrad is running or not.
   *
   * @type {Number}
   */
  var _lastFrameTime;

  /**
   * A flag indicating whether conrad is running or not.
   *
   * @type {Boolean}
   */
  var _isRunning = false;

  /**
   * The hash of registered jobs. Each job must at least have a unique ID
   * under the key "id" and a function under the key "job". This hash
   * contains each running job and each waiting job.
   *
   * @type {Object}
   */
  var _jobs = {};

  /**
   * The hash of currently running jobs.
   *
   * @type {Object}
   */
  var _runningJobs = {};

  /**
   * The array of currently running jobs, sorted by priority.
   *
   * @type {Array}
   */
  var _sortedByPriorityJobs = [];

  /**
   * The array of currently waiting jobs.
   *
   * @type {Object}
   */
  var _waitingJobs = {};

  /**
   * The array of finished jobs. They are stored in an array, since two jobs
   * with the same "id" can happen at two different times.
   *
   * @type {Array}
   */
  var _doneJobs = [];

  /**
   * A dirty flag to keep conrad from starting: Indeed, when addJob() is called
   * with several jobs, conrad must be started only at the end. This flag keeps
   * me from duplicating the code that effectively adds a job.
   *
   * @type {Boolean}
   */
  var _noStart = false;

  /**
   * An hash containing some global settings about how conrad.js should
   * behave.
   *
   * @type {Object}
   */
  var _parameters = {
    frameDuration: 20,
    history: true
  };

  /**
   * This object contains every handlers bound to conrad events. It does not
   * requirea any DOM implementation, since the events are all JavaScript.
   *
   * @type {Object}
   */
  var _handlers = Object.create(null);


  /**
   * PRIVATE FUNCTIONS:
   * ******************
   */

  /**
   * Will execute the handler everytime that the indicated event (or the
   * indicated events) will be triggered.
   *
   * @param  {string|array|object} events  The name of the event (or the events
   *                                       separated by spaces).
   * @param  {function(Object)}    handler The handler to bind.
   * @return {Object}                      Returns conrad.
   */
  function _bind(events, handler) {
    var i,
        i_end,
        event,
        eArray;

    if (!arguments.length)
      return;
    else if (
      arguments.length === 1 &&
      Object(arguments[0]) === arguments[0]
    )
      for (events in arguments[0])
        _bind(events, arguments[0][events]);
    else if (arguments.length > 1) {
      eArray =
        Array.isArray(events) ?
          events :
          events.split(/ /);

      for (i = 0, i_end = eArray.length; i !== i_end; i += 1) {
        event = eArray[i];

        if (!_handlers[event])
          _handlers[event] = [];

        // Using an object instead of directly the handler will make possible
        // later to add flags
        _handlers[event].push({
          handler: handler
        });
      }
    }
  }

  /**
   * Removes the handler from a specified event (or specified events).
   *
   * @param  {?string}           events  The name of the event (or the events
   *                                     separated by spaces). If undefined,
   *                                     then all handlers are removed.
   * @param  {?function(Object)} handler The handler to unbind. If undefined,
   *                                     each handler bound to the event or the
   *                                     events will be removed.
   * @return {Object}            Returns conrad.
   */
  function _unbind(events, handler) {
    var i,
        i_end,
        j,
        j_end,
        a,
        event,
        eArray = Array.isArray(events) ?
                   events :
                   events.split(/ /);

    if (!arguments.length)
      _handlers = Object.create(null);
    else if (handler) {
      for (i = 0, i_end = eArray.length; i !== i_end; i += 1) {
        event = eArray[i];
        if (_handlers[event]) {
          a = [];
          for (j = 0, j_end = _handlers[event].length; j !== j_end; j += 1)
            if (_handlers[event][j].handler !== handler)
              a.push(_handlers[event][j]);

          _handlers[event] = a;
        }

        if (_handlers[event] && _handlers[event].length === 0)
          delete _handlers[event];
      }
    } else
      for (i = 0, i_end = eArray.length; i !== i_end; i += 1)
        delete _handlers[eArray[i]];
  }

  /**
   * Executes each handler bound to the event.
   *
   * @param  {string}  events The name of the event (or the events separated
   *                          by spaces).
   * @param  {?Object} data   The content of the event (optional).
   * @return {Object}         Returns conrad.
   */
  function _dispatch(events, data) {
    var i,
        j,
        i_end,
        j_end,
        event,
        eventName,
        eArray = Array.isArray(events) ?
                   events :
                   events.split(/ /);

    data = data === undefined ? {} : data;

    for (i = 0, i_end = eArray.length; i !== i_end; i += 1) {
      eventName = eArray[i];

      if (_handlers[eventName]) {
        event = {
          type: eventName,
          data: data || {}
        };

        for (j = 0, j_end = _handlers[eventName].length; j !== j_end; j += 1)
          try {
            _handlers[eventName][j].handler(event);
          } catch (e) {}
      }
    }
  }

  /**
   * Executes the most prioritary job once, and deals with filling the stats
   * (done, time, averageTime, currentTime, etc...).
   *
   * @return {?Object} Returns the job object if it has to be killed, null else.
   */
  function _executeFirstJob() {
    var i,
        l,
        test,
        kill,
        pushed = false,
        time = __dateNow(),
        job = _sortedByPriorityJobs.shift();

    // Execute the job and look at the result:
    test = job.job();

    // Deal with stats:
    time = __dateNow() - time;
    job.done++;
    job.time += time;
    job.currentTime += time;
    job.weightTime = job.currentTime / (job.weight || 1);
    job.averageTime = job.time / job.done;

    // Check if the job has to be killed:
    kill = job.count ? (job.count <= job.done) : !test;

    // Reset priorities:
    if (!kill) {
      for (i = 0, l = _sortedByPriorityJobs.length; i < l; i++)
        if (_sortedByPriorityJobs[i].weightTime > job.weightTime) {
          _sortedByPriorityJobs.splice(i, 0, job);
          pushed = true;
          break;
        }

      if (!pushed)
        _sortedByPriorityJobs.push(job);
    }

    return kill ? job : null;
  }

  /**
   * Activates a job, by adding it to the _runningJobs object and the
   * _sortedByPriorityJobs array. It also initializes its currentTime value.
   *
   * @param  {Object} job The job to activate.
   */
  function _activateJob(job) {
    var l = _sortedByPriorityJobs.length;

    // Add the job to the running jobs:
    _runningJobs[job.id] = job;
    job.status = 'running';

    // Add the job to the priorities:
    if (l) {
      job.weightTime = _sortedByPriorityJobs[l - 1].weightTime;
      job.currentTime = job.weightTime * (job.weight || 1);
    }

    // Initialize the job and dispatch:
    job.startTime = __dateNow();
    _dispatch('jobStarted', __clone(job));

    _sortedByPriorityJobs.push(job);
  }

  /**
   * The main loop of conrad.js:
   *  . It executes job such that they all occupate the same processing time.
   *  . It stops jobs that do not need to be executed anymore.
   *  . It triggers callbacks when it is relevant.
   *  . It starts waiting jobs when they need to be started.
   *  . It injects frames to keep a constant frapes per second ratio.
   *  . It stops itself when there are no more jobs to execute.
   */
  function _loop() {
    var k,
        o,
        l,
        job,
        time,
        deadJob;

    // Deal with the newly added jobs (the _jobs object):
    for (k in _jobs) {
      job = _jobs[k];

      if (job.after)
        _waitingJobs[k] = job;
      else
        _activateJob(job);

      delete _jobs[k];
    }

    // Set the _isRunning flag to false if there are no running job:
    _isRunning = !!_sortedByPriorityJobs.length;

    // Deal with the running jobs (the _runningJobs object):
    while (
      _sortedByPriorityJobs.length &&
      __dateNow() - _lastFrameTime < _parameters.frameDuration
    ) {
      deadJob = _executeFirstJob();

      // Deal with the case where the job has ended:
      if (deadJob) {
        _killJob(deadJob.id);

        // Check for waiting jobs:
        for (k in _waitingJobs)
          if (_waitingJobs[k].after === deadJob.id) {
            _activateJob(_waitingJobs[k]);
            delete _waitingJobs[k];
          }
      }
    }

    // Check if conrad still has jobs to deal with, and kill it if not:
    if (_isRunning) {
      // Update the _lastFrameTime:
      _lastFrameTime = __dateNow();

      _dispatch('enterFrame');
      setTimeout(_loop, 0);
    } else
      _dispatch('stop');
  }

  /**
   * Adds one or more jobs, and starts the loop if no job was running before. A
   * job is at least a unique string "id" and a function, and there are some
   * parameters that you can specify for each job to modify the way conrad will
   * execute it. If a job is added with the "id" of another job that is waiting
   * or still running, an error will be thrown.
   *
   * When a job is added, it is referenced in the _jobs object, by its id.
   * Then, if it has to be executed right now, it will be also referenced in
   * the _runningJobs object. If it has to wait, then it will be added into the
   * _waitingJobs object, until it can start.
   *
   * Keep reading this documentation to see how to call this method.
   *
   * @return {Object} Returns conrad.
   *
   * Adding one job:
   * ***************
   * Basically, a job is defined by its string id and a function (the job). It
   * is also possible to add some parameters:
   *
   *  > conrad.addJob('myJobId', myJobFunction);
   *  > conrad.addJob('myJobId', {
   *  >   job: myJobFunction,
   *  >   someParameter: someValue
   *  > });
   *  > conrad.addJob({
   *  >   id: 'myJobId',
   *  >   job: myJobFunction,
   *  >   someParameter: someValue
   *  > });
   *
   * Adding several jobs:
   * ********************
   * When adding several jobs at the same time, it is possible to specify
   * parameters for each one individually or for all:
   *
   *  > conrad.addJob([
   *  >   {
   *  >     id: 'myJobId1',
   *  >     job: myJobFunction1,
   *  >     someParameter1: someValue1
   *  >   },
   *  >   {
   *  >     id: 'myJobId2',
   *  >     job: myJobFunction2,
   *  >     someParameter2: someValue2
   *  >   }
   *  > ], {
   *  >   someCommonParameter: someCommonValue
   *  > });
   *  > conrad.addJob({
   *  >   myJobId1: {,
   *  >     job: myJobFunction1,
   *  >     someParameter1: someValue1
   *  >   },
   *  >   myJobId2: {,
   *  >     job: myJobFunction2,
   *  >     someParameter2: someValue2
   *  >   }
   *  > }, {
   *  >   someCommonParameter: someCommonValue
   *  > });
   *  > conrad.addJob({
   *  >   myJobId1: myJobFunction1,
   *  >   myJobId2: myJobFunction2
   *  > }, {
   *  >   someCommonParameter: someCommonValue
   *  > });
   *
   *  Recognized parameters:
   *  **********************
   *  Here is the exhaustive list of every accepted parameters:
   *
   *    {?Function} end      A callback to execute when the job is ended. It is
   *                         not executed if the job is killed instead of ended
   *                         "naturally".
   *    {?Integer}  count    The number of time the job has to be executed.
   *    {?Number}   weight   If specified, the job will be executed as it was
   *                         added "weight" times.
   *    {?String}   after    The id of another job (eventually not added yet).
   *                         If specified, this job will start only when the
   *                         specified "after" job is ended.
   */
  function _addJob(v1, v2) {
    var i,
        l,
        o;

    // Array of jobs:
    if (Array.isArray(v1)) {
      // Keep conrad to start until the last job is added:
      _noStart = true;

      for (i = 0, l = v1.length; i < l; i++)
        _addJob(v1[i].id, __extend(v1[i], v2));

      _noStart = false;
      if (!_isRunning) {
        // Update the _lastFrameTime:
        _lastFrameTime = __dateNow();

        _dispatch('start');
        _loop();
      }
    } else if (typeof v1 === 'object') {
      // One job (object):
      if (typeof v1.id === 'string')
        _addJob(v1.id, v1);

      // Hash of jobs:
      else {
        // Keep conrad to start until the last job is added:
        _noStart = true;

        for (i in v1)
          if (typeof v1[i] === 'function')
            _addJob(i, __extend({
              job: v1[i]
            }, v2));
          else
            _addJob(i, __extend(v1[i], v2));

        _noStart = false;
        if (!_isRunning) {
          // Update the _lastFrameTime:
          _lastFrameTime = __dateNow();

          _dispatch('start');
          _loop();
        }
      }

    // One job (string, *):
    } else if (typeof v1 === 'string') {
      if (_hasJob(v1))
        throw new Error(
          '[conrad.addJob] Job with id "' + v1 + '" already exists.'
        );

      // One job (string, function):
      if (typeof v2 === 'function') {
        o = {
          id: v1,
          done: 0,
          time: 0,
          status: 'waiting',
          currentTime: 0,
          averageTime: 0,
          weightTime: 0,
          job: v2
        };

      // One job (string, object):
      } else if (typeof v2 === 'object') {
        o = __extend(
          {
            id: v1,
            done: 0,
            time: 0,
            status: 'waiting',
            currentTime: 0,
            averageTime: 0,
            weightTime: 0
          },
          v2
        );

      // If none of those cases, throw an error:
      } else
        throw new Error('[conrad.addJob] Wrong arguments.');

      // Effectively add the job:
      _jobs[v1] = o;
      _dispatch('jobAdded', __clone(o));

      // Check if the loop has to be started:
      if (!_isRunning && !_noStart) {
        // Update the _lastFrameTime:
        _lastFrameTime = __dateNow();

        _dispatch('start');
        _loop();
      }

    // If none of those cases, throw an error:
    } else
      throw new Error('[conrad.addJob] Wrong arguments.');

    return this;
  }

  /**
   * Kills one or more jobs, indicated by their ids. It is only possible to
   * kill running jobs or waiting jobs. If you try to kill a job that does not
   * exist or that is already killed, a warning will be thrown.
   *
   * @param  {Array|String} v1 A string job id or an array of job ids.
   * @return {Object}       Returns conrad.
   */
  function _killJob(v1) {
    var i,
        l,
        k,
        a,
        job,
        found = false;

    // Array of job ids:
    if (Array.isArray(v1))
      for (i = 0, l = v1.length; i < l; i++)
        _killJob(v1[i]);

    // One job's id:
    else if (typeof v1 === 'string') {
      a = [_runningJobs, _waitingJobs, _jobs];

      // Remove the job from the hashes:
      for (i = 0, l = a.length; i < l; i++)
        if (v1 in a[i]) {
          job = a[i][v1];

          if (_parameters.history) {
            job.status = 'done';
            _doneJobs.push(job);
          }

          _dispatch('jobEnded', __clone(job));
          delete a[i][v1];

          if (typeof job.end === 'function')
            job.end();

          found = true;
        }

      // Remove the priorities array:
      a = _sortedByPriorityJobs;
      for (i = 0, l = a.length; i < l; i++)
        if (a[i].id === v1) {
          a.splice(i, 1);
          break;
        }

      if (!found)
        throw new Error('[conrad.killJob] Job "' + v1 + '" not found.');

    // If none of those cases, throw an error:
    } else
      throw new Error('[conrad.killJob] Wrong arguments.');

    return this;
  }

  /**
   * Kills every running, waiting, and just added jobs.
   *
   * @return {Object} Returns conrad.
   */
  function _killAll() {
    var k,
        jobs = __extend(_jobs, _runningJobs, _waitingJobs);

    // Take every jobs and push them into the _doneJobs object:
    if (_parameters.history)
      for (k in jobs) {
        jobs[k].status = 'done';
        _doneJobs.push(jobs[k]);

        if (typeof jobs[k].end === 'function')
          jobs[k].end();
      }

    // Reinitialize the different jobs lists:
    _jobs = {};
    _waitingJobs = {};
    _runningJobs = {};
    _sortedByPriorityJobs = [];

    // In case some jobs are added right after the kill:
    _isRunning = false;

    return this;
  }

  /**
   * Returns true if a job with the specified id is currently running or
   * waiting, and false else.
   *
   * @param  {String}  id The id of the job.
   * @return {?Object} Returns the job object if it exists.
   */
  function _hasJob(id) {
    var job = _jobs[id] || _runningJobs[id] || _waitingJobs[id];
    return job ? __extend(job) : null;
  }

  /**
   * This method will set the setting specified by "v1" to the value specified
   * by "v2" if both are given, and else return the current value of the
   * settings "v1".
   *
   * @param  {String}   v1 The name of the property.
   * @param  {?*}       v2 Eventually, a value to set to the specified
   *                       property.
   * @return {Object|*} Returns the specified settings value if "v2" is not
   *                    given, and conrad else.
   */
  function _settings(v1, v2) {
    var o;

    if (typeof a1 === 'string' && arguments.length === 1)
      return _parameters[a1];
    else {
      o = (typeof a1 === 'object' && arguments.length === 1) ?
        a1 || {} :
        {};
      if (typeof a1 === 'string')
        o[a1] = a2;

      for (var k in o)
        if (o[k] !== undefined)
          _parameters[k] = o[k];
        else
          delete _parameters[k];

      return this;
    }
  }

  /**
   * Returns true if conrad is currently running, and false else.
   *
   * @return {Boolean} Returns _isRunning.
   */
  function _getIsRunning() {
    return _isRunning;
  }

  /**
   * Unreference every job that is stored in the _doneJobs object. It will
   * not be possible anymore to get stats about these jobs, but it will release
   * the memory.
   *
   * @return {Object} Returns conrad.
   */
  function _clearHistory() {
    _doneJobs = [];
    return this;
  }

  /**
   * Returns a snapshot of every data about jobs that wait to be started, are
   * currently running or are done.
   *
   * It is possible to get only running, waiting or done jobs by giving
   * "running", "waiting" or "done" as fist argument.
   *
   * It is also possible to get every job with a specified id by giving it as
   * first argument. Also, using a RegExp instead of an id will return every
   * jobs whose ids match the RegExp. And these two last use cases work as well
   * by giving before "running", "waiting" or "done".
   *
   * @return {Array} The array of the matching jobs.
   *
   * Some call examples:
   * *******************
   *  > conrad.getStats('running')
   *  > conrad.getStats('waiting')
   *  > conrad.getStats('done')
   *  > conrad.getStats('myJob')
   *  > conrad.getStats(/test/)
   *  > conrad.getStats('running', 'myRunningJob')
   *  > conrad.getStats('running', /test/)
   */
  function _getStats(v1, v2) {
    var a,
        k,
        i,
        l,
        stats,
        pattern,
        isPatternString;

    if (!arguments.length) {
      stats = [];

      for (k in _jobs)
        stats.push(_jobs[k]);

      for (k in _waitingJobs)
        stats.push(_waitingJobs[k]);

      for (k in _runningJobs)
        stats.push(_runningJobs[k]);

      stats = stats.concat(_doneJobs);
    }

    if (typeof v1 === 'string')
      switch (v1) {
        case 'waiting':
          stats = __objectValues(_waitingJobs);
          break;
        case 'running':
          stats = __objectValues(_runningJobs);
          break;
        case 'done':
          stats = _doneJobs;
          break;
        default:
          pattern = v1;
      }

    if (v1 instanceof RegExp)
      pattern = v1;

    if (!pattern && (typeof v2 === 'string' || v2 instanceof RegExp))
      pattern = v2;

    // Filter jobs if a pattern is given:
    if (pattern) {
      isPatternString = typeof pattern === 'string';

      if (stats instanceof Array) {
        a = stats;
      } else if (typeof stats === 'object') {
        a = [];

        for (k in stats)
          a = a.concat(stats[k]);
      } else {
        a = [];

        for (k in _jobs)
          a.push(_jobs[k]);

        for (k in _waitingJobs)
          a.push(_waitingJobs[k]);

        for (k in _runningJobs)
          a.push(_runningJobs[k]);

        a = a.concat(_doneJobs);
      }

      stats = [];
      for (i = 0, l = a.length; i < l; i++)
        if (isPatternString ? a[i].id === pattern : a[i].id.match(pattern))
          stats.push(a[i]);
    }

    return __clone(stats);
  }


  /**
   * TOOLS FUNCTIONS:
   * ****************
   */

  /**
   * This function takes any number of objects as arguments, copies from each
   * of these objects each pair key/value into a new object, and finally
   * returns this object.
   *
   * The arguments are parsed from the last one to the first one, such that
   * when two objects have keys in common, the "earliest" object wins.
   *
   * Example:
   * ********
   *  > var o1 = {
   *  >       a: 1,
   *  >       b: 2,
   *  >       c: '3'
   *  >     },
   *  >     o2 = {
   *  >       c: '4',
   *  >       d: [ 5 ]
   *  >     };
   *  > __extend(o1, o2);
   *  > // Returns: {
   *  > //   a: 1,
   *  > //   b: 2,
   *  > //   c: '3',
   *  > //   d: [ 5 ]
   *  > // };
   *
   * @param  {Object+} Any number of objects.
   * @return {Object}  The merged object.
   */
  function __extend() {
    var i,
        k,
        res = {},
        l = arguments.length;

    for (i = l - 1; i >= 0; i--)
      for (k in arguments[i])
        res[k] = arguments[i][k];

    return res;
  }

  /**
   * This function simply clones an object. This object must contain only
   * objects, arrays and immutable values. Since it is not public, it does not
   * deal with cyclic references, DOM elements and instantiated objects - so
   * use it carefully.
   *
   * @param  {Object} The object to clone.
   * @return {Object} The clone.
   */
  function __clone(item) {
    var result, i, k, l;

    if (!item)
      return item;

    if (Array.isArray(item)) {
      result = [];
      for (i = 0, l = item.length; i < l; i++)
        result.push(__clone(item[i]));
    } else if (typeof item === 'object') {
      result = {};
      for (i in item)
        result[i] = __clone(item[i]);
    } else
      result = item;

    return result;
  }

  /**
   * Returns an array containing the values of an object.
   *
   * @param  {Object} The object.
   * @return {Array}  The array of values.
   */
  function __objectValues(o) {
    var k,
        a = [];

    for (k in o)
      a.push(o[k]);

    return a;
  }

  /**
   * A short "Date.now()" polyfill.
   *
   * @return {Number} The current time (in ms).
   */
  function __dateNow() {
    return Date.now ? Date.now() : new Date().getTime();
  }

  /**
   * Polyfill for the Array.isArray function:
   */
  if (!Array.isArray)
    Array.isArray = function(v) {
      return Object.prototype.toString.call(v) === '[object Array]';
    };


  /**
   * EXPORT PUBLIC API:
   * ******************
   */
  var conrad = {
    hasJob: _hasJob,
    addJob: _addJob,
    killJob: _killJob,
    killAll: _killAll,
    settings: _settings,
    getStats: _getStats,
    isRunning: _getIsRunning,
    clearHistory: _clearHistory,

    // Events management:
    bind: _bind,
    unbind: _unbind,

    // Version:
    version: '0.1.0'
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      exports = module.exports = conrad;
    exports.conrad = conrad;
  }
  global.conrad = conrad;
})(this);

// Hardcoded export for the node.js version:
var sigma = this.sigma,
    conrad = this.conrad;

sigma.conrad = conrad;

// Dirty polyfills to permit sigma usage in node
if (typeof HTMLElement === 'undefined')
  HTMLElement = function() {};

if (typeof window === 'undefined')
  window = {
    addEventListener: function() {}
  };

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports)
    exports = module.exports = sigma;
  exports.sigma = sigma;
}

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  var _root = this;

  // Initialize packages:
  sigma.utils = sigma.utils || {};

  /**
   * MISC UTILS:
   */
  /**
   * This function takes any number of objects as arguments, copies from each
   * of these objects each pair key/value into a new object, and finally
   * returns this object.
   *
   * The arguments are parsed from the last one to the first one, such that
   * when several objects have keys in common, the "earliest" object wins.
   *
   * Example:
   * ********
   *  > var o1 = {
   *  >       a: 1,
   *  >       b: 2,
   *  >       c: '3'
   *  >     },
   *  >     o2 = {
   *  >       c: '4',
   *  >       d: [ 5 ]
   *  >     };
   *  > sigma.utils.extend(o1, o2);
   *  > // Returns: {
   *  > //   a: 1,
   *  > //   b: 2,
   *  > //   c: '3',
   *  > //   d: [ 5 ]
   *  > // };
   *
   * @param  {object+} Any number of objects.
   * @return {object}  The merged object.
   */
  sigma.utils.extend = function() {
    var i,
        k,
        res = {},
        l = arguments.length;

    for (i = l - 1; i >= 0; i--)
      for (k in arguments[i])
        res[k] = arguments[i][k];

    return res;
  };

  /**
   * A short "Date.now()" polyfill.
   *
   * @return {Number} The current time (in ms).
   */
  sigma.utils.dateNow = function() {
    return Date.now ? Date.now() : new Date().getTime();
  };

  /**
   * Takes a package name as parameter and checks at each lebel if it exists,
   * and if it does not, creates it.
   *
   * Example:
   * ********
   *  > sigma.utils.pkg('a.b.c');
   *  > a.b.c;
   *  > // Object {};
   *  >
   *  > sigma.utils.pkg('a.b.d');
   *  > a.b;
   *  > // Object { c: {}, d: {} };
   *
   * @param  {string} pkgName The name of the package to create/find.
   * @return {object}         The related package.
   */
  sigma.utils.pkg = function(pkgName) {
    return (pkgName || '').split('.').reduce(function(context, objName) {
      return (objName in context) ?
        context[objName] :
        (context[objName] = {});
    }, _root);
  };

  /**
   * Returns a unique incremental number ID.
   *
   * Example:
   * ********
   *  > sigma.utils.id();
   *  > // 1;
   *  >
   *  > sigma.utils.id();
   *  > // 2;
   *  >
   *  > sigma.utils.id();
   *  > // 3;
   *
   * @param  {string} pkgName The name of the package to create/find.
   * @return {object}         The related package.
   */
  sigma.utils.id = (function() {
    var i = 0;
    return function() {
      return ++i;
    };
  })();

  /**
   * This function takes an hexa color (for instance "#ffcc00" or "#fc0") or a
   * rgb / rgba color (like "rgb(255,255,12)" or "rgba(255,255,12,1)") and
   * returns an integer equal to "r * 255 * 255 + g * 255 + b", to gain some
   * memory in the data given to WebGL shaders.
   *
   * Note that the function actually caches its results for better performance.
   *
   * @param  {string} val The hexa or rgba color.
   * @return {number}     The number value.
   */
  var floatColorCache = {};

  sigma.utils.floatColor = function(val) {

    // Is the color already computed?
    if (floatColorCache[val])
      return floatColorCache[val];

    var original = val,
        r = 0,
        g = 0,
        b = 0;

    if (val[0] === '#') {
      val = val.slice(1);

      if (val.length === 3) {
        r = parseInt(val.charAt(0) + val.charAt(0), 16);
        g = parseInt(val.charAt(1) + val.charAt(1), 16);
        b = parseInt(val.charAt(2) + val.charAt(2), 16);
      }
      else {
        r = parseInt(val.charAt(0) + val.charAt(1), 16);
        g = parseInt(val.charAt(2) + val.charAt(3), 16);
        b = parseInt(val.charAt(4) + val.charAt(5), 16);
      }
    } else if (val.match(/^ *rgba? *\(/)) {
      val = val.match(
        /^ *rgba? *\( *([0-9]*) *, *([0-9]*) *, *([0-9]*) *(,.*)?\) *$/
      );
      r = +val[1];
      g = +val[2];
      b = +val[3];
    }

    var color = (
      r * 256 * 256 +
      g * 256 +
      b
    );

    // Caching the color
    floatColorCache[original] = color;

    return color;
  };

    /**
   * Perform a zoom into a camera, with or without animation, to the
   * coordinates indicated using a specified ratio.
   *
   * Recognized parameters:
   * **********************
   * Here is the exhaustive list of every accepted parameters in the animation
   * object:
   *
   *   {?number} duration     An amount of time that means the duration of the
   *                          animation. If this parameter doesn't exist the
   *                          zoom will be performed without animation.
   *   {?function} onComplete A function to perform it after the animation. It
   *                          will be performed even if there is no duration.
   *
   * @param {camera}     The camera where perform the zoom.
   * @param {x}          The X coordiantion where the zoom goes.
   * @param {y}          The Y coordiantion where the zoom goes.
   * @param {ratio}      The ratio to apply it to the current camera ratio.
   * @param {?animation} A dictionary with options for a possible animation.
   */
  sigma.utils.zoomTo = function(camera, x, y, ratio, animation) {
    var settings = camera.settings,
        count,
        newRatio,
        animationSettings,
        coordinates;

    // Create the newRatio dealing with min / max:
    newRatio = Math.max(
      settings('zoomMin'),
      Math.min(
        settings('zoomMax'),
        camera.ratio * ratio
      )
    );

    // Check that the new ratio is different from the initial one:
    if (newRatio !== camera.ratio) {
      // Create the coordinates variable:
      ratio = newRatio / camera.ratio;
      coordinates = {
        x: x * (1 - ratio) + camera.x,
        y: y * (1 - ratio) + camera.y,
        ratio: newRatio
      };

      if (animation && animation.duration) {
        // Complete the animation setings:
        count = sigma.misc.animation.killAll(camera);
        animation = sigma.utils.extend(
          animation,
          {
            easing: count ? 'quadraticOut' : 'quadraticInOut'
          }
        );

        sigma.misc.animation.camera(camera, coordinates, animation);
      } else {
        camera.goTo(coordinates);
        if (animation && animation.onComplete)
          animation.onComplete();
      }
    }
  };

  /**
   * Return the control point coordinates for a quadratic bezier curve.
   *
   * @param  {number} x1  The X coordinate of the start point.
   * @param  {number} y1  The Y coordinate of the start point.
   * @param  {number} x2  The X coordinate of the end point.
   * @param  {number} y2  The Y coordinate of the end point.
   * @return {x,y}        The control point coordinates.
   */
  sigma.utils.getQuadraticControlPoint = function(x1, y1, x2, y2) {
    return {
      x: (x1 + x2) / 2 + (y2 - y1) / 4,
      y: (y1 + y2) / 2 + (x1 - x2) / 4
    };
  };

  /**
    * Compute the coordinates of the point positioned
    * at length t in the quadratic bezier curve.
    *
    * @param  {number} t  In [0,1] the step percentage to reach
    *                     the point in the curve from the context point.
    * @param  {number} x1 The X coordinate of the context point.
    * @param  {number} y1 The Y coordinate of the context point.
    * @param  {number} x2 The X coordinate of the ending point.
    * @param  {number} y2 The Y coordinate of the ending point.
    * @param  {number} xi The X coordinate of the control point.
    * @param  {number} yi The Y coordinate of the control point.
    * @return {object}    {x,y}.
  */
  sigma.utils.getPointOnQuadraticCurve = function(t, x1, y1, x2, y2, xi, yi) {
    // http://stackoverflow.com/a/5634528
    return {
      x: Math.pow(1 - t, 2) * x1 + 2 * (1 - t) * t * xi + Math.pow(t, 2) * x2,
      y: Math.pow(1 - t, 2) * y1 + 2 * (1 - t) * t * yi + Math.pow(t, 2) * y2
    };
  };

  /**
    * Compute the coordinates of the point positioned
    * at length t in the cubic bezier curve.
    *
    * @param  {number} t  In [0,1] the step percentage to reach
    *                     the point in the curve from the context point.
    * @param  {number} x1 The X coordinate of the context point.
    * @param  {number} y1 The Y coordinate of the context point.
    * @param  {number} x2 The X coordinate of the end point.
    * @param  {number} y2 The Y coordinate of the end point.
    * @param  {number} cx The X coordinate of the first control point.
    * @param  {number} cy The Y coordinate of the first control point.
    * @param  {number} dx The X coordinate of the second control point.
    * @param  {number} dy The Y coordinate of the second control point.
    * @return {object}    {x,y} The point at t.
  */
  sigma.utils.getPointOnBezierCurve =
    function(t, x1, y1, x2, y2, cx, cy, dx, dy) {
    // http://stackoverflow.com/a/15397596
    // Blending functions:
    var B0_t = Math.pow(1 - t, 3),
        B1_t = 3 * t * Math.pow(1 - t, 2),
        B2_t = 3 * Math.pow(t, 2) * (1 - t),
        B3_t = Math.pow(t, 3);

    return {
      x: (B0_t * x1) + (B1_t * cx) + (B2_t * dx) + (B3_t * x2),
      y: (B0_t * y1) + (B1_t * cy) + (B2_t * dy) + (B3_t * y2)
    };
  };

  /**
   * Return the coordinates of the two control points for a self loop (i.e.
   * where the start point is also the end point) computed as a cubic bezier
   * curve.
   *
   * @param  {number} x    The X coordinate of the node.
   * @param  {number} y    The Y coordinate of the node.
   * @param  {number} size The node size.
   * @return {x1,y1,x2,y2} The coordinates of the two control points.
   */
  sigma.utils.getSelfLoopControlPoints = function(x , y, size) {
    return {
      x1: x - size * 7,
      y1: y,
      x2: x,
      y2: y + size * 7
    };
  };

  /**
   * Return the euclidian distance between two points of a plane
   * with an orthonormal basis.
   *
   * @param  {number} x1  The X coordinate of the first point.
   * @param  {number} y1  The Y coordinate of the first point.
   * @param  {number} x2  The X coordinate of the second point.
   * @param  {number} y2  The Y coordinate of the second point.
   * @return {number}     The euclidian distance.
   */
  sigma.utils.getDistance = function(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
  };

  /**
   * Return the coordinates of the intersection points of two circles.
   *
   * @param  {number} x0  The X coordinate of center location of the first
   *                      circle.
   * @param  {number} y0  The Y coordinate of center location of the first
   *                      circle.
   * @param  {number} r0  The radius of the first circle.
   * @param  {number} x1  The X coordinate of center location of the second
   *                      circle.
   * @param  {number} y1  The Y coordinate of center location of the second
   *                      circle.
   * @param  {number} r1  The radius of the second circle.
   * @return {xi,yi}      The coordinates of the intersection points.
   */
  sigma.utils.getCircleIntersection = function(x0, y0, r0, x1, y1, r1) {
    // http://stackoverflow.com/a/12219802
    var a, dx, dy, d, h, rx, ry, x2, y2;

    // dx and dy are the vertical and horizontal distances between the circle
    // centers:
    dx = x1 - x0;
    dy = y1 - y0;

    // Determine the straight-line distance between the centers:
    d = Math.sqrt((dy * dy) + (dx * dx));

    // Check for solvability:
    if (d > (r0 + r1)) {
        // No solution. circles do not intersect.
        return false;
    }
    if (d < Math.abs(r0 - r1)) {
        // No solution. one circle is contained in the other.
        return false;
    }

    //'point 2' is the point where the line through the circle intersection
    // points crosses the line between the circle centers.

    // Determine the distance from point 0 to point 2:
    a = ((r0 * r0) - (r1 * r1) + (d * d)) / (2.0 * d);

    // Determine the coordinates of point 2:
    x2 = x0 + (dx * a / d);
    y2 = y0 + (dy * a / d);

    // Determine the distance from point 2 to either of the intersection
    // points:
    h = Math.sqrt((r0 * r0) - (a * a));

    // Determine the offsets of the intersection points from point 2:
    rx = -dy * (h / d);
    ry = dx * (h / d);

    // Determine the absolute intersection points:
    var xi = x2 + rx;
    var xi_prime = x2 - rx;
    var yi = y2 + ry;
    var yi_prime = y2 - ry;

    return {xi: xi, xi_prime: xi_prime, yi: yi, yi_prime: yi_prime};
  };

  /**
    * Check if a point is on a line segment.
    *
    * @param  {number} x       The X coordinate of the point to check.
    * @param  {number} y       The Y coordinate of the point to check.
    * @param  {number} x1      The X coordinate of the line start point.
    * @param  {number} y1      The Y coordinate of the line start point.
    * @param  {number} x2      The X coordinate of the line end point.
    * @param  {number} y2      The Y coordinate of the line end point.
    * @param  {number} epsilon The precision (consider the line thickness).
    * @return {boolean}        True if point is "close to" the line
    *                          segment, false otherwise.
  */
  sigma.utils.isPointOnSegment = function(x, y, x1, y1, x2, y2, epsilon) {
    // http://stackoverflow.com/a/328122
    var crossProduct = Math.abs((y - y1) * (x2 - x1) - (x - x1) * (y2 - y1)),
        d = sigma.utils.getDistance(x1, y1, x2, y2),
        nCrossProduct = crossProduct / d; // normalized cross product

    return (nCrossProduct < epsilon &&
     Math.min(x1, x2) <= x && x <= Math.max(x1, x2) &&
     Math.min(y1, y2) <= y && y <= Math.max(y1, y2));
  };

  /**
    * Check if a point is on a quadratic bezier curve segment with a thickness.
    *
    * @param  {number} x       The X coordinate of the point to check.
    * @param  {number} y       The Y coordinate of the point to check.
    * @param  {number} x1      The X coordinate of the curve start point.
    * @param  {number} y1      The Y coordinate of the curve start point.
    * @param  {number} x2      The X coordinate of the curve end point.
    * @param  {number} y2      The Y coordinate of the curve end point.
    * @param  {number} cpx     The X coordinate of the curve control point.
    * @param  {number} cpy     The Y coordinate of the curve control point.
    * @param  {number} epsilon The precision (consider the line thickness).
    * @return {boolean}        True if (x,y) is on the curve segment,
    *                          false otherwise.
  */
  sigma.utils.isPointOnQuadraticCurve =
    function(x, y, x1, y1, x2, y2, cpx, cpy, epsilon) {
    // Fails if the point is too far from the extremities of the segment,
    // preventing for more costly computation:
    var dP1P2 = sigma.utils.getDistance(x1, y1, x2, y2);
    if (Math.abs(x - x1) > dP1P2 || Math.abs(y - y1) > dP1P2) {
      return false;
    }

    var dP1 = sigma.utils.getDistance(x, y, x1, y1),
        dP2 = sigma.utils.getDistance(x, y, x2, y2),
        t = 0.5,
        r = (dP1 < dP2) ? -0.01 : 0.01,
        rThreshold = 0.001,
        i = 100,
        pt = sigma.utils.getPointOnQuadraticCurve(t, x1, y1, x2, y2, cpx, cpy),
        dt = sigma.utils.getDistance(x, y, pt.x, pt.y),
        old_dt;

    // This algorithm minimizes the distance from the point to the curve. It
    // find the optimal t value where t=0 is the start point and t=1 is the end
    // point of the curve, starting from t=0.5.
    // It terminates because it runs a maximum of i interations.
    while (i-- > 0 &&
      t >= 0 && t <= 1 &&
      (dt > epsilon) &&
      (r > rThreshold || r < -rThreshold)) {
      old_dt = dt;
      pt = sigma.utils.getPointOnQuadraticCurve(t, x1, y1, x2, y2, cpx, cpy);
      dt = sigma.utils.getDistance(x, y, pt.x, pt.y);

      if (dt > old_dt) {
        // not the right direction:
        // halfstep in the opposite direction
        r = -r / 2;
        t += r;
      }
      else if (t + r < 0 || t + r > 1) {
        // oops, we've gone too far:
        // revert with a halfstep
        r = r / 2;
        dt = old_dt;
      }
      else {
        // progress:
        t += r;
      }
    }

    return dt < epsilon;
  };


  /**
    * Check if a point is on a cubic bezier curve segment with a thickness.
    *
    * @param  {number} x       The X coordinate of the point to check.
    * @param  {number} y       The Y coordinate of the point to check.
    * @param  {number} x1      The X coordinate of the curve start point.
    * @param  {number} y1      The Y coordinate of the curve start point.
    * @param  {number} x2      The X coordinate of the curve end point.
    * @param  {number} y2      The Y coordinate of the curve end point.
    * @param  {number} cpx1    The X coordinate of the 1st curve control point.
    * @param  {number} cpy1    The Y coordinate of the 1st curve control point.
    * @param  {number} cpx2    The X coordinate of the 2nd curve control point.
    * @param  {number} cpy2    The Y coordinate of the 2nd curve control point.
    * @param  {number} epsilon The precision (consider the line thickness).
    * @return {boolean}        True if (x,y) is on the curve segment,
    *                          false otherwise.
  */
  sigma.utils.isPointOnBezierCurve =
    function(x, y, x1, y1, x2, y2, cpx1, cpy1, cpx2, cpy2, epsilon) {
    // Fails if the point is too far from the extremities of the segment,
    // preventing for more costly computation:
    var dP1CP1 = sigma.utils.getDistance(x1, y1, cpx1, cpy1);
    if (Math.abs(x - x1) > dP1CP1 || Math.abs(y - y1) > dP1CP1) {
      return false;
    }

    var dP1 = sigma.utils.getDistance(x, y, x1, y1),
        dP2 = sigma.utils.getDistance(x, y, x2, y2),
        t = 0.5,
        r = (dP1 < dP2) ? -0.01 : 0.01,
        rThreshold = 0.001,
        i = 100,
        pt = sigma.utils.getPointOnBezierCurve(
          t, x1, y1, x2, y2, cpx1, cpy1, cpx2, cpy2),
        dt = sigma.utils.getDistance(x, y, pt.x, pt.y),
        old_dt;

    // This algorithm minimizes the distance from the point to the curve. It
    // find the optimal t value where t=0 is the start point and t=1 is the end
    // point of the curve, starting from t=0.5.
    // It terminates because it runs a maximum of i interations.
    while (i-- > 0 &&
      t >= 0 && t <= 1 &&
      (dt > epsilon) &&
      (r > rThreshold || r < -rThreshold)) {
      old_dt = dt;
      pt = sigma.utils.getPointOnBezierCurve(
        t, x1, y1, x2, y2, cpx1, cpy1, cpx2, cpy2);
      dt = sigma.utils.getDistance(x, y, pt.x, pt.y);

      if (dt > old_dt) {
        // not the right direction:
        // halfstep in the opposite direction
        r = -r / 2;
        t += r;
      }
      else if (t + r < 0 || t + r > 1) {
        // oops, we've gone too far:
        // revert with a halfstep
        r = r / 2;
        dt = old_dt;
      }
      else {
        // progress:
        t += r;
      }
    }

    return dt < epsilon;
  };


  /**
   * ************
   * EVENTS UTILS:
   * ************
   */
  /**
   * Here are some useful functions to unify extraction of the information we
   * need with mouse events and touch events, from different browsers:
   */

  /**
   * Extract the local X position from a mouse or touch event.
   *
   * @param  {event}  e A mouse or touch event.
   * @return {number}   The local X value of the mouse.
   */
  sigma.utils.getX = function(e) {
    return (
      (e.offsetX !== undefined && e.offsetX) ||
      (e.layerX !== undefined && e.layerX) ||
      (e.clientX !== undefined && e.clientX)
    );
  };

  /**
   * Extract the local Y position from a mouse or touch event.
   *
   * @param  {event}  e A mouse or touch event.
   * @return {number}   The local Y value of the mouse.
   */
  sigma.utils.getY = function(e) {
    return (
      (e.offsetY !== undefined && e.offsetY) ||
      (e.layerY !== undefined && e.layerY) ||
      (e.clientY !== undefined && e.clientY)
    );
  };

  /**
   * The pixel ratio of the screen. Taking zoom into account
   *
   * @return {number}        Pixel ratio of the screen
   */
  sigma.utils.getPixelRatio = function() {
    var ratio = 1;
    if (window.screen.deviceXDPI !== undefined &&
         window.screen.logicalXDPI !== undefined &&
         window.screen.deviceXDPI > window.screen.logicalXDPI) {
        ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
    }
    else if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }
    return ratio;
  };

  /**
   * Extract the width from a mouse or touch event.
   *
   * @param  {event}  e A mouse or touch event.
   * @return {number}   The width of the event's target.
   */
  sigma.utils.getWidth = function(e) {
    var w = (!e.target.ownerSVGElement) ?
              e.target.width :
              e.target.ownerSVGElement.width;

    return (
      (typeof w === 'number' && w) ||
      (w !== undefined && w.baseVal !== undefined && w.baseVal.value)
    );
  };

  /**
   * Extract the center from a mouse or touch event.
   *
   * @param  {event}  e A mouse or touch event.
   * @return {object}   The center of the event's target.
   */
  sigma.utils.getCenter = function(e) {
    var ratio = e.target.namespaceURI.indexOf('svg') !== -1 ? 1 :
        sigma.utils.getPixelRatio();
    return {
      x: sigma.utils.getWidth(e) / (2 * ratio),
      y: sigma.utils.getHeight(e) / (2 * ratio)
    };
  };

  /**
   * Convert mouse coords to sigma coords
   *
   * @param  {event}   e A mouse or touch event.
   * @param  {number?} x The x coord to convert
   * @param  {number?} x The y coord to convert
   *
   * @return {object}    The standardized event
   */
  sigma.utils.mouseCoords = function(e, x, y) {
    x = x || sigma.utils.getX(e);
    y = y || sigma.utils.getY(e);
    return {
        x: x - sigma.utils.getCenter(e).x,
        y: y - sigma.utils.getCenter(e).y,
        clientX: e.clientX,
        clientY: e.clientY,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey
    };
  };

  /**
   * Extract the height from a mouse or touch event.
   *
   * @param  {event}  e A mouse or touch event.
   * @return {number}   The height of the event's target.
   */
  sigma.utils.getHeight = function(e) {
    var h = (!e.target.ownerSVGElement) ?
              e.target.height :
              e.target.ownerSVGElement.height;

    return (
      (typeof h === 'number' && h) ||
      (h !== undefined && h.baseVal !== undefined && h.baseVal.value)
    );
  };

  /**
   * Extract the wheel delta from a mouse or touch event.
   *
   * @param  {event}  e A mouse or touch event.
   * @return {number}   The wheel delta of the mouse.
   */
  sigma.utils.getDelta = function(e) {
    return (
      (e.wheelDelta !== undefined && e.wheelDelta) ||
      (e.detail !== undefined && -e.detail)
    );
  };

  /**
   * Returns the offset of a DOM element.
   *
   * @param  {DOMElement} dom The element to retrieve the position.
   * @return {object}         The offset of the DOM element (top, left).
   */
  sigma.utils.getOffset = function(dom) {
    var left = 0,
        top = 0;

    while (dom) {
      top = top + parseInt(dom.offsetTop);
      left = left + parseInt(dom.offsetLeft);
      dom = dom.offsetParent;
    }

    return {
      top: top,
      left: left
    };
  };

  /**
   * Simulates a "double click" event.
   *
   * @param  {HTMLElement} target   The event target.
   * @param  {string}      type     The event type.
   * @param  {function}    callback The callback to execute.
   */
  sigma.utils.doubleClick = function(target, type, callback) {
    var clicks = 0,
        self = this,
        handlers;

    target._doubleClickHandler = target._doubleClickHandler || {};
    target._doubleClickHandler[type] = target._doubleClickHandler[type] || [];
    handlers = target._doubleClickHandler[type];

    handlers.push(function(e) {
      clicks++;

      if (clicks === 2) {
        clicks = 0;
        return callback(e);
      } else if (clicks === 1) {
        setTimeout(function() {
          clicks = 0;
        }, sigma.settings.doubleClickTimeout);
      }
    });

    target.addEventListener(type, handlers[handlers.length - 1], false);
  };

  /**
   * Unbind simulated "double click" events.
   *
   * @param  {HTMLElement} target   The event target.
   * @param  {string}      type     The event type.
   */
  sigma.utils.unbindDoubleClick = function(target, type) {
    var handler,
        handlers = (target._doubleClickHandler || {})[type] || [];

    while ((handler = handlers.pop())) {
      target.removeEventListener(type, handler);
    }

    delete (target._doubleClickHandler || {})[type];
  };




  /**
   * Here are just some of the most basic easing functions, used for the
   * animated camera "goTo" calls.
   *
   * If you need some more easings functions, don't hesitate to add them to
   * sigma.utils.easings. But I will not add some more here or merge PRs
   * containing, because I do not want sigma sources full of overkill and never
   * used stuff...
   */
  sigma.utils.easings = sigma.utils.easings || {};
  sigma.utils.easings.linearNone = function(k) {
    return k;
  };
  sigma.utils.easings.quadraticIn = function(k) {
    return k * k;
  };
  sigma.utils.easings.quadraticOut = function(k) {
    return k * (2 - k);
  };
  sigma.utils.easings.quadraticInOut = function(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k;
    return - 0.5 * (--k * (k - 2) - 1);
  };
  sigma.utils.easings.cubicIn = function(k) {
    return k * k * k;
  };
  sigma.utils.easings.cubicOut = function(k) {
    return --k * k * k + 1;
  };
  sigma.utils.easings.cubicInOut = function(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k;
    return 0.5 * ((k -= 2) * k * k + 2);
  };




  /**
   * ************
   * WEBGL UTILS:
   * ************
   */
  /**
   * Loads a WebGL shader and returns it.
   *
   * @param  {WebGLContext}           gl           The WebGLContext to use.
   * @param  {string}                 shaderSource The shader source.
   * @param  {number}                 shaderType   The type of shader.
   * @param  {function(string): void} error        Callback for errors.
   * @return {WebGLShader}                         The created shader.
   */
  sigma.utils.loadShader = function(gl, shaderSource, shaderType, error) {
    var compiled,
        shader = gl.createShader(shaderType);

    // Load the shader source
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check the compile status
    compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    // If something went wrong:
    if (!compiled) {
      if (error) {
        error(
          'Error compiling shader "' + shader + '":' +
          gl.getShaderInfoLog(shader)
        );
      }

      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  /**
   * Creates a program, attaches shaders, binds attrib locations, links the
   * program and calls useProgram.
   *
   * @param  {Array.<WebGLShader>}    shaders   The shaders to attach.
   * @param  {Array.<string>}         attribs   The attribs names.
   * @param  {Array.<number>}         locations The locations for the attribs.
   * @param  {function(string): void} error     Callback for errors.
   * @return {WebGLProgram}                     The created program.
   */
  sigma.utils.loadProgram = function(gl, shaders, attribs, loc, error) {
    var i,
        linked,
        program = gl.createProgram();

    for (i = 0; i < shaders.length; ++i)
      gl.attachShader(program, shaders[i]);

    if (attribs)
      for (i = 0; i < attribs.length; ++i)
        gl.bindAttribLocation(
          program,
          locations ? locations[i] : i,
          opt_attribs[i]
        );

    gl.linkProgram(program);

    // Check the link status
    linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      if (error)
        error('Error in program linking: ' + gl.getProgramInfoLog(program));

      gl.deleteProgram(program);
      return null;
    }

    return program;
  };




  /**
   * *********
   * MATRICES:
   * *********
   * The following utils are just here to help generating the transformation
   * matrices for the WebGL renderers.
   */
  sigma.utils.pkg('sigma.utils.matrices');

  /**
   * The returns a 3x3 translation matrix.
   *
   * @param  {number} dx The X translation.
   * @param  {number} dy The Y translation.
   * @return {array}     Returns the matrix.
   */
  sigma.utils.matrices.translation = function(dx, dy) {
    return [
      1, 0, 0,
      0, 1, 0,
      dx, dy, 1
    ];
  };

  /**
   * The returns a 3x3 or 2x2 rotation matrix.
   *
   * @param  {number}  angle The rotation angle.
   * @param  {boolean} m2    If true, the function will return a 2x2 matrix.
   * @return {array}         Returns the matrix.
   */
  sigma.utils.matrices.rotation = function(angle, m2) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle);

    return m2 ? [
      cos, -sin,
      sin, cos
    ] : [
      cos, -sin, 0,
      sin, cos, 0,
      0, 0, 1
    ];
  };

  /**
   * The returns a 3x3 or 2x2 homothetic transformation matrix.
   *
   * @param  {number}  ratio The scaling ratio.
   * @param  {boolean} m2    If true, the function will return a 2x2 matrix.
   * @return {array}         Returns the matrix.
   */
  sigma.utils.matrices.scale = function(ratio, m2) {
    return m2 ? [
      ratio, 0,
      0, ratio
    ] : [
      ratio, 0, 0,
      0, ratio, 0,
      0, 0, 1
    ];
  };

  /**
   * The returns a 3x3 or 2x2 homothetic transformation matrix.
   *
   * @param  {array}   a  The first matrix.
   * @param  {array}   b  The second matrix.
   * @param  {boolean} m2 If true, the function will assume both matrices are
   *                      2x2.
   * @return {array}      Returns the matrix.
   */
  sigma.utils.matrices.multiply = function(a, b, m2) {
    var l = m2 ? 2 : 3,
        a00 = a[0 * l + 0],
        a01 = a[0 * l + 1],
        a02 = a[0 * l + 2],
        a10 = a[1 * l + 0],
        a11 = a[1 * l + 1],
        a12 = a[1 * l + 2],
        a20 = a[2 * l + 0],
        a21 = a[2 * l + 1],
        a22 = a[2 * l + 2],
        b00 = b[0 * l + 0],
        b01 = b[0 * l + 1],
        b02 = b[0 * l + 2],
        b10 = b[1 * l + 0],
        b11 = b[1 * l + 1],
        b12 = b[1 * l + 2],
        b20 = b[2 * l + 0],
        b21 = b[2 * l + 1],
        b22 = b[2 * l + 2];

    return m2 ? [
      a00 * b00 + a01 * b10,
      a00 * b01 + a01 * b11,
      a10 * b00 + a11 * b10,
      a10 * b01 + a11 * b11
    ] : [
      a00 * b00 + a01 * b10 + a02 * b20,
      a00 * b01 + a01 * b11 + a02 * b21,
      a00 * b02 + a01 * b12 + a02 * b22,
      a10 * b00 + a11 * b10 + a12 * b20,
      a10 * b01 + a11 * b11 + a12 * b21,
      a10 * b02 + a11 * b12 + a12 * b22,
      a20 * b00 + a21 * b10 + a22 * b20,
      a20 * b01 + a21 * b11 + a22 * b21,
      a20 * b02 + a21 * b12 + a22 * b22
    ];
  };
}).call(this);

;(function(global) {
  'use strict';

  /**
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
   * requestAnimationFrame polyfill by Erik Möller.
   * fixes from Paul Irish and Tino Zijdel
   * MIT license
   */
  var x,
      lastTime = 0,
      vendors = ['ms', 'moz', 'webkit', 'o'];

  for (x = 0; x < vendors.length && !global.requestAnimationFrame; x++) {
    global.requestAnimationFrame =
      global[vendors[x] + 'RequestAnimationFrame'];
    global.cancelAnimationFrame =
      global[vendors[x] + 'CancelAnimationFrame'] ||
      global[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!global.requestAnimationFrame)
    global.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime(),
          timeToCall = Math.max(0, 16 - (currTime - lastTime)),
          id = global.setTimeout(
            function() {
              callback(currTime + timeToCall);
            },
            timeToCall
          );

      lastTime = currTime + timeToCall;
      return id;
    };

  if (!global.cancelAnimationFrame)
    global.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };

  /**
   * Function.prototype.bind polyfill found on MDN.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility
   * Public domain
   */
  if (!Function.prototype.bind)
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function')
        // Closest thing possible to the ECMAScript 5 internal IsCallable
        // function:
        throw new TypeError(
          'Function.prototype.bind - what is trying to be bound is not callable'
        );

      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP,
          fBound;

      fNOP = function() {};
      fBound = function() {
        return fToBind.apply(
          this instanceof fNOP && oThis ?
            this :
            oThis,
          aArgs.concat(Array.prototype.slice.call(arguments))
        );
      };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
    };
})(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Packages initialization:
  sigma.utils.pkg('sigma.settings');

  var settings = {
    /**
     * GRAPH SETTINGS:
     * ***************
     */
    // {boolean} Indicates if the data have to be cloned in methods to add
    //           nodes or edges.
    clone: true,
    // {boolean} Indicates if nodes "id" values and edges "id", "source" and
    //           "target" values must be set as immutable.
    immutable: true,
    // {boolean} Indicates if sigma can log its errors and warnings.
    verbose: false,


    /**
     * RENDERERS SETTINGS:
     * *******************
     */
    // {string}
    classPrefix: 'sigma',
    // {string}
    defaultNodeType: 'def',
    // {string}
    defaultEdgeType: 'def',
    // {string}
    defaultLabelColor: '#000',
    // {string}
    defaultEdgeColor: '#000',
    // {string}
    defaultNodeColor: '#000',
    // {string}
    defaultLabelSize: 14,
    // {string} Indicates how to choose the edges color. Available values:
    //          "source", "target", "default"
    edgeColor: 'source',
    // {number} Defines the minimal edge's arrow display size.
    minArrowSize: 0,
    // {string}
    font: 'arial',
    // {string} Example: 'bold'
    fontStyle: '',
    // {string} Indicates how to choose the labels color. Available values:
    //          "node", "default"
    labelColor: 'default',
    // {string} Indicates how to choose the labels size. Available values:
    //          "fixed", "proportional"
    labelSize: 'fixed',
    // {string} The ratio between the font size of the label and the node size.
    labelSizeRatio: 1,
    // {number} The minimum size a node must have to see its label displayed.
    labelThreshold: 8,
    // {number} The oversampling factor used in WebGL renderer.
    webglOversamplingRatio: 2,
    // {number} The size of the border of hovered nodes.
    borderSize: 0,
    // {number} The default hovered node border's color.
    defaultNodeBorderColor: '#000',
    // {number} The hovered node's label font. If not specified, will heritate
    //          the "font" value.
    hoverFont: '',
    // {boolean} If true, then only one node can be hovered at a time.
    singleHover: true,
    // {string} Example: 'bold'
    hoverFontStyle: '',
    // {string} Indicates how to choose the hovered nodes shadow color.
    //          Available values: "node", "default"
    labelHoverShadow: 'default',
    // {string}
    labelHoverShadowColor: '#000',
    // {string} Indicates how to choose the hovered nodes color.
    //          Available values: "node", "default"
    nodeHoverColor: 'node',
    // {string}
    defaultNodeHoverColor: '#000',
    // {string} Indicates how to choose the hovered nodes background color.
    //          Available values: "node", "default"
    labelHoverBGColor: 'default',
    // {string}
    defaultHoverLabelBGColor: '#fff',
    // {string} Indicates how to choose the hovered labels color.
    //          Available values: "node", "default"
    labelHoverColor: 'default',
    // {string}
    defaultLabelHoverColor: '#000',
    // {string} Indicates how to choose the edges hover color. Available values:
    //          "edge", "default"
    edgeHoverColor: 'edge',
    // {number} The size multiplicator of hovered edges.
    edgeHoverSizeRatio: 1,
    // {string}
    defaultEdgeHoverColor: '#000',
    // {boolean} Indicates if the edge extremities must be hovered when the
    //           edge is hovered.
    edgeHoverExtremities: false,
    // {booleans} The different drawing modes:
    //           false: Layered not displayed.
    //           true: Layered displayed.
    drawEdges: true,
    drawNodes: true,
    drawLabels: true,
    drawEdgeLabels: false,
    // {boolean} Indicates if the edges must be drawn in several frames or in
    //           one frame, as the nodes and labels are drawn.
    batchEdgesDrawing: false,
    // {boolean} Indicates if the edges must be hidden during dragging and
    //           animations.
    hideEdgesOnMove: false,
    // {numbers} The different batch sizes, when elements are displayed in
    //           several frames.
    canvasEdgesBatchSize: 500,
    webglEdgesBatchSize: 1000,




    /**
     * RESCALE SETTINGS:
     * *****************
     */
    // {string} Indicates of to scale the graph relatively to its container.
    //          Available values: "inside", "outside"
    scalingMode: 'inside',
    // {number} The margin to keep around the graph.
    sideMargin: 0,
    // {number} Determine the size of the smallest and the biggest node / edges
    //          on the screen. This mapping makes easier to display the graph,
    //          avoiding too big nodes that take half of the screen, or too
    //          small ones that are not readable. If the two parameters are
    //          equals, then the minimal display size will be 0. And if they
    //          are both equal to 0, then there is no mapping, and the radius
    //          of the nodes will be their size.
    minEdgeSize: 0.5,
    maxEdgeSize: 1,
    minNodeSize: 1,
    maxNodeSize: 8,




    /**
     * CAPTORS SETTINGS:
     * *****************
     */
    // {boolean}
    touchEnabled: true,
    // {boolean}
    mouseEnabled: true,
    // {boolean}
    mouseWheelEnabled: true,
    // {boolean}
    doubleClickEnabled: true,
    // {boolean} Defines whether the custom events such as "clickNode" can be
    //           used.
    eventsEnabled: true,
    // {number} Defines by how much multiplicating the zooming level when the
    //          user zooms with the mouse-wheel.
    zoomingRatio: 1.7,
    // {number} Defines by how much multiplicating the zooming level when the
    //          user zooms by double clicking.
    doubleClickZoomingRatio: 2.2,
    // {number} The minimum zooming level.
    zoomMin: 0.0625,
    // {number} The maximum zooming level.
    zoomMax: 2,
    // {number} The duration of animations following a mouse scrolling.
    mouseZoomDuration: 200,
    // {number} The duration of animations following a mouse double click.
    doubleClickZoomDuration: 200,
    // {number} The duration of animations following a mouse dropping.
    mouseInertiaDuration: 200,
    // {number} The inertia power (mouse captor).
    mouseInertiaRatio: 3,
    // {number} The duration of animations following a touch dropping.
    touchInertiaDuration: 200,
    // {number} The inertia power (touch captor).
    touchInertiaRatio: 3,
    // {number} The maximum time between two clicks to make it a double click.
    doubleClickTimeout: 300,
    // {number} The maximum time between two taps to make it a double tap.
    doubleTapTimeout: 300,
    // {number} The maximum time of dragging to trigger intertia.
    dragTimeout: 200,




    /**
     * GLOBAL SETTINGS:
     * ****************
     */
    // {boolean} Determines whether the instance has to refresh itself
    //           automatically when a "resize" event is dispatched from the
    //           window object.
    autoResize: true,
    // {boolean} Determines whether the "rescale" middleware has to be called
    //           automatically for each camera on refresh.
    autoRescale: true,
    // {boolean} If set to false, the camera method "goTo" will basically do
    //           nothing.
    enableCamera: true,
    // {boolean} If set to false, the nodes cannot be hovered.
    enableHovering: true,
    // {boolean} If set to true, the edges can be hovered.
    enableEdgeHovering: false,
    // {number} The size of the area around the edges to activate hovering.
    edgeHoverPrecision: 5,
    // {boolean} If set to true, the rescale middleware will ignore node sizes
    //           to determine the graphs boundings.
    rescaleIgnoreSize: false,
    // {boolean} Determines if the core has to try to catch errors on
    //           rendering.
    skipErrors: false,




    /**
     * CAMERA SETTINGS:
     * ****************
     */
    // {number} The power degrees applied to the nodes/edges size relatively to
    //          the zooming level. Basically:
    //           > onScreenR = Math.pow(zoom, nodesPowRatio) * R
    //           > onScreenT = Math.pow(zoom, edgesPowRatio) * T
    nodesPowRatio: 0.5,
    edgesPowRatio: 0.5,




    /**
     * ANIMATIONS SETTINGS:
     * ********************
     */
    // {number} The default animation time.
    animationsTime: 200
  };

  // Export the previously designed settings:
  sigma.settings = sigma.utils.extend(sigma.settings || {}, settings);
}).call(this);

;(function() {
  'use strict';

  /**
   * Dispatcher constructor.
   *
   * @return {dispatcher} The new dispatcher instance.
   */
  var dispatcher = function() {
    Object.defineProperty(this, '_handlers', {
      value: {}
    });
  };




  /**
   * Will execute the handler everytime that the indicated event (or the
   * indicated events) will be triggered.
   *
   * @param  {string}           events  The name of the event (or the events
   *                                    separated by spaces).
   * @param  {function(Object)} handler The handler to bind.
   * @return {dispatcher}               Returns the instance itself.
   */
  dispatcher.prototype.bind = function(events, handler) {
    var i,
        l,
        event,
        eArray;

    if (
      arguments.length === 1 &&
      typeof arguments[0] === 'object'
    )
      for (events in arguments[0])
        this.bind(events, arguments[0][events]);
    else if (
      arguments.length === 2 &&
      typeof arguments[1] === 'function'
    ) {
      eArray = typeof events === 'string' ? events.split(' ') : events;

      for (i = 0, l = eArray.length; i !== l; i += 1) {
        event = eArray[i];

        // Check that event is not '':
        if (!event)
          continue;

        if (!this._handlers[event])
          this._handlers[event] = [];

        // Using an object instead of directly the handler will make possible
        // later to add flags
        this._handlers[event].push({
          handler: handler
        });
      }
    } else
      throw 'bind: Wrong arguments.';

    return this;
  };

  /**
   * Removes the handler from a specified event (or specified events).
   *
   * @param  {?string}           events  The name of the event (or the events
   *                                     separated by spaces). If undefined,
   *                                     then all handlers are removed.
   * @param  {?function(object)} handler The handler to unbind. If undefined,
   *                                     each handler bound to the event or the
   *                                     events will be removed.
   * @return {dispatcher}                Returns the instance itself.
   */
  dispatcher.prototype.unbind = function(events, handler) {
    var i,
        n,
        j,
        m,
        k,
        a,
        event,
        eArray = typeof events === 'string' ? events.split(' ') : events;

    if (!arguments.length) {
      for (k in this._handlers)
        delete this._handlers[k];
      return this;
    }

    if (handler) {
      for (i = 0, n = eArray.length; i !== n; i += 1) {
        event = eArray[i];
        if (this._handlers[event]) {
          a = [];
          for (j = 0, m = this._handlers[event].length; j !== m; j += 1)
            if (this._handlers[event][j].handler !== handler)
              a.push(this._handlers[event][j]);

          this._handlers[event] = a;
        }

        if (this._handlers[event] && this._handlers[event].length === 0)
          delete this._handlers[event];
      }
    } else
      for (i = 0, n = eArray.length; i !== n; i += 1)
        delete this._handlers[eArray[i]];

    return this;
  };

  /**
   * Executes each handler bound to the event
   *
   * @param  {string}     events The name of the event (or the events separated
   *                             by spaces).
   * @param  {?object}    data   The content of the event (optional).
   * @return {dispatcher}        Returns the instance itself.
   */
  dispatcher.prototype.dispatchEvent = function(events, data) {
    var i,
        n,
        j,
        m,
        a,
        event,
        eventName,
        self = this,
        eArray = typeof events === 'string' ? events.split(' ') : events;

    data = data === undefined ? {} : data;

    for (i = 0, n = eArray.length; i !== n; i += 1) {
      eventName = eArray[i];

      if (this._handlers[eventName]) {
        event = self.getEvent(eventName, data);
        a = [];

        for (j = 0, m = this._handlers[eventName].length; j !== m; j += 1) {
          this._handlers[eventName][j].handler(event);
          if (!this._handlers[eventName][j].one)
            a.push(this._handlers[eventName][j]);
        }

        this._handlers[eventName] = a;
      }
    }

    return this;
  };

  /**
   * Return an event object.
   *
   * @param  {string}  events The name of the event.
   * @param  {?object} data   The content of the event (optional).
   * @return {object}         Returns the instance itself.
   */
  dispatcher.prototype.getEvent = function(event, data) {
    return {
      type: event,
      data: data || {},
      target: this
    };
  };

  /**
   * A useful function to deal with inheritance. It will make the target
   * inherit the prototype of the class dispatcher as well as its constructor.
   *
   * @param {object} target The target.
   */
  dispatcher.extend = function(target, args) {
    var k;

    for (k in dispatcher.prototype)
      if (dispatcher.prototype.hasOwnProperty(k))
        target[k] = dispatcher.prototype[k];

    dispatcher.apply(target, args);
  };




  /**
   * EXPORT:
   * *******
   */
  if (typeof this.sigma !== 'undefined') {
    this.sigma.classes = this.sigma.classes || {};
    this.sigma.classes.dispatcher = dispatcher;
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      exports = module.exports = dispatcher;
    exports.dispatcher = dispatcher;
  } else
    this.dispatcher = dispatcher;
}).call(this);

;(function() {
  'use strict';

  /**
   * This utils aims to facilitate the manipulation of each instance setting.
   * Using a function instead of an object brings two main advantages: First,
   * it will be easier in the future to catch settings updates through a
   * function than an object. Second, giving it a full object will "merge" it
   * to the settings object properly, keeping us to have to always add a loop.
   *
   * @return {configurable} The "settings" function.
   */
  var configurable = function() {
    var i,
        l,
        data = {},
        datas = Array.prototype.slice.call(arguments, 0);

    /**
     * The method to use to set or get any property of this instance.
     *
     * @param  {string|object}    a1 If it is a string and if a2 is undefined,
     *                               then it will return the corresponding
     *                               property. If it is a string and if a2 is
     *                               set, then it will set a2 as the property
     *                               corresponding to a1, and return this. If
     *                               it is an object, then each pair string +
     *                               object(or any other type) will be set as a
     *                               property.
     * @param  {*?}               a2 The new property corresponding to a1 if a1
     *                               is a string.
     * @return {*|configurable}      Returns itself or the corresponding
     *                               property.
     *
     * Polymorphism:
     * *************
     * Here are some basic use examples:
     *
     *  > settings = new configurable();
     *  > settings('mySetting', 42);
     *  > settings('mySetting'); // Logs: 42
     *  > settings('mySetting', 123);
     *  > settings('mySetting'); // Logs: 123
     *  > settings({mySetting: 456});
     *  > settings('mySetting'); // Logs: 456
     *
     * Also, it is possible to use the function as a fallback:
     *  > settings({mySetting: 'abc'}, 'mySetting');  // Logs: 'abc'
     *  > settings({hisSetting: 'abc'}, 'mySetting'); // Logs: 456
     */
    var settings = function(a1, a2) {
      var o,
          i,
          l,
          k;

      if (arguments.length === 1 && typeof a1 === 'string') {
        if (data[a1] !== undefined)
          return data[a1];
        for (i = 0, l = datas.length; i < l; i++)
          if (datas[i][a1] !== undefined)
            return datas[i][a1];
        return undefined;
      } else if (typeof a1 === 'object' && typeof a2 === 'string') {
        return (a1 || {})[a2] !== undefined ? a1[a2] : settings(a2);
      } else {
        o = (typeof a1 === 'object' && a2 === undefined) ? a1 : {};

        if (typeof a1 === 'string')
          o[a1] = a2;

        for (i = 0, k = Object.keys(o), l = k.length; i < l; i++)
          data[k[i]] = o[k[i]];

        return this;
      }
    };

    /**
     * This method returns a new configurable function, with new objects
     *
     * @param  {object*}  Any number of objects to search in.
     * @return {function} Returns the function. Check its documentation to know
     *                    more about how it works.
     */
    settings.embedObjects = function() {
      var args = datas.concat(
        data
      ).concat(
        Array.prototype.splice.call(arguments, 0)
      );

      return configurable.apply({}, args);
    };

    // Initialize
    for (i = 0, l = arguments.length; i < l; i++)
      settings(arguments[i]);

    return settings;
  };

  /**
   * EXPORT:
   * *******
   */
  if (typeof this.sigma !== 'undefined') {
    this.sigma.classes = this.sigma.classes || {};
    this.sigma.classes.configurable = configurable;
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      exports = module.exports = configurable;
    exports.configurable = configurable;
  } else
    this.configurable = configurable;
}).call(this);

;(function(undefined) {
  'use strict';

  var _methods = Object.create(null),
      _indexes = Object.create(null),
      _initBindings = Object.create(null),
      _methodBindings = Object.create(null),
      _methodBeforeBindings = Object.create(null),
      _defaultSettings = {
        immutable: true,
        clone: true
      },
      _defaultSettingsFunction = function(key) {
        return _defaultSettings[key];
      };

  /**
   * The graph constructor. It initializes the data and the indexes, and binds
   * the custom indexes and methods to its own scope.
   *
   * Recognized parameters:
   * **********************
   * Here is the exhaustive list of every accepted parameters in the settings
   * object:
   *
   *   {boolean} clone     Indicates if the data have to be cloned in methods
   *                       to add nodes or edges.
   *   {boolean} immutable Indicates if nodes "id" values and edges "id",
   *                       "source" and "target" values must be set as
   *                       immutable.
   *
   * @param  {?configurable} settings Eventually a settings function.
   * @return {graph}                  The new graph instance.
   */
  var graph = function(settings) {
    var k,
        fn,
        data;

    /**
     * DATA:
     * *****
     * Every data that is callable from graph methods are stored in this "data"
     * object. This object will be served as context for all these methods,
     * and it is possible to add other type of data in it.
     */
    data = {
      /**
       * SETTINGS FUNCTION:
       * ******************
       */
      settings: settings || _defaultSettingsFunction,

      /**
       * MAIN DATA:
       * **********
       */
      nodesArray: [],
      edgesArray: [],

      /**
       * GLOBAL INDEXES:
       * ***************
       * These indexes just index data by ids.
       */
      nodesIndex: Object.create(null),
      edgesIndex: Object.create(null),

      /**
       * LOCAL INDEXES:
       * **************
       * These indexes refer from node to nodes. Each key is an id, and each
       * value is the array of the ids of related nodes.
       */
      inNeighborsIndex: Object.create(null),
      outNeighborsIndex: Object.create(null),
      allNeighborsIndex: Object.create(null),

      inNeighborsCount: Object.create(null),
      outNeighborsCount: Object.create(null),
      allNeighborsCount: Object.create(null)
    };

    // Execute bindings:
    for (k in _initBindings)
      _initBindings[k].call(data);

    // Add methods to both the scope and the data objects:
    for (k in _methods) {
      fn = __bindGraphMethod(k, data, _methods[k]);
      this[k] = fn;
      data[k] = fn;
    }
  };




  /**
   * A custom tool to bind methods such that function that are bound to it will
   * be executed anytime the method is called.
   *
   * @param  {string}   methodName The name of the method to bind.
   * @param  {object}   scope      The scope where the method must be executed.
   * @param  {function} fn         The method itself.
   * @return {function}            The new method.
   */
  function __bindGraphMethod(methodName, scope, fn) {
    var result = function() {
      var k,
          res;

      // Execute "before" bound functions:
      for (k in _methodBeforeBindings[methodName])
        _methodBeforeBindings[methodName][k].apply(scope, arguments);

      // Apply the method:
      res = fn.apply(scope, arguments);

      // Execute bound functions:
      for (k in _methodBindings[methodName])
        _methodBindings[methodName][k].apply(scope, arguments);

      // Return res:
      return res;
    };

    return result;
  }

  /**
   * This custom tool function removes every pair key/value from an hash. The
   * goal is to avoid creating a new object while some other references are
   * still hanging in some scopes...
   *
   * @param  {object} obj The object to empty.
   * @return {object}     The empty object.
   */
  function __emptyObject(obj) {
    var k;

    for (k in obj)
      if (!('hasOwnProperty' in obj) || obj.hasOwnProperty(k))
        delete obj[k];

    return obj;
  }




  /**
   * This global method adds a method that will be bound to the futurly created
   * graph instances.
   *
   * Since these methods will be bound to their scope when the instances are
   * created, it does not use the prototype. Because of that, methods have to
   * be added before instances are created to make them available.
   *
   * Here is an example:
   *
   *  > graph.addMethod('getNodesCount', function() {
   *  >   return this.nodesArray.length;
   *  > });
   *  >
   *  > var myGraph = new graph();
   *  > console.log(myGraph.getNodesCount()); // outputs 0
   *
   * @param  {string}   methodName The name of the method.
   * @param  {function} fn         The method itself.
   * @return {object}              The global graph constructor.
   */
  graph.addMethod = function(methodName, fn) {
    if (
      typeof methodName !== 'string' ||
      typeof fn !== 'function' ||
      arguments.length !== 2
    )
      throw 'addMethod: Wrong arguments.';

    if (_methods[methodName] || graph[methodName])
      throw 'The method "' + methodName + '" already exists.';

    _methods[methodName] = fn;
    _methodBindings[methodName] = Object.create(null);
    _methodBeforeBindings[methodName] = Object.create(null);

    return this;
  };

  /**
   * This global method returns true if the method has already been added, and
   * false else.
   *
   * Here are some examples:
   *
   *  > graph.hasMethod('addNode'); // returns true
   *  > graph.hasMethod('hasMethod'); // returns true
   *  > graph.hasMethod('unexistingMethod'); // returns false
   *
   * @param  {string}  methodName The name of the method.
   * @return {boolean}            The result.
   */
  graph.hasMethod = function(methodName) {
    return !!(_methods[methodName] || graph[methodName]);
  };

  /**
   * This global methods attaches a function to a method. Anytime the specified
   * method is called, the attached function is called right after, with the
   * same arguments and in the same scope. The attached function is called
   * right before if the last argument is true, unless the method is the graph
   * constructor.
   *
   * To attach a function to the graph constructor, use 'constructor' as the
   * method name (first argument).
   *
   * The main idea is to have a clean way to keep custom indexes up to date,
   * for instance:
   *
   *  > var timesAddNodeCalled = 0;
   *  > graph.attach('addNode', 'timesAddNodeCalledInc', function() {
   *  >   timesAddNodeCalled++;
   *  > });
   *  >
   *  > var myGraph = new graph();
   *  > console.log(timesAddNodeCalled); // outputs 0
   *  >
   *  > myGraph.addNode({ id: '1' }).addNode({ id: '2' });
   *  > console.log(timesAddNodeCalled); // outputs 2
   *
   * The idea for calling a function before is to provide pre-processors, for
   * instance:
   *
   *  > var colorPalette = { Person: '#C3CBE1', Place: '#9BDEBD' };
   *  > graph.attach('addNode', 'applyNodeColorPalette', function(n) {
   *  >   n.color = colorPalette[n.category];
   *  > }, true);
   *  >
   *  > var myGraph = new graph();
   *  > myGraph.addNode({ id: 'n0', category: 'Person' });
   *  > console.log(myGraph.nodes('n0').color); // outputs '#C3CBE1'
   *
   * @param  {string}   methodName The name of the related method or
   *                               "constructor".
   * @param  {string}   key        The key to identify the function to attach.
   * @param  {function} fn         The function to bind.
   * @param  {boolean}  before     If true the function is called right before.
   * @return {object}              The global graph constructor.
   */
  graph.attach = function(methodName, key, fn, before) {
    if (
      typeof methodName !== 'string' ||
      typeof key !== 'string' ||
      typeof fn !== 'function' ||
      arguments.length < 3 ||
      arguments.length > 4
    )
      throw 'attach: Wrong arguments.';

    var bindings;

    if (methodName === 'constructor')
      bindings = _initBindings;
    else {
      if (before) {
        if (!_methodBeforeBindings[methodName])
        throw 'The method "' + methodName + '" does not exist.';

        bindings = _methodBeforeBindings[methodName];
      }
      else {
        if (!_methodBindings[methodName])
          throw 'The method "' + methodName + '" does not exist.';

        bindings = _methodBindings[methodName];
      }
    }

    if (bindings[key])
      throw 'A function "' + key + '" is already attached ' +
            'to the method "' + methodName + '".';

    bindings[key] = fn;

    return this;
  };

  /**
   * Alias of attach(methodName, key, fn, true).
   */
  graph.attachBefore = function(methodName, key, fn) {
    return this.attach(methodName, key, fn, true);
  };

  /**
   * This methods is just an helper to deal with custom indexes. It takes as
   * arguments the name of the index and an object containing all the different
   * functions to bind to the methods.
   *
   * Here is a basic example, that creates an index to keep the number of nodes
   * in the current graph. It also adds a method to provide a getter on that
   * new index:
   *
   *  > sigma.classes.graph.addIndex('nodesCount', {
   *  >   constructor: function() {
   *  >     this.nodesCount = 0;
   *  >   },
   *  >   addNode: function() {
   *  >     this.nodesCount++;
   *  >   },
   *  >   dropNode: function() {
   *  >     this.nodesCount--;
   *  >   }
   *  > });
   *  >
   *  > sigma.classes.graph.addMethod('getNodesCount', function() {
   *  >   return this.nodesCount;
   *  > });
   *  >
   *  > var myGraph = new sigma.classes.graph();
   *  > console.log(myGraph.getNodesCount()); // outputs 0
   *  >
   *  > myGraph.addNode({ id: '1' }).addNode({ id: '2' });
   *  > console.log(myGraph.getNodesCount()); // outputs 2
   *
   * @param  {string} name     The name of the index.
   * @param  {object} bindings The object containing the functions to bind.
   * @return {object}          The global graph constructor.
   */
  graph.addIndex = function(name, bindings) {
    if (
      typeof name !== 'string' ||
      Object(bindings) !== bindings ||
      arguments.length !== 2
    )
      throw 'addIndex: Wrong arguments.';

    if (_indexes[name])
      throw 'The index "' + name + '" already exists.';

    var k;

    // Store the bindings:
    _indexes[name] = bindings;

    // Attach the bindings:
    for (k in bindings)
      if (typeof bindings[k] !== 'function')
        throw 'The bindings must be functions.';
      else
        graph.attach(k, name, bindings[k]);

    return this;
  };




  /**
   * This method adds a node to the graph. The node must be an object, with a
   * string under the key "id". Except for this, it is possible to add any
   * other attribute, that will be preserved all along the manipulations.
   *
   * If the graph option "clone" has a truthy value, the node will be cloned
   * when added to the graph. Also, if the graph option "immutable" has a
   * truthy value, its id will be defined as immutable.
   *
   * @param  {object} node The node to add.
   * @return {object}      The graph instance.
   */
  graph.addMethod('addNode', function(node) {
    // Check that the node is an object and has an id:
    if (Object(node) !== node || arguments.length !== 1)
      throw 'addNode: Wrong arguments.';

    if (typeof node.id !== 'string' && typeof node.id !== 'number')
      throw 'The node must have a string or number id.';

    if (this.nodesIndex[node.id])
      throw 'The node "' + node.id + '" already exists.';

    var k,
        id = node.id,
        validNode = Object.create(null);

    // Check the "clone" option:
    if (this.settings('clone')) {
      for (k in node)
        if (k !== 'id')
          validNode[k] = node[k];
    } else
      validNode = node;

    // Check the "immutable" option:
    if (this.settings('immutable'))
      Object.defineProperty(validNode, 'id', {
        value: id,
        enumerable: true
      });
    else
      validNode.id = id;

    // Add empty containers for edges indexes:
    this.inNeighborsIndex[id] = Object.create(null);
    this.outNeighborsIndex[id] = Object.create(null);
    this.allNeighborsIndex[id] = Object.create(null);

    this.inNeighborsCount[id] = 0;
    this.outNeighborsCount[id] = 0;
    this.allNeighborsCount[id] = 0;

    // Add the node to indexes:
    this.nodesArray.push(validNode);
    this.nodesIndex[validNode.id] = validNode;

    // Return the current instance:
    return this;
  });

  /**
   * This method adds an edge to the graph. The edge must be an object, with a
   * string under the key "id", and strings under the keys "source" and
   * "target" that design existing nodes. Except for this, it is possible to
   * add any other attribute, that will be preserved all along the
   * manipulations.
   *
   * If the graph option "clone" has a truthy value, the edge will be cloned
   * when added to the graph. Also, if the graph option "immutable" has a
   * truthy value, its id, source and target will be defined as immutable.
   *
   * @param  {object} edge The edge to add.
   * @return {object}      The graph instance.
   */
  graph.addMethod('addEdge', function(edge) {
    // Check that the edge is an object and has an id:
    if (Object(edge) !== edge || arguments.length !== 1)
      throw 'addEdge: Wrong arguments.';

    if (typeof edge.id !== 'string' && typeof edge.id !== 'number')
      throw 'The edge must have a string or number id.';

    if ((typeof edge.source !== 'string' && typeof edge.source !== 'number') ||
        !this.nodesIndex[edge.source])
      throw 'The edge source must have an existing node id.';

    if ((typeof edge.target !== 'string' && typeof edge.target !== 'number') ||
        !this.nodesIndex[edge.target])
      throw 'The edge target must have an existing node id.';

    if (this.edgesIndex[edge.id])
      throw 'The edge "' + edge.id + '" already exists.';

    var k,
        validEdge = Object.create(null);

    // Check the "clone" option:
    if (this.settings('clone')) {
      for (k in edge)
        if (k !== 'id' && k !== 'source' && k !== 'target')
          validEdge[k] = edge[k];
    } else
      validEdge = edge;

    // Check the "immutable" option:
    if (this.settings('immutable')) {
      Object.defineProperty(validEdge, 'id', {
        value: edge.id,
        enumerable: true
      });

      Object.defineProperty(validEdge, 'source', {
        value: edge.source,
        enumerable: true
      });

      Object.defineProperty(validEdge, 'target', {
        value: edge.target,
        enumerable: true
      });
    } else {
      validEdge.id = edge.id;
      validEdge.source = edge.source;
      validEdge.target = edge.target;
    }

    // Add the edge to indexes:
    this.edgesArray.push(validEdge);
    this.edgesIndex[validEdge.id] = validEdge;

    if (!this.inNeighborsIndex[validEdge.target][validEdge.source])
      this.inNeighborsIndex[validEdge.target][validEdge.source] =
        Object.create(null);
    this.inNeighborsIndex[validEdge.target][validEdge.source][validEdge.id] =
      validEdge;

    if (!this.outNeighborsIndex[validEdge.source][validEdge.target])
      this.outNeighborsIndex[validEdge.source][validEdge.target] =
        Object.create(null);
    this.outNeighborsIndex[validEdge.source][validEdge.target][validEdge.id] =
      validEdge;

    if (!this.allNeighborsIndex[validEdge.source][validEdge.target])
      this.allNeighborsIndex[validEdge.source][validEdge.target] =
        Object.create(null);
    this.allNeighborsIndex[validEdge.source][validEdge.target][validEdge.id] =
      validEdge;

    if (validEdge.target !== validEdge.source) {
      if (!this.allNeighborsIndex[validEdge.target][validEdge.source])
        this.allNeighborsIndex[validEdge.target][validEdge.source] =
          Object.create(null);
      this.allNeighborsIndex[validEdge.target][validEdge.source][validEdge.id] =
        validEdge;
    }

    // Keep counts up to date:
    this.inNeighborsCount[validEdge.target]++;
    this.outNeighborsCount[validEdge.source]++;
    this.allNeighborsCount[validEdge.target]++;
    this.allNeighborsCount[validEdge.source]++;

    return this;
  });

  /**
   * This method drops a node from the graph. It also removes each edge that is
   * bound to it, through the dropEdge method. An error is thrown if the node
   * does not exist.
   *
   * @param  {string} id The node id.
   * @return {object}    The graph instance.
   */
  graph.addMethod('dropNode', function(id) {
    // Check that the arguments are valid:
    if ((typeof id !== 'string' && typeof id !== 'number') ||
        arguments.length !== 1)
      throw 'dropNode: Wrong arguments.';

    if (!this.nodesIndex[id])
      throw 'The node "' + id + '" does not exist.';

    var i, k, l;

    // Remove the node from indexes:
    delete this.nodesIndex[id];
    for (i = 0, l = this.nodesArray.length; i < l; i++)
      if (this.nodesArray[i].id === id) {
        this.nodesArray.splice(i, 1);
        break;
      }

    // Remove related edges:
    for (i = this.edgesArray.length - 1; i >= 0; i--)
      if (this.edgesArray[i].source === id || this.edgesArray[i].target === id)
        this.dropEdge(this.edgesArray[i].id);

    // Remove related edge indexes:
    delete this.inNeighborsIndex[id];
    delete this.outNeighborsIndex[id];
    delete this.allNeighborsIndex[id];

    delete this.inNeighborsCount[id];
    delete this.outNeighborsCount[id];
    delete this.allNeighborsCount[id];

    for (k in this.nodesIndex) {
      delete this.inNeighborsIndex[k][id];
      delete this.outNeighborsIndex[k][id];
      delete this.allNeighborsIndex[k][id];
    }

    return this;
  });

  /**
   * This method drops an edge from the graph. An error is thrown if the edge
   * does not exist.
   *
   * @param  {string} id The edge id.
   * @return {object}    The graph instance.
   */
  graph.addMethod('dropEdge', function(id) {
    // Check that the arguments are valid:
    if ((typeof id !== 'string' && typeof id !== 'number') ||
        arguments.length !== 1)
      throw 'dropEdge: Wrong arguments.';

    if (!this.edgesIndex[id])
      throw 'The edge "' + id + '" does not exist.';

    var i, l, edge;

    // Remove the edge from indexes:
    edge = this.edgesIndex[id];
    delete this.edgesIndex[id];
    for (i = 0, l = this.edgesArray.length; i < l; i++)
      if (this.edgesArray[i].id === id) {
        this.edgesArray.splice(i, 1);
        break;
      }

    delete this.inNeighborsIndex[edge.target][edge.source][edge.id];
    if (!Object.keys(this.inNeighborsIndex[edge.target][edge.source]).length)
      delete this.inNeighborsIndex[edge.target][edge.source];

    delete this.outNeighborsIndex[edge.source][edge.target][edge.id];
    if (!Object.keys(this.outNeighborsIndex[edge.source][edge.target]).length)
      delete this.outNeighborsIndex[edge.source][edge.target];

    delete this.allNeighborsIndex[edge.source][edge.target][edge.id];
    if (!Object.keys(this.allNeighborsIndex[edge.source][edge.target]).length)
      delete this.allNeighborsIndex[edge.source][edge.target];

    if (edge.target !== edge.source) {
      delete this.allNeighborsIndex[edge.target][edge.source][edge.id];
      if (!Object.keys(this.allNeighborsIndex[edge.target][edge.source]).length)
        delete this.allNeighborsIndex[edge.target][edge.source];
    }

    this.inNeighborsCount[edge.target]--;
    this.outNeighborsCount[edge.source]--;
    this.allNeighborsCount[edge.source]--;
    this.allNeighborsCount[edge.target]--;

    return this;
  });

  /**
   * This method destroys the current instance. It basically empties each index
   * and methods attached to the graph.
   */
  graph.addMethod('kill', function() {
    // Delete arrays:
    this.nodesArray.length = 0;
    this.edgesArray.length = 0;
    delete this.nodesArray;
    delete this.edgesArray;

    // Delete indexes:
    delete this.nodesIndex;
    delete this.edgesIndex;
    delete this.inNeighborsIndex;
    delete this.outNeighborsIndex;
    delete this.allNeighborsIndex;
    delete this.inNeighborsCount;
    delete this.outNeighborsCount;
    delete this.allNeighborsCount;
  });

  /**
   * This method empties the nodes and edges arrays, as well as the different
   * indexes.
   *
   * @return {object} The graph instance.
   */
  graph.addMethod('clear', function() {
    this.nodesArray.length = 0;
    this.edgesArray.length = 0;

    // Due to GC issues, I prefer not to create new object. These objects are
    // only available from the methods and attached functions, but still, it is
    // better to prevent ghost references to unrelevant data...
    __emptyObject(this.nodesIndex);
    __emptyObject(this.edgesIndex);
    __emptyObject(this.nodesIndex);
    __emptyObject(this.inNeighborsIndex);
    __emptyObject(this.outNeighborsIndex);
    __emptyObject(this.allNeighborsIndex);
    __emptyObject(this.inNeighborsCount);
    __emptyObject(this.outNeighborsCount);
    __emptyObject(this.allNeighborsCount);

    return this;
  });

  /**
   * This method reads an object and adds the nodes and edges, through the
   * proper methods "addNode" and "addEdge".
   *
   * Here is an example:
   *
   *  > var myGraph = new graph();
   *  > myGraph.read({
   *  >   nodes: [
   *  >     { id: 'n0' },
   *  >     { id: 'n1' }
   *  >   ],
   *  >   edges: [
   *  >     {
   *  >       id: 'e0',
   *  >       source: 'n0',
   *  >       target: 'n1'
   *  >     }
   *  >   ]
   *  > });
   *  >
   *  > console.log(
   *  >   myGraph.nodes().length,
   *  >   myGraph.edges().length
   *  > ); // outputs 2 1
   *
   * @param  {object} g The graph object.
   * @return {object}   The graph instance.
   */
  graph.addMethod('read', function(g) {
    var i,
        a,
        l;

    a = g.nodes || [];
    for (i = 0, l = a.length; i < l; i++)
      this.addNode(a[i]);

    a = g.edges || [];
    for (i = 0, l = a.length; i < l; i++)
      this.addEdge(a[i]);

    return this;
  });

  /**
   * This methods returns one or several nodes, depending on how it is called.
   *
   * To get the array of nodes, call "nodes" without argument. To get a
   * specific node, call it with the id of the node. The get multiple node,
   * call it with an array of ids, and it will return the array of nodes, in
   * the same order.
   *
   * @param  {?(string|array)} v Eventually one id, an array of ids.
   * @return {object|array}      The related node or array of nodes.
   */
  graph.addMethod('nodes', function(v) {
    // Clone the array of nodes and return it:
    if (!arguments.length)
      return this.nodesArray.slice(0);

    // Return the related node:
    if (arguments.length === 1 &&
        (typeof v === 'string' || typeof v === 'number'))
      return this.nodesIndex[v];

    // Return an array of the related node:
    if (
      arguments.length === 1 &&
      Object.prototype.toString.call(v) === '[object Array]'
    ) {
      var i,
          l,
          a = [];

      for (i = 0, l = v.length; i < l; i++)
        if (typeof v[i] === 'string' || typeof v[i] === 'number')
          a.push(this.nodesIndex[v[i]]);
        else
          throw 'nodes: Wrong arguments.';

      return a;
    }

    throw 'nodes: Wrong arguments.';
  });

  /**
   * This methods returns the degree of one or several nodes, depending on how
   * it is called. It is also possible to get incoming or outcoming degrees
   * instead by specifying 'in' or 'out' as a second argument.
   *
   * @param  {string|array} v     One id, an array of ids.
   * @param  {?string}      which Which degree is required. Values are 'in',
   *                              'out', and by default the normal degree.
   * @return {number|array}       The related degree or array of degrees.
   */
  graph.addMethod('degree', function(v, which) {
    // Check which degree is required:
    which = {
      'in': this.inNeighborsCount,
      'out': this.outNeighborsCount
    }[which || ''] || this.allNeighborsCount;

    // Return the related node:
    if (typeof v === 'string' || typeof v === 'number')
      return which[v];

    // Return an array of the related node:
    if (Object.prototype.toString.call(v) === '[object Array]') {
      var i,
          l,
          a = [];

      for (i = 0, l = v.length; i < l; i++)
        if (typeof v[i] === 'string' || typeof v[i] === 'number')
          a.push(which[v[i]]);
        else
          throw 'degree: Wrong arguments.';

      return a;
    }

    throw 'degree: Wrong arguments.';
  });

  /**
   * This methods returns one or several edges, depending on how it is called.
   *
   * To get the array of edges, call "edges" without argument. To get a
   * specific edge, call it with the id of the edge. The get multiple edge,
   * call it with an array of ids, and it will return the array of edges, in
   * the same order.
   *
   * @param  {?(string|array)} v Eventually one id, an array of ids.
   * @return {object|array}      The related edge or array of edges.
   */
  graph.addMethod('edges', function(v) {
    // Clone the array of edges and return it:
    if (!arguments.length)
      return this.edgesArray.slice(0);

    // Return the related edge:
    if (arguments.length === 1 &&
        (typeof v === 'string' || typeof v === 'number'))
      return this.edgesIndex[v];

    // Return an array of the related edge:
    if (
      arguments.length === 1 &&
      Object.prototype.toString.call(v) === '[object Array]'
    ) {
      var i,
          l,
          a = [];

      for (i = 0, l = v.length; i < l; i++)
        if (typeof v[i] === 'string' || typeof v[i] === 'number')
          a.push(this.edgesIndex[v[i]]);
        else
          throw 'edges: Wrong arguments.';

      return a;
    }

    throw 'edges: Wrong arguments.';
  });


  /**
   * EXPORT:
   * *******
   */
  if (typeof sigma !== 'undefined') {
    sigma.classes = sigma.classes || Object.create(null);
    sigma.classes.graph = graph;
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      exports = module.exports = graph;
    exports.graph = graph;
  } else
    this.graph = graph;
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  sigma.utils.pkg('sigma.classes');

  /**
   * The camera constructor. It just initializes its attributes and methods.
   *
   * @param  {string}       id       The id.
   * @param  {sigma.classes.graph}  graph    The graph.
   * @param  {configurable} settings The settings function.
   * @param  {?object}      options  Eventually some overriding options.
   * @return {camera}                Returns the fresh new camera instance.
   */
  sigma.classes.camera = function(id, graph, settings, options) {
    sigma.classes.dispatcher.extend(this);

    Object.defineProperty(this, 'graph', {
      value: graph
    });
    Object.defineProperty(this, 'id', {
      value: id
    });
    Object.defineProperty(this, 'readPrefix', {
      value: 'read_cam' + id + ':'
    });
    Object.defineProperty(this, 'prefix', {
      value: 'cam' + id + ':'
    });

    this.x = 0;
    this.y = 0;
    this.ratio = 1;
    this.angle = 0;
    this.isAnimated = false;
    this.settings = (typeof options === 'object' && options) ?
      settings.embedObject(options) :
      settings;
  };

  /**
   * Updates the camera position.
   *
   * @param  {object} coordinates The new coordinates object.
   * @return {camera}             Returns the camera.
   */
  sigma.classes.camera.prototype.goTo = function(coordinates) {
    if (!this.settings('enableCamera'))
      return this;

    var i,
        l,
        c = coordinates || {},
        keys = ['x', 'y', 'ratio', 'angle'];

    for (i = 0, l = keys.length; i < l; i++)
      if (c[keys[i]] !== undefined) {
        if (typeof c[keys[i]] === 'number' && !isNaN(c[keys[i]]))
          this[keys[i]] = c[keys[i]];
        else
          throw 'Value for "' + keys[i] + '" is not a number.';
      }

    this.dispatchEvent('coordinatesUpdated');
    return this;
  };

  /**
   * This method takes a graph and computes for each node and edges its
   * coordinates relatively to the center of the camera. Basically, it will
   * compute the coordinates that will be used by the graphic renderers.
   *
   * Since it should be possible to use different cameras and different
   * renderers, it is possible to specify a prefix to put before the new
   * coordinates (to get something like "node.camera1_x")
   *
   * @param  {?string} read    The prefix of the coordinates to read.
   * @param  {?string} write   The prefix of the coordinates to write.
   * @param  {?object} options Eventually an object of options. Those can be:
   *                           - A restricted nodes array.
   *                           - A restricted edges array.
   *                           - A width.
   *                           - A height.
   * @return {camera}        Returns the camera.
   */
  sigma.classes.camera.prototype.applyView = function(read, write, options) {
    options = options || {};
    write = write !== undefined ? write : this.prefix;
    read = read !== undefined ? read : this.readPrefix;

    var nodes = options.nodes || this.graph.nodes(),
        edges = options.edges || this.graph.edges();

    var i,
        l,
        node,
        relCos = Math.cos(this.angle) / this.ratio,
        relSin = Math.sin(this.angle) / this.ratio,
        nodeRatio = Math.pow(this.ratio, this.settings('nodesPowRatio')),
        edgeRatio = Math.pow(this.ratio, this.settings('edgesPowRatio')),
        xOffset = (options.width || 0) / 2 - this.x * relCos - this.y * relSin,
        yOffset = (options.height || 0) / 2 - this.y * relCos + this.x * relSin;

    for (i = 0, l = nodes.length; i < l; i++) {
      node = nodes[i];
      node[write + 'x'] =
        (node[read + 'x'] || 0) * relCos +
        (node[read + 'y'] || 0) * relSin +
        xOffset;
      node[write + 'y'] =
        (node[read + 'y'] || 0) * relCos -
        (node[read + 'x'] || 0) * relSin +
        yOffset;
      node[write + 'size'] =
        (node[read + 'size'] || 0) /
        nodeRatio;
    }

    for (i = 0, l = edges.length; i < l; i++) {
      edges[i][write + 'size'] =
        (edges[i][read + 'size'] || 0) /
        edgeRatio;
    }

    return this;
  };

  /**
   * This function converts the coordinates of a point from the frame of the
   * camera to the frame of the graph.
   *
   * @param  {number} x The X coordinate of the point in the frame of the
   *                    camera.
   * @param  {number} y The Y coordinate of the point in the frame of the
   *                    camera.
   * @return {object}   The point coordinates in the frame of the graph.
   */
  sigma.classes.camera.prototype.graphPosition = function(x, y, vector) {
    var X = 0,
        Y = 0,
        cos = Math.cos(this.angle),
        sin = Math.sin(this.angle);

    // Revert the origin differential vector:
    if (!vector) {
      X = - (this.x * cos + this.y * sin) / this.ratio;
      Y = - (this.y * cos - this.x * sin) / this.ratio;
    }

    return {
      x: (x * cos + y * sin) / this.ratio + X,
      y: (y * cos - x * sin) / this.ratio + Y
    };
  };

  /**
   * This function converts the coordinates of a point from the frame of the
   * graph to the frame of the camera.
   *
   * @param  {number} x The X coordinate of the point in the frame of the
   *                    graph.
   * @param  {number} y The Y coordinate of the point in the frame of the
   *                    graph.
   * @return {object}   The point coordinates in the frame of the camera.
   */
  sigma.classes.camera.prototype.cameraPosition = function(x, y, vector) {
    var X = 0,
        Y = 0,
        cos = Math.cos(this.angle),
        sin = Math.sin(this.angle);

    // Revert the origin differential vector:
    if (!vector) {
      X = - (this.x * cos + this.y * sin) / this.ratio;
      Y = - (this.y * cos - this.x * sin) / this.ratio;
    }

    return {
      x: ((x - X) * cos - (y - Y) * sin) * this.ratio,
      y: ((y - Y) * cos + (x - X) * sin) * this.ratio
    };
  };

  /**
   * This method returns the transformation matrix of the camera. This is
   * especially useful to apply the camera view directly in shaders, in case of
   * WebGL rendering.
   *
   * @return {array} The transformation matrix.
   */
  sigma.classes.camera.prototype.getMatrix = function() {
    var scale = sigma.utils.matrices.scale(1 / this.ratio),
        rotation = sigma.utils.matrices.rotation(this.angle),
        translation = sigma.utils.matrices.translation(-this.x, -this.y),
        matrix = sigma.utils.matrices.multiply(
          translation,
          sigma.utils.matrices.multiply(
            rotation,
            scale
          )
        );

    return matrix;
  };

  /**
   * Taking a width and a height as parameters, this method returns the
   * coordinates of the rectangle representing the camera on screen, in the
   * graph's referentiel.
   *
   * To keep displaying labels of nodes going out of the screen, the method
   * keeps a margin around the screen in the returned rectangle.
   *
   * @param  {number} width  The width of the screen.
   * @param  {number} height The height of the screen.
   * @return {object}        The rectangle as x1, y1, x2 and y2, representing
   *                         two opposite points.
   */
  sigma.classes.camera.prototype.getRectangle = function(width, height) {
    var widthVect = this.cameraPosition(width, 0, true),
        heightVect = this.cameraPosition(0, height, true),
        centerVect = this.cameraPosition(width / 2, height / 2, true),
        marginX = this.cameraPosition(width / 4, 0, true).x,
        marginY = this.cameraPosition(0, height / 4, true).y;

    return {
      x1: this.x - centerVect.x - marginX,
      y1: this.y - centerVect.y - marginY,
      x2: this.x - centerVect.x + marginX + widthVect.x,
      y2: this.y - centerVect.y - marginY + widthVect.y,
      height: Math.sqrt(
        Math.pow(heightVect.x, 2) +
        Math.pow(heightVect.y + 2 * marginY, 2)
      )
    };
  };
}).call(this);

;(function(undefined) {
  'use strict';

  /**
   * Sigma Quadtree Module
   * =====================
   *
   * Author: Guillaume Plique (Yomguithereal)
   * Version: 0.2
   */



  /**
   * Quad Geometric Operations
   * -------------------------
   *
   * A useful batch of geometric operations used by the quadtree.
   */

  var _geom = {

    /**
     * Transforms a graph node with x, y and size into an
     * axis-aligned square.
     *
     * @param  {object} A graph node with at least a point (x, y) and a size.
     * @return {object} A square: two points (x1, y1), (x2, y2) and height.
     */
    pointToSquare: function(n) {
      return {
        x1: n.x - n.size,
        y1: n.y - n.size,
        x2: n.x + n.size,
        y2: n.y - n.size,
        height: n.size * 2
      };
    },

    /**
     * Checks whether a rectangle is axis-aligned.
     *
     * @param  {object}  A rectangle defined by two points
     *                   (x1, y1) and (x2, y2).
     * @return {boolean} True if the rectangle is axis-aligned.
     */
    isAxisAligned: function(r) {
      return r.x1 === r.x2 || r.y1 === r.y2;
    },

    /**
     * Compute top points of an axis-aligned rectangle. This is useful in
     * cases when the rectangle has been rotated (left, right or bottom up) and
     * later operations need to know the top points.
     *
     * @param  {object} An axis-aligned rectangle defined by two points
     *                  (x1, y1), (x2, y2) and height.
     * @return {object} A rectangle: two points (x1, y1), (x2, y2) and height.
     */
    axisAlignedTopPoints: function(r) {

      // Basic
      if (r.y1 === r.y2 && r.x1 < r.x2)
        return r;

      // Rotated to right
      if (r.x1 === r.x2 && r.y2 > r.y1)
        return {
          x1: r.x1 - r.height, y1: r.y1,
          x2: r.x1, y2: r.y1,
          height: r.height
        };

      // Rotated to left
      if (r.x1 === r.x2 && r.y2 < r.y1)
        return {
          x1: r.x1, y1: r.y2,
          x2: r.x2 + r.height, y2: r.y2,
          height: r.height
        };

      // Bottom's up
      return {
        x1: r.x2, y1: r.y1 - r.height,
        x2: r.x1, y2: r.y1 - r.height,
        height: r.height
      };
    },

    /**
     * Get coordinates of a rectangle's lower left corner from its top points.
     *
     * @param  {object} A rectangle defined by two points (x1, y1) and (x2, y2).
     * @return {object} Coordinates of the corner (x, y).
     */
    lowerLeftCoor: function(r) {
      var width = (
        Math.sqrt(
          Math.pow(r.x2 - r.x1, 2) +
          Math.pow(r.y2 - r.y1, 2)
        )
      );

      return {
        x: r.x1 - (r.y2 - r.y1) * r.height / width,
        y: r.y1 + (r.x2 - r.x1) * r.height / width
      };
    },

    /**
     * Get coordinates of a rectangle's lower right corner from its top points
     * and its lower left corner.
     *
     * @param  {object} A rectangle defined by two points (x1, y1) and (x2, y2).
     * @param  {object} A corner's coordinates (x, y).
     * @return {object} Coordinates of the corner (x, y).
     */
    lowerRightCoor: function(r, llc) {
      return {
        x: llc.x - r.x1 + r.x2,
        y: llc.y - r.y1 + r.y2
      };
    },

    /**
     * Get the coordinates of all the corners of a rectangle from its top point.
     *
     * @param  {object} A rectangle defined by two points (x1, y1) and (x2, y2).
     * @return {array}  An array of the four corners' coordinates (x, y).
     */
    rectangleCorners: function(r) {
      var llc = this.lowerLeftCoor(r),
          lrc = this.lowerRightCoor(r, llc);

      return [
        {x: r.x1, y: r.y1},
        {x: r.x2, y: r.y2},
        {x: llc.x, y: llc.y},
        {x: lrc.x, y: lrc.y}
      ];
    },

    /**
     * Split a square defined by its boundaries into four.
     *
     * @param  {object} Boundaries of the square (x, y, width, height).
     * @return {array}  An array containing the four new squares, themselves
     *                  defined by an array of their four corners (x, y).
     */
    splitSquare: function(b) {
      return [
        [
          {x: b.x, y: b.y},
          {x: b.x + b.width / 2, y: b.y},
          {x: b.x, y: b.y + b.height / 2},
          {x: b.x + b.width / 2, y: b.y + b.height / 2}
        ],
        [
          {x: b.x + b.width / 2, y: b.y},
          {x: b.x + b.width, y: b.y},
          {x: b.x + b.width / 2, y: b.y + b.height / 2},
          {x: b.x + b.width, y: b.y + b.height / 2}
        ],
        [
          {x: b.x, y: b.y + b.height / 2},
          {x: b.x + b.width / 2, y: b.y + b.height / 2},
          {x: b.x, y: b.y + b.height},
          {x: b.x + b.width / 2, y: b.y + b.height}
        ],
        [
          {x: b.x + b.width / 2, y: b.y + b.height / 2},
          {x: b.x + b.width, y: b.y + b.height / 2},
          {x: b.x + b.width / 2, y: b.y + b.height},
          {x: b.x + b.width, y: b.y + b.height}
        ]
      ];
    },

    /**
     * Compute the four axis between corners of rectangle A and corners of
     * rectangle B. This is needed later to check an eventual collision.
     *
     * @param  {array} An array of rectangle A's four corners (x, y).
     * @param  {array} An array of rectangle B's four corners (x, y).
     * @return {array} An array of four axis defined by their coordinates (x,y).
     */
    axis: function(c1, c2) {
      return [
        {x: c1[1].x - c1[0].x, y: c1[1].y - c1[0].y},
        {x: c1[1].x - c1[3].x, y: c1[1].y - c1[3].y},
        {x: c2[0].x - c2[2].x, y: c2[0].y - c2[2].y},
        {x: c2[0].x - c2[1].x, y: c2[0].y - c2[1].y}
      ];
    },

    /**
     * Project a rectangle's corner on an axis.
     *
     * @param  {object} Coordinates of a corner (x, y).
     * @param  {object} Coordinates of an axis (x, y).
     * @return {object} The projection defined by coordinates (x, y).
     */
    projection: function(c, a) {
      var l = (
        (c.x * a.x + c.y * a.y) /
        (Math.pow(a.x, 2) + Math.pow(a.y, 2))
      );

      return {
        x: l * a.x,
        y: l * a.y
      };
    },

    /**
     * Check whether two rectangles collide on one particular axis.
     *
     * @param  {object}   An axis' coordinates (x, y).
     * @param  {array}    Rectangle A's corners.
     * @param  {array}    Rectangle B's corners.
     * @return {boolean}  True if the rectangles collide on the axis.
     */
    axisCollision: function(a, c1, c2) {
      var sc1 = [],
          sc2 = [];

      for (var ci = 0; ci < 4; ci++) {
        var p1 = this.projection(c1[ci], a),
            p2 = this.projection(c2[ci], a);

        sc1.push(p1.x * a.x + p1.y * a.y);
        sc2.push(p2.x * a.x + p2.y * a.y);
      }

      var maxc1 = Math.max.apply(Math, sc1),
          maxc2 = Math.max.apply(Math, sc2),
          minc1 = Math.min.apply(Math, sc1),
          minc2 = Math.min.apply(Math, sc2);

      return (minc2 <= maxc1 && maxc2 >= minc1);
    },

    /**
     * Check whether two rectangles collide on each one of their four axis. If
     * all axis collide, then the two rectangles do collide on the plane.
     *
     * @param  {array}    Rectangle A's corners.
     * @param  {array}    Rectangle B's corners.
     * @return {boolean}  True if the rectangles collide.
     */
    collision: function(c1, c2) {
      var axis = this.axis(c1, c2),
          col = true;

      for (var i = 0; i < 4; i++)
        col = col && this.axisCollision(axis[i], c1, c2);

      return col;
    }
  };


  /**
   * Quad Functions
   * ------------
   *
   * The Quadtree functions themselves.
   * For each of those functions, we consider that in a splitted quad, the
   * index of each node is the following:
   * 0: top left
   * 1: top right
   * 2: bottom left
   * 3: bottom right
   *
   * Moreover, the hereafter quad's philosophy is to consider that if an element
   * collides with more than one nodes, this element belongs to each of the
   * nodes it collides with where other would let it lie on a higher node.
   */

  /**
   * Get the index of the node containing the point in the quad
   *
   * @param  {object}  point      A point defined by coordinates (x, y).
   * @param  {object}  quadBounds Boundaries of the quad (x, y, width, heigth).
   * @return {integer}            The index of the node containing the point.
   */
  function _quadIndex(point, quadBounds) {
    var xmp = quadBounds.x + quadBounds.width / 2,
        ymp = quadBounds.y + quadBounds.height / 2,
        top = (point.y < ymp),
        left = (point.x < xmp);

    if (top) {
      if (left)
        return 0;
      else
        return 1;
    }
    else {
      if (left)
        return 2;
      else
        return 3;
    }
  }

  /**
   * Get a list of indexes of nodes containing an axis-aligned rectangle
   *
   * @param  {object}  rectangle   A rectangle defined by two points (x1, y1),
   *                               (x2, y2) and height.
   * @param  {array}   quadCorners An array of the quad nodes' corners.
   * @return {array}               An array of indexes containing one to
   *                               four integers.
   */
  function _quadIndexes(rectangle, quadCorners) {
    var indexes = [];

    // Iterating through quads
    for (var i = 0; i < 4; i++)
      if ((rectangle.x2 >= quadCorners[i][0].x) &&
          (rectangle.x1 <= quadCorners[i][1].x) &&
          (rectangle.y1 + rectangle.height >= quadCorners[i][0].y) &&
          (rectangle.y1 <= quadCorners[i][2].y))
        indexes.push(i);

    return indexes;
  }

  /**
   * Get a list of indexes of nodes containing a non-axis-aligned rectangle
   *
   * @param  {array}  corners      An array containing each corner of the
   *                               rectangle defined by its coordinates (x, y).
   * @param  {array}  quadCorners  An array of the quad nodes' corners.
   * @return {array}               An array of indexes containing one to
   *                               four integers.
   */
  function _quadCollision(corners, quadCorners) {
    var indexes = [];

    // Iterating through quads
    for (var i = 0; i < 4; i++)
      if (_geom.collision(corners, quadCorners[i]))
        indexes.push(i);

    return indexes;
  }

  /**
   * Subdivide a quad by creating a node at a precise index. The function does
   * not generate all four nodes not to potentially create unused nodes.
   *
   * @param  {integer}  index The index of the node to create.
   * @param  {object}   quad  The quad object to subdivide.
   * @return {object}         A new quad representing the node created.
   */
  function _quadSubdivide(index, quad) {
    var next = quad.level + 1,
        subw = Math.round(quad.bounds.width / 2),
        subh = Math.round(quad.bounds.height / 2),
        qx = Math.round(quad.bounds.x),
        qy = Math.round(quad.bounds.y),
        x,
        y;

    switch (index) {
      case 0:
        x = qx;
        y = qy;
        break;
      case 1:
        x = qx + subw;
        y = qy;
        break;
      case 2:
        x = qx;
        y = qy + subh;
        break;
      case 3:
        x = qx + subw;
        y = qy + subh;
        break;
    }

    return _quadTree(
      {x: x, y: y, width: subw, height: subh},
      next,
      quad.maxElements,
      quad.maxLevel
    );
  }

  /**
   * Recursively insert an element into the quadtree. Only points
   * with size, i.e. axis-aligned squares, may be inserted with this
   * method.
   *
   * @param  {object}  el         The element to insert in the quadtree.
   * @param  {object}  sizedPoint A sized point defined by two top points
   *                              (x1, y1), (x2, y2) and height.
   * @param  {object}  quad       The quad in which to insert the element.
   * @return {undefined}          The function does not return anything.
   */
  function _quadInsert(el, sizedPoint, quad) {
    if (quad.level < quad.maxLevel) {

      // Searching appropriate quads
      var indexes = _quadIndexes(sizedPoint, quad.corners);

      // Iterating
      for (var i = 0, l = indexes.length; i < l; i++) {

        // Subdividing if necessary
        if (quad.nodes[indexes[i]] === undefined)
          quad.nodes[indexes[i]] = _quadSubdivide(indexes[i], quad);

        // Recursion
        _quadInsert(el, sizedPoint, quad.nodes[indexes[i]]);
      }
    }
    else {

      // Pushing the element in a leaf node
      quad.elements.push(el);
    }
  }

  /**
   * Recursively retrieve every elements held by the node containing the
   * searched point.
   *
   * @param  {object}  point The searched point (x, y).
   * @param  {object}  quad  The searched quad.
   * @return {array}         An array of elements contained in the relevant
   *                         node.
   */
  function _quadRetrievePoint(point, quad) {
    if (quad.level < quad.maxLevel) {
      var index = _quadIndex(point, quad.bounds);

      // If node does not exist we return an empty list
      if (quad.nodes[index] !== undefined) {
        return _quadRetrievePoint(point, quad.nodes[index]);
      }
      else {
        return [];
      }
    }
    else {
      return quad.elements;
    }
  }

  /**
   * Recursively retrieve every elements contained within an rectangular area
   * that may or may not be axis-aligned.
   *
   * @param  {object|array} rectData       The searched area defined either by
   *                                       an array of four corners (x, y) in
   *                                       the case of a non-axis-aligned
   *                                       rectangle or an object with two top
   *                                       points (x1, y1), (x2, y2) and height.
   * @param  {object}       quad           The searched quad.
   * @param  {function}     collisionFunc  The collision function used to search
   *                                       for node indexes.
   * @param  {array?}       els            The retrieved elements.
   * @return {array}                       An array of elements contained in the
   *                                       area.
   */
  function _quadRetrieveArea(rectData, quad, collisionFunc, els) {
    els = els || {};

    if (quad.level < quad.maxLevel) {
      var indexes = collisionFunc(rectData, quad.corners);

      for (var i = 0, l = indexes.length; i < l; i++)
        if (quad.nodes[indexes[i]] !== undefined)
          _quadRetrieveArea(
            rectData,
            quad.nodes[indexes[i]],
            collisionFunc,
            els
          );
    } else
      for (var j = 0, m = quad.elements.length; j < m; j++)
        if (els[quad.elements[j].id] === undefined)
          els[quad.elements[j].id] = quad.elements[j];

    return els;
  }

  /**
   * Creates the quadtree object itself.
   *
   * @param  {object}   bounds       The boundaries of the quad defined by an
   *                                 origin (x, y), width and heigth.
   * @param  {integer}  level        The level of the quad in the tree.
   * @param  {integer}  maxElements  The max number of element in a leaf node.
   * @param  {integer}  maxLevel     The max recursion level of the tree.
   * @return {object}                The quadtree object.
   */
  function _quadTree(bounds, level, maxElements, maxLevel) {
    return {
      level: level || 0,
      bounds: bounds,
      corners: _geom.splitSquare(bounds),
      maxElements: maxElements || 20,
      maxLevel: maxLevel || 4,
      elements: [],
      nodes: []
    };
  }


  /**
   * Sigma Quad Constructor
   * ----------------------
   *
   * The quad API as exposed to sigma.
   */

  /**
   * The quad core that will become the sigma interface with the quadtree.
   *
   * property {object} _tree  Property holding the quadtree object.
   * property {object} _geom  Exposition of the _geom namespace for testing.
   * property {object} _cache Cache for the area method.
   */
  var quad = function() {
    this._geom = _geom;
    this._tree = null;
    this._cache = {
      query: false,
      result: false
    };
  };

  /**
   * Index a graph by inserting its nodes into the quadtree.
   *
   * @param  {array}  nodes   An array of nodes to index.
   * @param  {object} params  An object of parameters with at least the quad
   *                          bounds.
   * @return {object}         The quadtree object.
   *
   * Parameters:
   * ----------
   * bounds:      {object}   boundaries of the quad defined by its origin (x, y)
   *                         width and heigth.
   * prefix:      {string?}  a prefix for node geometric attributes.
   * maxElements: {integer?} the max number of elements in a leaf node.
   * maxLevel:    {integer?} the max recursion level of the tree.
   */
  quad.prototype.index = function(nodes, params) {

    // Enforcing presence of boundaries
    if (!params.bounds)
      throw 'sigma.classes.quad.index: bounds information not given.';

    // Prefix
    var prefix = params.prefix || '';

    // Building the tree
    this._tree = _quadTree(
      params.bounds,
      0,
      params.maxElements,
      params.maxLevel
    );

    // Inserting graph nodes into the tree
    for (var i = 0, l = nodes.length; i < l; i++) {

      // Inserting node
      _quadInsert(
        nodes[i],
        _geom.pointToSquare({
          x: nodes[i][prefix + 'x'],
          y: nodes[i][prefix + 'y'],
          size: nodes[i][prefix + 'size']
        }),
        this._tree
      );
    }

    // Reset cache:
    this._cache = {
      query: false,
      result: false
    };

    // remove?
    return this._tree;
  };

  /**
   * Retrieve every graph nodes held by the quadtree node containing the
   * searched point.
   *
   * @param  {number} x of the point.
   * @param  {number} y of the point.
   * @return {array}  An array of nodes retrieved.
   */
  quad.prototype.point = function(x, y) {
    return this._tree ?
      _quadRetrievePoint({x: x, y: y}, this._tree) || [] :
      [];
  };

  /**
   * Retrieve every graph nodes within a rectangular area. The methods keep the
   * last area queried in cache for optimization reason and will act differently
   * for the same reason if the area is axis-aligned or not.
   *
   * @param  {object} A rectangle defined by two top points (x1, y1), (x2, y2)
   *                  and height.
   * @return {array}  An array of nodes retrieved.
   */
  quad.prototype.area = function(rect) {
    var serialized = JSON.stringify(rect),
        collisionFunc,
        rectData;

    // Returning cache?
    if (this._cache.query === serialized)
      return this._cache.result;

    // Axis aligned ?
    if (_geom.isAxisAligned(rect)) {
      collisionFunc = _quadIndexes;
      rectData = _geom.axisAlignedTopPoints(rect);
    }
    else {
      collisionFunc = _quadCollision;
      rectData = _geom.rectangleCorners(rect);
    }

    // Retrieving nodes
    var nodes = this._tree ?
      _quadRetrieveArea(
        rectData,
        this._tree,
        collisionFunc
      ) :
      [];

    // Object to array
    var nodesArray = [];
    for (var i in nodes)
      nodesArray.push(nodes[i]);

    // Caching
    this._cache.query = serialized;
    this._cache.result = nodesArray;

    return nodesArray;
  };


  /**
   * EXPORT:
   * *******
   */
  if (typeof this.sigma !== 'undefined') {
    this.sigma.classes = this.sigma.classes || {};
    this.sigma.classes.quad = quad;
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      exports = module.exports = quad;
    exports.quad = quad;
  } else
    this.quad = quad;
}).call(this);

;(function(undefined) {
  'use strict';

  /**
   * Sigma Quadtree Module for edges
   * ===============================
   *
   * Author: Sébastien Heymann,
   *   from the quad of Guillaume Plique (Yomguithereal)
   * Version: 0.2
   */



  /**
   * Quad Geometric Operations
   * -------------------------
   *
   * A useful batch of geometric operations used by the quadtree.
   */

  var _geom = {

    /**
     * Transforms a graph node with x, y and size into an
     * axis-aligned square.
     *
     * @param  {object} A graph node with at least a point (x, y) and a size.
     * @return {object} A square: two points (x1, y1), (x2, y2) and height.
     */
    pointToSquare: function(n) {
      return {
        x1: n.x - n.size,
        y1: n.y - n.size,
        x2: n.x + n.size,
        y2: n.y - n.size,
        height: n.size * 2
      };
    },

    /**
     * Transforms a graph edge with x1, y1, x2, y2 and size into an
     * axis-aligned square.
     *
     * @param  {object} A graph edge with at least two points
     *                  (x1, y1), (x2, y2) and a size.
     * @return {object} A square: two points (x1, y1), (x2, y2) and height.
     */
    lineToSquare: function(e) {
      if (e.y1 < e.y2) {
        // (e.x1, e.y1) on top
        if (e.x1 < e.x2) {
          // (e.x1, e.y1) on left
          return {
            x1: e.x1 - e.size,
            y1: e.y1 - e.size,
            x2: e.x2 + e.size,
            y2: e.y1 - e.size,
            height: e.y2 - e.y1 + e.size * 2
          };
        }
        // (e.x1, e.y1) on right
        return {
          x1: e.x2 - e.size,
          y1: e.y1 - e.size,
          x2: e.x1 + e.size,
          y2: e.y1 - e.size,
          height: e.y2 - e.y1 + e.size * 2
        };
      }

      // (e.x2, e.y2) on top
      if (e.x1 < e.x2) {
        // (e.x1, e.y1) on left
        return {
          x1: e.x1 - e.size,
          y1: e.y2 - e.size,
          x2: e.x2 + e.size,
          y2: e.y2 - e.size,
          height: e.y1 - e.y2 + e.size * 2
        };
      }
      // (e.x2, e.y2) on right
      return {
        x1: e.x2 - e.size,
        y1: e.y2 - e.size,
        x2: e.x1 + e.size,
        y2: e.y2 - e.size,
        height: e.y1 - e.y2 + e.size * 2
      };
    },

    /**
     * Transforms a graph edge of type 'curve' with x1, y1, x2, y2,
     * control point and size into an axis-aligned square.
     *
     * @param  {object} e  A graph edge with at least two points
     *                     (x1, y1), (x2, y2) and a size.
     * @param  {object} cp A control point (x,y).
     * @return {object}    A square: two points (x1, y1), (x2, y2) and height.
     */
    quadraticCurveToSquare: function(e, cp) {
      var pt = sigma.utils.getPointOnQuadraticCurve(
        0.5,
        e.x1,
        e.y1,
        e.x2,
        e.y2,
        cp.x,
        cp.y
      );

      // Bounding box of the two points and the point at the middle of the
      // curve:
      var minX = Math.min(e.x1, e.x2, pt.x),
          maxX = Math.max(e.x1, e.x2, pt.x),
          minY = Math.min(e.y1, e.y2, pt.y),
          maxY = Math.max(e.y1, e.y2, pt.y);

      return {
        x1: minX - e.size,
        y1: minY - e.size,
        x2: maxX + e.size,
        y2: minY - e.size,
        height: maxY - minY + e.size * 2
      };
    },

    /**
     * Transforms a graph self loop into an axis-aligned square.
     *
     * @param  {object} n A graph node with a point (x, y) and a size.
     * @return {object}   A square: two points (x1, y1), (x2, y2) and height.
     */
    selfLoopToSquare: function(n) {
      // Fitting to the curve is too costly, we compute a larger bounding box
      // using the control points:
      var cp = sigma.utils.getSelfLoopControlPoints(n.x, n.y, n.size);

      // Bounding box of the point and the two control points:
      var minX = Math.min(n.x, cp.x1, cp.x2),
          maxX = Math.max(n.x, cp.x1, cp.x2),
          minY = Math.min(n.y, cp.y1, cp.y2),
          maxY = Math.max(n.y, cp.y1, cp.y2);

      return {
        x1: minX - n.size,
        y1: minY - n.size,
        x2: maxX + n.size,
        y2: minY - n.size,
        height: maxY - minY + n.size * 2
      };
    },

    /**
     * Checks whether a rectangle is axis-aligned.
     *
     * @param  {object}  A rectangle defined by two points
     *                   (x1, y1) and (x2, y2).
     * @return {boolean} True if the rectangle is axis-aligned.
     */
    isAxisAligned: function(r) {
      return r.x1 === r.x2 || r.y1 === r.y2;
    },

    /**
     * Compute top points of an axis-aligned rectangle. This is useful in
     * cases when the rectangle has been rotated (left, right or bottom up) and
     * later operations need to know the top points.
     *
     * @param  {object} An axis-aligned rectangle defined by two points
     *                  (x1, y1), (x2, y2) and height.
     * @return {object} A rectangle: two points (x1, y1), (x2, y2) and height.
     */
    axisAlignedTopPoints: function(r) {

      // Basic
      if (r.y1 === r.y2 && r.x1 < r.x2)
        return r;

      // Rotated to right
      if (r.x1 === r.x2 && r.y2 > r.y1)
        return {
          x1: r.x1 - r.height, y1: r.y1,
          x2: r.x1, y2: r.y1,
          height: r.height
        };

      // Rotated to left
      if (r.x1 === r.x2 && r.y2 < r.y1)
        return {
          x1: r.x1, y1: r.y2,
          x2: r.x2 + r.height, y2: r.y2,
          height: r.height
        };

      // Bottom's up
      return {
        x1: r.x2, y1: r.y1 - r.height,
        x2: r.x1, y2: r.y1 - r.height,
        height: r.height
      };
    },

    /**
     * Get coordinates of a rectangle's lower left corner from its top points.
     *
     * @param  {object} A rectangle defined by two points (x1, y1) and (x2, y2).
     * @return {object} Coordinates of the corner (x, y).
     */
    lowerLeftCoor: function(r) {
      var width = (
        Math.sqrt(
          Math.pow(r.x2 - r.x1, 2) +
          Math.pow(r.y2 - r.y1, 2)
        )
      );

      return {
        x: r.x1 - (r.y2 - r.y1) * r.height / width,
        y: r.y1 + (r.x2 - r.x1) * r.height / width
      };
    },

    /**
     * Get coordinates of a rectangle's lower right corner from its top points
     * and its lower left corner.
     *
     * @param  {object} A rectangle defined by two points (x1, y1) and (x2, y2).
     * @param  {object} A corner's coordinates (x, y).
     * @return {object} Coordinates of the corner (x, y).
     */
    lowerRightCoor: function(r, llc) {
      return {
        x: llc.x - r.x1 + r.x2,
        y: llc.y - r.y1 + r.y2
      };
    },

    /**
     * Get the coordinates of all the corners of a rectangle from its top point.
     *
     * @param  {object} A rectangle defined by two points (x1, y1) and (x2, y2).
     * @return {array}  An array of the four corners' coordinates (x, y).
     */
    rectangleCorners: function(r) {
      var llc = this.lowerLeftCoor(r),
          lrc = this.lowerRightCoor(r, llc);

      return [
        {x: r.x1, y: r.y1},
        {x: r.x2, y: r.y2},
        {x: llc.x, y: llc.y},
        {x: lrc.x, y: lrc.y}
      ];
    },

    /**
     * Split a square defined by its boundaries into four.
     *
     * @param  {object} Boundaries of the square (x, y, width, height).
     * @return {array}  An array containing the four new squares, themselves
     *                  defined by an array of their four corners (x, y).
     */
    splitSquare: function(b) {
      return [
        [
          {x: b.x, y: b.y},
          {x: b.x + b.width / 2, y: b.y},
          {x: b.x, y: b.y + b.height / 2},
          {x: b.x + b.width / 2, y: b.y + b.height / 2}
        ],
        [
          {x: b.x + b.width / 2, y: b.y},
          {x: b.x + b.width, y: b.y},
          {x: b.x + b.width / 2, y: b.y + b.height / 2},
          {x: b.x + b.width, y: b.y + b.height / 2}
        ],
        [
          {x: b.x, y: b.y + b.height / 2},
          {x: b.x + b.width / 2, y: b.y + b.height / 2},
          {x: b.x, y: b.y + b.height},
          {x: b.x + b.width / 2, y: b.y + b.height}
        ],
        [
          {x: b.x + b.width / 2, y: b.y + b.height / 2},
          {x: b.x + b.width, y: b.y + b.height / 2},
          {x: b.x + b.width / 2, y: b.y + b.height},
          {x: b.x + b.width, y: b.y + b.height}
        ]
      ];
    },

    /**
     * Compute the four axis between corners of rectangle A and corners of
     * rectangle B. This is needed later to check an eventual collision.
     *
     * @param  {array} An array of rectangle A's four corners (x, y).
     * @param  {array} An array of rectangle B's four corners (x, y).
     * @return {array} An array of four axis defined by their coordinates (x,y).
     */
    axis: function(c1, c2) {
      return [
        {x: c1[1].x - c1[0].x, y: c1[1].y - c1[0].y},
        {x: c1[1].x - c1[3].x, y: c1[1].y - c1[3].y},
        {x: c2[0].x - c2[2].x, y: c2[0].y - c2[2].y},
        {x: c2[0].x - c2[1].x, y: c2[0].y - c2[1].y}
      ];
    },

    /**
     * Project a rectangle's corner on an axis.
     *
     * @param  {object} Coordinates of a corner (x, y).
     * @param  {object} Coordinates of an axis (x, y).
     * @return {object} The projection defined by coordinates (x, y).
     */
    projection: function(c, a) {
      var l = (
        (c.x * a.x + c.y * a.y) /
        (Math.pow(a.x, 2) + Math.pow(a.y, 2))
      );

      return {
        x: l * a.x,
        y: l * a.y
      };
    },

    /**
     * Check whether two rectangles collide on one particular axis.
     *
     * @param  {object}   An axis' coordinates (x, y).
     * @param  {array}    Rectangle A's corners.
     * @param  {array}    Rectangle B's corners.
     * @return {boolean}  True if the rectangles collide on the axis.
     */
    axisCollision: function(a, c1, c2) {
      var sc1 = [],
          sc2 = [];

      for (var ci = 0; ci < 4; ci++) {
        var p1 = this.projection(c1[ci], a),
            p2 = this.projection(c2[ci], a);

        sc1.push(p1.x * a.x + p1.y * a.y);
        sc2.push(p2.x * a.x + p2.y * a.y);
      }

      var maxc1 = Math.max.apply(Math, sc1),
          maxc2 = Math.max.apply(Math, sc2),
          minc1 = Math.min.apply(Math, sc1),
          minc2 = Math.min.apply(Math, sc2);

      return (minc2 <= maxc1 && maxc2 >= minc1);
    },

    /**
     * Check whether two rectangles collide on each one of their four axis. If
     * all axis collide, then the two rectangles do collide on the plane.
     *
     * @param  {array}    Rectangle A's corners.
     * @param  {array}    Rectangle B's corners.
     * @return {boolean}  True if the rectangles collide.
     */
    collision: function(c1, c2) {
      var axis = this.axis(c1, c2),
          col = true;

      for (var i = 0; i < 4; i++)
        col = col && this.axisCollision(axis[i], c1, c2);

      return col;
    }
  };


  /**
   * Quad Functions
   * ------------
   *
   * The Quadtree functions themselves.
   * For each of those functions, we consider that in a splitted quad, the
   * index of each node is the following:
   * 0: top left
   * 1: top right
   * 2: bottom left
   * 3: bottom right
   *
   * Moreover, the hereafter quad's philosophy is to consider that if an element
   * collides with more than one nodes, this element belongs to each of the
   * nodes it collides with where other would let it lie on a higher node.
   */

  /**
   * Get the index of the node containing the point in the quad
   *
   * @param  {object}  point      A point defined by coordinates (x, y).
   * @param  {object}  quadBounds Boundaries of the quad (x, y, width, heigth).
   * @return {integer}            The index of the node containing the point.
   */
  function _quadIndex(point, quadBounds) {
    var xmp = quadBounds.x + quadBounds.width / 2,
        ymp = quadBounds.y + quadBounds.height / 2,
        top = (point.y < ymp),
        left = (point.x < xmp);

    if (top) {
      if (left)
        return 0;
      else
        return 1;
    }
    else {
      if (left)
        return 2;
      else
        return 3;
    }
  }

  /**
   * Get a list of indexes of nodes containing an axis-aligned rectangle
   *
   * @param  {object}  rectangle   A rectangle defined by two points (x1, y1),
   *                               (x2, y2) and height.
   * @param  {array}   quadCorners An array of the quad nodes' corners.
   * @return {array}               An array of indexes containing one to
   *                               four integers.
   */
  function _quadIndexes(rectangle, quadCorners) {
    var indexes = [];

    // Iterating through quads
    for (var i = 0; i < 4; i++)
      if ((rectangle.x2 >= quadCorners[i][0].x) &&
          (rectangle.x1 <= quadCorners[i][1].x) &&
          (rectangle.y1 + rectangle.height >= quadCorners[i][0].y) &&
          (rectangle.y1 <= quadCorners[i][2].y))
        indexes.push(i);

    return indexes;
  }

  /**
   * Get a list of indexes of nodes containing a non-axis-aligned rectangle
   *
   * @param  {array}  corners      An array containing each corner of the
   *                               rectangle defined by its coordinates (x, y).
   * @param  {array}  quadCorners  An array of the quad nodes' corners.
   * @return {array}               An array of indexes containing one to
   *                               four integers.
   */
  function _quadCollision(corners, quadCorners) {
    var indexes = [];

    // Iterating through quads
    for (var i = 0; i < 4; i++)
      if (_geom.collision(corners, quadCorners[i]))
        indexes.push(i);

    return indexes;
  }

  /**
   * Subdivide a quad by creating a node at a precise index. The function does
   * not generate all four nodes not to potentially create unused nodes.
   *
   * @param  {integer}  index The index of the node to create.
   * @param  {object}   quad  The quad object to subdivide.
   * @return {object}         A new quad representing the node created.
   */
  function _quadSubdivide(index, quad) {
    var next = quad.level + 1,
        subw = Math.round(quad.bounds.width / 2),
        subh = Math.round(quad.bounds.height / 2),
        qx = Math.round(quad.bounds.x),
        qy = Math.round(quad.bounds.y),
        x,
        y;

    switch (index) {
      case 0:
        x = qx;
        y = qy;
        break;
      case 1:
        x = qx + subw;
        y = qy;
        break;
      case 2:
        x = qx;
        y = qy + subh;
        break;
      case 3:
        x = qx + subw;
        y = qy + subh;
        break;
    }

    return _quadTree(
      {x: x, y: y, width: subw, height: subh},
      next,
      quad.maxElements,
      quad.maxLevel
    );
  }

  /**
   * Recursively insert an element into the quadtree. Only points
   * with size, i.e. axis-aligned squares, may be inserted with this
   * method.
   *
   * @param  {object}  el         The element to insert in the quadtree.
   * @param  {object}  sizedPoint A sized point defined by two top points
   *                              (x1, y1), (x2, y2) and height.
   * @param  {object}  quad       The quad in which to insert the element.
   * @return {undefined}          The function does not return anything.
   */
  function _quadInsert(el, sizedPoint, quad) {
    if (quad.level < quad.maxLevel) {

      // Searching appropriate quads
      var indexes = _quadIndexes(sizedPoint, quad.corners);

      // Iterating
      for (var i = 0, l = indexes.length; i < l; i++) {

        // Subdividing if necessary
        if (quad.nodes[indexes[i]] === undefined)
          quad.nodes[indexes[i]] = _quadSubdivide(indexes[i], quad);

        // Recursion
        _quadInsert(el, sizedPoint, quad.nodes[indexes[i]]);
      }
    }
    else {

      // Pushing the element in a leaf node
      quad.elements.push(el);
    }
  }

  /**
   * Recursively retrieve every elements held by the node containing the
   * searched point.
   *
   * @param  {object}  point The searched point (x, y).
   * @param  {object}  quad  The searched quad.
   * @return {array}         An array of elements contained in the relevant
   *                         node.
   */
  function _quadRetrievePoint(point, quad) {
    if (quad.level < quad.maxLevel) {
      var index = _quadIndex(point, quad.bounds);

      // If node does not exist we return an empty list
      if (quad.nodes[index] !== undefined) {
        return _quadRetrievePoint(point, quad.nodes[index]);
      }
      else {
        return [];
      }
    }
    else {
      return quad.elements;
    }
  }

  /**
   * Recursively retrieve every elements contained within an rectangular area
   * that may or may not be axis-aligned.
   *
   * @param  {object|array} rectData       The searched area defined either by
   *                                       an array of four corners (x, y) in
   *                                       the case of a non-axis-aligned
   *                                       rectangle or an object with two top
   *                                       points (x1, y1), (x2, y2) and height.
   * @param  {object}       quad           The searched quad.
   * @param  {function}     collisionFunc  The collision function used to search
   *                                       for node indexes.
   * @param  {array?}       els            The retrieved elements.
   * @return {array}                       An array of elements contained in the
   *                                       area.
   */
  function _quadRetrieveArea(rectData, quad, collisionFunc, els) {
    els = els || {};

    if (quad.level < quad.maxLevel) {
      var indexes = collisionFunc(rectData, quad.corners);

      for (var i = 0, l = indexes.length; i < l; i++)
        if (quad.nodes[indexes[i]] !== undefined)
          _quadRetrieveArea(
            rectData,
            quad.nodes[indexes[i]],
            collisionFunc,
            els
          );
    } else
      for (var j = 0, m = quad.elements.length; j < m; j++)
        if (els[quad.elements[j].id] === undefined)
          els[quad.elements[j].id] = quad.elements[j];

    return els;
  }

  /**
   * Creates the quadtree object itself.
   *
   * @param  {object}   bounds       The boundaries of the quad defined by an
   *                                 origin (x, y), width and heigth.
   * @param  {integer}  level        The level of the quad in the tree.
   * @param  {integer}  maxElements  The max number of element in a leaf node.
   * @param  {integer}  maxLevel     The max recursion level of the tree.
   * @return {object}                The quadtree object.
   */
  function _quadTree(bounds, level, maxElements, maxLevel) {
    return {
      level: level || 0,
      bounds: bounds,
      corners: _geom.splitSquare(bounds),
      maxElements: maxElements || 40,
      maxLevel: maxLevel || 8,
      elements: [],
      nodes: []
    };
  }


  /**
   * Sigma Quad Constructor
   * ----------------------
   *
   * The edgequad API as exposed to sigma.
   */

  /**
   * The edgequad core that will become the sigma interface with the quadtree.
   *
   * property {object} _tree     Property holding the quadtree object.
   * property {object} _geom     Exposition of the _geom namespace for testing.
   * property {object} _cache    Cache for the area method.
   * property {boolean} _enabled Can index and retreive elements.
   */
  var edgequad = function() {
    this._geom = _geom;
    this._tree = null;
    this._cache = {
      query: false,
      result: false
    };
    this._enabled = true;
  };

  /**
   * Index a graph by inserting its edges into the quadtree.
   *
   * @param  {object} graph   A graph instance.
   * @param  {object} params  An object of parameters with at least the quad
   *                          bounds.
   * @return {object}         The quadtree object.
   *
   * Parameters:
   * ----------
   * bounds:      {object}   boundaries of the quad defined by its origin (x, y)
   *                         width and heigth.
   * prefix:      {string?}  a prefix for edge geometric attributes.
   * maxElements: {integer?} the max number of elements in a leaf node.
   * maxLevel:    {integer?} the max recursion level of the tree.
   */
  edgequad.prototype.index = function(graph, params) {
    if (!this._enabled)
      return this._tree;

    // Enforcing presence of boundaries
    if (!params.bounds)
      throw 'sigma.classes.edgequad.index: bounds information not given.';

    // Prefix
    var prefix = params.prefix || '',
        cp,
        source,
        target,
        n,
        e;

    // Building the tree
    this._tree = _quadTree(
      params.bounds,
      0,
      params.maxElements,
      params.maxLevel
    );

    var edges = graph.edges();

    // Inserting graph edges into the tree
    for (var i = 0, l = edges.length; i < l; i++) {
      source = graph.nodes(edges[i].source);
      target = graph.nodes(edges[i].target);
      e = {
        x1: source[prefix + 'x'],
        y1: source[prefix + 'y'],
        x2: target[prefix + 'x'],
        y2: target[prefix + 'y'],
        size: edges[i][prefix + 'size'] || 0
      };

      // Inserting edge
      if (edges[i].type === 'curve' || edges[i].type === 'curvedArrow') {
        if (source.id === target.id) {
          n = {
            x: source[prefix + 'x'],
            y: source[prefix + 'y'],
            size: source[prefix + 'size'] || 0
          };
          _quadInsert(
            edges[i],
            _geom.selfLoopToSquare(n),
            this._tree);
        }
        else {
          cp = sigma.utils.getQuadraticControlPoint(e.x1, e.y1, e.x2, e.y2);
          _quadInsert(
            edges[i],
            _geom.quadraticCurveToSquare(e, cp),
            this._tree);
        }
      }
      else {
        _quadInsert(
          edges[i],
          _geom.lineToSquare(e),
          this._tree);
      }
    }

    // Reset cache:
    this._cache = {
      query: false,
      result: false
    };

    // remove?
    return this._tree;
  };

  /**
   * Retrieve every graph edges held by the quadtree node containing the
   * searched point.
   *
   * @param  {number} x of the point.
   * @param  {number} y of the point.
   * @return {array}  An array of edges retrieved.
   */
  edgequad.prototype.point = function(x, y) {
    if (!this._enabled)
      return [];

    return this._tree ?
      _quadRetrievePoint({x: x, y: y}, this._tree) || [] :
      [];
  };

  /**
   * Retrieve every graph edges within a rectangular area. The methods keep the
   * last area queried in cache for optimization reason and will act differently
   * for the same reason if the area is axis-aligned or not.
   *
   * @param  {object} A rectangle defined by two top points (x1, y1), (x2, y2)
   *                  and height.
   * @return {array}  An array of edges retrieved.
   */
  edgequad.prototype.area = function(rect) {
    if (!this._enabled)
      return [];

    var serialized = JSON.stringify(rect),
        collisionFunc,
        rectData;

    // Returning cache?
    if (this._cache.query === serialized)
      return this._cache.result;

    // Axis aligned ?
    if (_geom.isAxisAligned(rect)) {
      collisionFunc = _quadIndexes;
      rectData = _geom.axisAlignedTopPoints(rect);
    }
    else {
      collisionFunc = _quadCollision;
      rectData = _geom.rectangleCorners(rect);
    }

    // Retrieving edges
    var edges = this._tree ?
      _quadRetrieveArea(
        rectData,
        this._tree,
        collisionFunc
      ) :
      [];

    // Object to array
    var edgesArray = [];
    for (var i in edges)
      edgesArray.push(edges[i]);

    // Caching
    this._cache.query = serialized;
    this._cache.result = edgesArray;

    return edgesArray;
  };


  /**
   * EXPORT:
   * *******
   */
  if (typeof this.sigma !== 'undefined') {
    this.sigma.classes = this.sigma.classes || {};
    this.sigma.classes.edgequad = edgequad;
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      exports = module.exports = edgequad;
    exports.edgequad = edgequad;
  } else
    this.edgequad = edgequad;
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.captors');

  /**
   * The user inputs default captor. It deals with mouse events, keyboards
   * events and touch events.
   *
   * @param  {DOMElement}   target   The DOM element where the listeners will be
   *                                 bound.
   * @param  {camera}       camera   The camera related to the target.
   * @param  {configurable} settings The settings function.
   * @return {sigma.captor}          The fresh new captor instance.
   */
  sigma.captors.mouse = function(target, camera, settings) {
    var _self = this,
        _target = target,
        _camera = camera,
        _settings = settings,

        // CAMERA MANAGEMENT:
        // ******************
        // The camera position when the user starts dragging:
        _startCameraX,
        _startCameraY,
        _startCameraAngle,

        // The latest stage position:
        _lastCameraX,
        _lastCameraY,
        _lastCameraAngle,
        _lastCameraRatio,

        // MOUSE MANAGEMENT:
        // *****************
        // The mouse position when the user starts dragging:
        _startMouseX,
        _startMouseY,

        _isMouseDown,
        _isMoving,
        _hasDragged,
        _downStartTime,
        _movingTimeoutId;

    sigma.classes.dispatcher.extend(this);

    sigma.utils.doubleClick(_target, 'click', _doubleClickHandler);
    _target.addEventListener('DOMMouseScroll', _wheelHandler, false);
    _target.addEventListener('mousewheel', _wheelHandler, false);
    _target.addEventListener('mousemove', _moveHandler, false);
    _target.addEventListener('mousedown', _downHandler, false);
    _target.addEventListener('click', _clickHandler, false);
    _target.addEventListener('mouseout', _outHandler, false);
    document.addEventListener('mouseup', _upHandler, false);




    /**
     * This method unbinds every handlers that makes the captor work.
     */
    this.kill = function() {
      sigma.utils.unbindDoubleClick(_target, 'click');
      _target.removeEventListener('DOMMouseScroll', _wheelHandler);
      _target.removeEventListener('mousewheel', _wheelHandler);
      _target.removeEventListener('mousemove', _moveHandler);
      _target.removeEventListener('mousedown', _downHandler);
      _target.removeEventListener('click', _clickHandler);
      _target.removeEventListener('mouseout', _outHandler);
      document.removeEventListener('mouseup', _upHandler);
    };




    // MOUSE EVENTS:
    // *************

    /**
     * The handler listening to the 'move' mouse event. It will effectively
     * drag the graph.
     *
     * @param {event} e A mouse event.
     */
    function _moveHandler(e) {
      var x,
          y,
          pos;

      // Dispatch event:
      if (_settings('mouseEnabled')) {
        _self.dispatchEvent('mousemove',
          sigma.utils.mouseCoords(e));

        if (_isMouseDown) {
          _isMoving = true;
          _hasDragged = true;

          if (_movingTimeoutId)
            clearTimeout(_movingTimeoutId);

          _movingTimeoutId = setTimeout(function() {
            _isMoving = false;
          }, _settings('dragTimeout'));

          sigma.misc.animation.killAll(_camera);

          _camera.isMoving = true;
          pos = _camera.cameraPosition(
            sigma.utils.getX(e) - _startMouseX,
            sigma.utils.getY(e) - _startMouseY,
            true
          );

          x = _startCameraX - pos.x;
          y = _startCameraY - pos.y;

          if (x !== _camera.x || y !== _camera.y) {
            _lastCameraX = _camera.x;
            _lastCameraY = _camera.y;

            _camera.goTo({
              x: x,
              y: y
            });
          }

          if (e.preventDefault)
            e.preventDefault();
          else
            e.returnValue = false;

          e.stopPropagation();
          return false;
        }
      }
    }

    /**
     * The handler listening to the 'up' mouse event. It will stop dragging the
     * graph.
     *
     * @param {event} e A mouse event.
     */
    function _upHandler(e) {
      if (_settings('mouseEnabled') && _isMouseDown) {
        _isMouseDown = false;
        if (_movingTimeoutId)
          clearTimeout(_movingTimeoutId);

        _camera.isMoving = false;

        var x = sigma.utils.getX(e),
            y = sigma.utils.getY(e);

        if (_isMoving) {
          sigma.misc.animation.killAll(_camera);
          sigma.misc.animation.camera(
            _camera,
            {
              x: _camera.x +
                _settings('mouseInertiaRatio') * (_camera.x - _lastCameraX),
              y: _camera.y +
                _settings('mouseInertiaRatio') * (_camera.y - _lastCameraY)
            },
            {
              easing: 'quadraticOut',
              duration: _settings('mouseInertiaDuration')
            }
          );
        } else if (
          _startMouseX !== x ||
          _startMouseY !== y
        )
          _camera.goTo({
            x: _camera.x,
            y: _camera.y
          });

        _self.dispatchEvent('mouseup',
          sigma.utils.mouseCoords(e));

        // Update _isMoving flag:
        _isMoving = false;
      }
    }

    /**
     * The handler listening to the 'down' mouse event. It will start observing
     * the mouse position for dragging the graph.
     *
     * @param {event} e A mouse event.
     */
    function _downHandler(e) {
      if (_settings('mouseEnabled')) {
        _startCameraX = _camera.x;
        _startCameraY = _camera.y;

        _lastCameraX = _camera.x;
        _lastCameraY = _camera.y;

        _startMouseX = sigma.utils.getX(e);
        _startMouseY = sigma.utils.getY(e);

        _hasDragged = false;
        _downStartTime = (new Date()).getTime();

        switch (e.which) {
          case 2:
            // Middle mouse button pressed
            // Do nothing.
            break;
          case 3:
            // Right mouse button pressed
            _self.dispatchEvent('rightclick',
              sigma.utils.mouseCoords(e, _startMouseX, _startMouseY));
            break;
          // case 1:
          default:
            // Left mouse button pressed
            _isMouseDown = true;

            _self.dispatchEvent('mousedown',
              sigma.utils.mouseCoords(e, _startMouseX, _startMouseY));
        }
      }
    }

    /**
     * The handler listening to the 'out' mouse event. It will just redispatch
     * the event.
     *
     * @param {event} e A mouse event.
     */
    function _outHandler(e) {
      if (_settings('mouseEnabled'))
        _self.dispatchEvent('mouseout');
    }

    /**
     * The handler listening to the 'click' mouse event. It will redispatch the
     * click event, but with normalized X and Y coordinates.
     *
     * @param {event} e A mouse event.
     */
    function _clickHandler(e) {
      if (_settings('mouseEnabled')) {
        var event = sigma.utils.mouseCoords(e);
        event.isDragging =
          (((new Date()).getTime() - _downStartTime) > 100) && _hasDragged;
        _self.dispatchEvent('click', event);
      }

      if (e.preventDefault)
        e.preventDefault();
      else
        e.returnValue = false;

      e.stopPropagation();
      return false;
    }

    /**
     * The handler listening to the double click custom event. It will
     * basically zoom into the graph.
     *
     * @param {event} e A mouse event.
     */
    function _doubleClickHandler(e) {
      var pos,
          ratio,
          animation;

      if (_settings('mouseEnabled')) {
        ratio = 1 / _settings('doubleClickZoomingRatio');

        _self.dispatchEvent('doubleclick',
            sigma.utils.mouseCoords(e, _startMouseX, _startMouseY));

        if (_settings('doubleClickEnabled')) {
          pos = _camera.cameraPosition(
            sigma.utils.getX(e) - sigma.utils.getCenter(e).x,
            sigma.utils.getY(e) - sigma.utils.getCenter(e).y,
            true
          );

          animation = {
            duration: _settings('doubleClickZoomDuration')
          };

          sigma.utils.zoomTo(_camera, pos.x, pos.y, ratio, animation);
        }

        if (e.preventDefault)
          e.preventDefault();
        else
          e.returnValue = false;

        e.stopPropagation();
        return false;
      }
    }

    /**
     * The handler listening to the 'wheel' mouse event. It will basically zoom
     * in or not into the graph.
     *
     * @param {event} e A mouse event.
     */
    function _wheelHandler(e) {
      var pos,
          ratio,
          animation,
          wheelDelta = sigma.utils.getDelta(e);

      if (_settings('mouseEnabled') && _settings('mouseWheelEnabled') && wheelDelta !== 0) {
        ratio = wheelDelta > 0 ?
          1 / _settings('zoomingRatio') :
          _settings('zoomingRatio');

        pos = _camera.cameraPosition(
          sigma.utils.getX(e) - sigma.utils.getCenter(e).x,
          sigma.utils.getY(e) - sigma.utils.getCenter(e).y,
          true
        );

        animation = {
          duration: _settings('mouseZoomDuration')
        };

        sigma.utils.zoomTo(_camera, pos.x, pos.y, ratio, animation);

        if (e.preventDefault)
          e.preventDefault();
        else
          e.returnValue = false;

        e.stopPropagation();
        return false;
      }
    }
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.captors');

  /**
   * The user inputs default captor. It deals with mouse events, keyboards
   * events and touch events.
   *
   * @param  {DOMElement}   target   The DOM element where the listeners will be
   *                                 bound.
   * @param  {camera}       camera   The camera related to the target.
   * @param  {configurable} settings The settings function.
   * @return {sigma.captor}          The fresh new captor instance.
   */
  sigma.captors.touch = function(target, camera, settings) {
    var _self = this,
        _target = target,
        _camera = camera,
        _settings = settings,

        // CAMERA MANAGEMENT:
        // ******************
        // The camera position when the user starts dragging:
        _startCameraX,
        _startCameraY,
        _startCameraAngle,
        _startCameraRatio,

        // The latest stage position:
        _lastCameraX,
        _lastCameraY,
        _lastCameraAngle,
        _lastCameraRatio,

        // TOUCH MANAGEMENT:
        // *****************
        // Touches that are down:
        _downTouches = [],

        _startTouchX0,
        _startTouchY0,
        _startTouchX1,
        _startTouchY1,
        _startTouchAngle,
        _startTouchDistance,

        _touchMode,

        _isMoving,
        _doubleTap,
        _movingTimeoutId;

    sigma.classes.dispatcher.extend(this);

    sigma.utils.doubleClick(_target, 'touchstart', _doubleTapHandler);
    _target.addEventListener('touchstart', _handleStart, false);
    _target.addEventListener('touchend', _handleLeave, false);
    _target.addEventListener('touchcancel', _handleLeave, false);
    _target.addEventListener('touchleave', _handleLeave, false);
    _target.addEventListener('touchmove', _handleMove, false);

    function position(e) {
      var offset = sigma.utils.getOffset(_target);

      return {
        x: e.pageX - offset.left,
        y: e.pageY - offset.top
      };
    }

    /**
     * This method unbinds every handlers that makes the captor work.
     */
    this.kill = function() {
      sigma.utils.unbindDoubleClick(_target, 'touchstart');
      _target.addEventListener('touchstart', _handleStart);
      _target.addEventListener('touchend', _handleLeave);
      _target.addEventListener('touchcancel', _handleLeave);
      _target.addEventListener('touchleave', _handleLeave);
      _target.addEventListener('touchmove', _handleMove);
    };

    // TOUCH EVENTS:
    // *************
    /**
     * The handler listening to the 'touchstart' event. It will set the touch
     * mode ("_touchMode") and start observing the user touch moves.
     *
     * @param {event} e A touch event.
     */
    function _handleStart(e) {
      if (_settings('touchEnabled')) {
        var x0,
            x1,
            y0,
            y1,
            pos0,
            pos1;

        _downTouches = e.touches;

        switch (_downTouches.length) {
          case 1:
            _camera.isMoving = true;
            _touchMode = 1;

            _startCameraX = _camera.x;
            _startCameraY = _camera.y;

            _lastCameraX = _camera.x;
            _lastCameraY = _camera.y;

            pos0 = position(_downTouches[0]);
            _startTouchX0 = pos0.x;
            _startTouchY0 = pos0.y;

            break;
          case 2:
            _camera.isMoving = true;
            _touchMode = 2;

            pos0 = position(_downTouches[0]);
            pos1 = position(_downTouches[1]);
            x0 = pos0.x;
            y0 = pos0.y;
            x1 = pos1.x;
            y1 = pos1.y;

            _lastCameraX = _camera.x;
            _lastCameraY = _camera.y;

            _startCameraAngle = _camera.angle;
            _startCameraRatio = _camera.ratio;

            _startCameraX = _camera.x;
            _startCameraY = _camera.y;

            _startTouchX0 = x0;
            _startTouchY0 = y0;
            _startTouchX1 = x1;
            _startTouchY1 = y1;

            _startTouchAngle = Math.atan2(
              _startTouchY1 - _startTouchY0,
              _startTouchX1 - _startTouchX0
            );
            _startTouchDistance = Math.sqrt(
              (_startTouchY1 - _startTouchY0) *
                (_startTouchY1 - _startTouchY0) +
              (_startTouchX1 - _startTouchX0) *
                (_startTouchX1 - _startTouchX0)
            );

            e.preventDefault();
            return false;
        }
      }
    }

    /**
     * The handler listening to the 'touchend', 'touchcancel' and 'touchleave'
     * event. It will update the touch mode if there are still at least one
     * finger, and stop dragging else.
     *
     * @param {event} e A touch event.
     */
    function _handleLeave(e) {
      if (_settings('touchEnabled')) {
        _downTouches = e.touches;
        var inertiaRatio = _settings('touchInertiaRatio');

        if (_movingTimeoutId) {
          _isMoving = false;
          clearTimeout(_movingTimeoutId);
        }

        switch (_touchMode) {
          case 2:
            if (e.touches.length === 1) {
              _handleStart(e);

              e.preventDefault();
              break;
            }
            /* falls through */
          case 1:
            _camera.isMoving = false;
            _self.dispatchEvent('stopDrag');

            if (_isMoving) {
              _doubleTap = false;
              sigma.misc.animation.camera(
                _camera,
                {
                  x: _camera.x +
                    inertiaRatio * (_camera.x - _lastCameraX),
                  y: _camera.y +
                    inertiaRatio * (_camera.y - _lastCameraY)
                },
                {
                  easing: 'quadraticOut',
                  duration: _settings('touchInertiaDuration')
                }
              );
            }

            _isMoving = false;
            _touchMode = 0;
            break;
        }
      }
    }

    /**
     * The handler listening to the 'touchmove' event. It will effectively drag
     * the graph, and eventually zooms and turn it if the user is using two
     * fingers.
     *
     * @param {event} e A touch event.
     */
    function _handleMove(e) {
      if (!_doubleTap && _settings('touchEnabled')) {
        var x0,
            x1,
            y0,
            y1,
            cos,
            sin,
            end,
            pos0,
            pos1,
            diff,
            start,
            dAngle,
            dRatio,
            newStageX,
            newStageY,
            newStageRatio,
            newStageAngle;

        _downTouches = e.touches;
        _isMoving = true;

        if (_movingTimeoutId)
          clearTimeout(_movingTimeoutId);

        _movingTimeoutId = setTimeout(function() {
          _isMoving = false;
        }, _settings('dragTimeout'));

        switch (_touchMode) {
          case 1:
            pos0 = position(_downTouches[0]);
            x0 = pos0.x;
            y0 = pos0.y;

            diff = _camera.cameraPosition(
              x0 - _startTouchX0,
              y0 - _startTouchY0,
              true
            );

            newStageX = _startCameraX - diff.x;
            newStageY = _startCameraY - diff.y;

            if (newStageX !== _camera.x || newStageY !== _camera.y) {
              _lastCameraX = _camera.x;
              _lastCameraY = _camera.y;

              _camera.goTo({
                x: newStageX,
                y: newStageY
              });

              _self.dispatchEvent('mousemove',
                sigma.utils.mouseCoords(e, pos0.x, pos0.y));

              _self.dispatchEvent('drag');
            }
            break;
          case 2:
            pos0 = position(_downTouches[0]);
            pos1 = position(_downTouches[1]);
            x0 = pos0.x;
            y0 = pos0.y;
            x1 = pos1.x;
            y1 = pos1.y;

            start = _camera.cameraPosition(
              (_startTouchX0 + _startTouchX1) / 2 -
                sigma.utils.getCenter(e).x,
              (_startTouchY0 + _startTouchY1) / 2 -
                sigma.utils.getCenter(e).y,
              true
            );
            end = _camera.cameraPosition(
              (x0 + x1) / 2 - sigma.utils.getCenter(e).x,
              (y0 + y1) / 2 - sigma.utils.getCenter(e).y,
              true
            );

            dAngle = Math.atan2(y1 - y0, x1 - x0) - _startTouchAngle;
            dRatio = Math.sqrt(
              (y1 - y0) * (y1 - y0) + (x1 - x0) * (x1 - x0)
            ) / _startTouchDistance;

            // Translation:
            x0 = start.x;
            y0 = start.y;

            // Homothetic transformation:
            newStageRatio = _startCameraRatio / dRatio;
            x0 = x0 * dRatio;
            y0 = y0 * dRatio;

            // Rotation:
            newStageAngle = _startCameraAngle - dAngle;
            cos = Math.cos(-dAngle);
            sin = Math.sin(-dAngle);
            x1 = x0 * cos + y0 * sin;
            y1 = y0 * cos - x0 * sin;
            x0 = x1;
            y0 = y1;

            // Finalize:
            newStageX = x0 - end.x + _startCameraX;
            newStageY = y0 - end.y + _startCameraY;

            if (
              newStageRatio !== _camera.ratio ||
              newStageAngle !== _camera.angle ||
              newStageX !== _camera.x ||
              newStageY !== _camera.y
            ) {
              _lastCameraX = _camera.x;
              _lastCameraY = _camera.y;
              _lastCameraAngle = _camera.angle;
              _lastCameraRatio = _camera.ratio;

              _camera.goTo({
                x: newStageX,
                y: newStageY,
                angle: newStageAngle,
                ratio: newStageRatio
              });

              _self.dispatchEvent('drag');
            }

            break;
        }

        e.preventDefault();
        return false;
      }
    }

    /**
     * The handler listening to the double tap custom event. It will
     * basically zoom into the graph.
     *
     * @param {event} e A touch event.
     */
    function _doubleTapHandler(e) {
      var pos,
          ratio,
          animation;

      if (e.touches && e.touches.length === 1 && _settings('touchEnabled')) {
        _doubleTap = true;

        ratio = 1 / _settings('doubleClickZoomingRatio');

        pos = position(e.touches[0]);
        _self.dispatchEvent('doubleclick',
          sigma.utils.mouseCoords(e, pos.x, pos.y));

        if (_settings('doubleClickEnabled')) {
          pos = _camera.cameraPosition(
            pos.x - sigma.utils.getCenter(e).x,
            pos.y - sigma.utils.getCenter(e).y,
            true
          );

          animation = {
            duration: _settings('doubleClickZoomDuration'),
            onComplete: function() {
              _doubleTap = false;
            }
          };

          sigma.utils.zoomTo(_camera, pos.x, pos.y, ratio, animation);
        }

        if (e.preventDefault)
          e.preventDefault();
        else
          e.returnValue = false;

        e.stopPropagation();
        return false;
      }
    }
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  if (typeof conrad === 'undefined')
    throw 'conrad is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.renderers');

  /**
   * This function is the constructor of the canvas sigma's renderer.
   *
   * @param  {sigma.classes.graph}            graph    The graph to render.
   * @param  {sigma.classes.camera}           camera   The camera.
   * @param  {configurable}           settings The sigma instance settings
   *                                           function.
   * @param  {object}                 object   The options object.
   * @return {sigma.renderers.canvas}          The renderer instance.
   */
  sigma.renderers.canvas = function(graph, camera, settings, options) {
    if (typeof options !== 'object')
      throw 'sigma.renderers.canvas: Wrong arguments.';

    if (!(options.container instanceof HTMLElement))
      throw 'Container not found.';

    var k,
        i,
        l,
        a,
        fn,
        self = this;

    sigma.classes.dispatcher.extend(this);

    // Initialize main attributes:
    Object.defineProperty(this, 'conradId', {
      value: sigma.utils.id()
    });
    this.graph = graph;
    this.camera = camera;
    this.contexts = {};
    this.domElements = {};
    this.options = options;
    this.container = this.options.container;
    this.settings = (
        typeof options.settings === 'object' &&
        options.settings
      ) ?
        settings.embedObjects(options.settings) :
        settings;

    // Node indexes:
    this.nodesOnScreen = [];
    this.edgesOnScreen = [];

    // Conrad related attributes:
    this.jobs = {};

    // Find the prefix:
    this.options.prefix = 'renderer' + this.conradId + ':';

    // Initialize the DOM elements:
    if (
      !this.settings('batchEdgesDrawing')
    ) {
      this.initDOM('canvas', 'scene');
      this.contexts.edges = this.contexts.scene;
      this.contexts.nodes = this.contexts.scene;
      this.contexts.labels = this.contexts.scene;
    } else {
      this.initDOM('canvas', 'edges');
      this.initDOM('canvas', 'scene');
      this.contexts.nodes = this.contexts.scene;
      this.contexts.labels = this.contexts.scene;
    }

    this.initDOM('canvas', 'mouse');
    this.contexts.hover = this.contexts.mouse;

    // Initialize captors:
    this.captors = [];
    a = this.options.captors || [sigma.captors.mouse, sigma.captors.touch];
    for (i = 0, l = a.length; i < l; i++) {
      fn = typeof a[i] === 'function' ? a[i] : sigma.captors[a[i]];
      this.captors.push(
        new fn(
          this.domElements.mouse,
          this.camera,
          this.settings
        )
      );
    }

    // Deal with sigma events:
    sigma.misc.bindEvents.call(this, this.options.prefix);
    sigma.misc.drawHovers.call(this, this.options.prefix);

    this.resize(false);
  };




  /**
   * This method renders the graph on the canvases.
   *
   * @param  {?object}                options Eventually an object of options.
   * @return {sigma.renderers.canvas}         Returns the instance itself.
   */
  sigma.renderers.canvas.prototype.render = function(options) {
    options = options || {};

    var a,
        i,
        k,
        l,
        o,
        id,
        end,
        job,
        start,
        edges,
        renderers,
        rendererType,
        batchSize,
        tempGCO,
        index = {},
        graph = this.graph,
        nodes = this.graph.nodes,
        prefix = this.options.prefix || '',
        drawEdges = this.settings(options, 'drawEdges'),
        drawNodes = this.settings(options, 'drawNodes'),
        drawLabels = this.settings(options, 'drawLabels'),
        drawEdgeLabels = this.settings(options, 'drawEdgeLabels'),
        embedSettings = this.settings.embedObjects(options, {
          prefix: this.options.prefix
        });

    // Call the resize function:
    this.resize(false);

    // Check the 'hideEdgesOnMove' setting:
    if (this.settings(options, 'hideEdgesOnMove'))
      if (this.camera.isAnimated || this.camera.isMoving)
        drawEdges = false;

    // Apply the camera's view:
    this.camera.applyView(
      undefined,
      this.options.prefix,
      {
        width: this.width,
        height: this.height
      }
    );

    // Clear canvases:
    this.clear();

    // Kill running jobs:
    for (k in this.jobs)
      if (conrad.hasJob(k))
        conrad.killJob(k);

    // Find which nodes are on screen:
    this.edgesOnScreen = [];
    this.nodesOnScreen = this.camera.quadtree.area(
      this.camera.getRectangle(this.width, this.height)
    );

    for (a = this.nodesOnScreen, i = 0, l = a.length; i < l; i++)
      index[a[i].id] = a[i];

    // Draw edges:
    // - If settings('batchEdgesDrawing') is true, the edges are displayed per
    //   batches. If not, they are drawn in one frame.
    if (drawEdges) {
      // First, let's identify which edges to draw. To do this, we just keep
      // every edges that have at least one extremity displayed according to
      // the quadtree and the "hidden" attribute. We also do not keep hidden
      // edges.
      for (a = graph.edges(), i = 0, l = a.length; i < l; i++) {
        o = a[i];
        if (
          (index[o.source] || index[o.target]) &&
          (!o.hidden && !nodes(o.source).hidden && !nodes(o.target).hidden)
        )
          this.edgesOnScreen.push(o);
      }

      // If the "batchEdgesDrawing" settings is true, edges are batched:
      if (this.settings(options, 'batchEdgesDrawing')) {
        id = 'edges_' + this.conradId;
        batchSize = embedSettings('canvasEdgesBatchSize');

        edges = this.edgesOnScreen;
        l = edges.length;

        start = 0;
        end = Math.min(edges.length, start + batchSize);

        job = function() {
          tempGCO = this.contexts.edges.globalCompositeOperation;
          this.contexts.edges.globalCompositeOperation = 'destination-over';

          renderers = sigma.canvas.edges;
          for (i = start; i < end; i++) {
            o = edges[i];
            (renderers[
              o.type || this.settings(options, 'defaultEdgeType')
            ] || renderers.def)(
              o,
              graph.nodes(o.source),
              graph.nodes(o.target),
              this.contexts.edges,
              embedSettings
            );
          }

          // Draw edge labels:
          if (drawEdgeLabels) {
            renderers = sigma.canvas.edges.labels;
            for (i = start; i < end; i++) {
              o = edges[i];
              if (!o.hidden)
                (renderers[
                  o.type || this.settings(options, 'defaultEdgeType')
                ] || renderers.def)(
                  o,
                  graph.nodes(o.source),
                  graph.nodes(o.target),
                  this.contexts.labels,
                  embedSettings
                );
            }
          }

          // Restore original globalCompositeOperation:
          this.contexts.edges.globalCompositeOperation = tempGCO;

          // Catch job's end:
          if (end === edges.length) {
            delete this.jobs[id];
            return false;
          }

          start = end + 1;
          end = Math.min(edges.length, start + batchSize);
          return true;
        };

        this.jobs[id] = job;
        conrad.addJob(id, job.bind(this));

      // If not, they are drawn in one frame:
      } else {
        renderers = sigma.canvas.edges;
        for (a = this.edgesOnScreen, i = 0, l = a.length; i < l; i++) {
          o = a[i];
          (renderers[
            o.type || this.settings(options, 'defaultEdgeType')
          ] || renderers.def)(
            o,
            graph.nodes(o.source),
            graph.nodes(o.target),
            this.contexts.edges,
            embedSettings
          );
        }

        // Draw edge labels:
        // - No batching
        if (drawEdgeLabels) {
          renderers = sigma.canvas.edges.labels;
          for (a = this.edgesOnScreen, i = 0, l = a.length; i < l; i++)
            if (!a[i].hidden)
              (renderers[
                a[i].type || this.settings(options, 'defaultEdgeType')
              ] || renderers.def)(
                a[i],
                graph.nodes(a[i].source),
                graph.nodes(a[i].target),
                this.contexts.labels,
                embedSettings
              );
        }
      }
    }

    // Draw nodes:
    // - No batching
    if (drawNodes) {
      renderers = sigma.canvas.nodes;
      for (a = this.nodesOnScreen, i = 0, l = a.length; i < l; i++)
        if (!a[i].hidden)
          (renderers[
            a[i].type || this.settings(options, 'defaultNodeType')
          ] || renderers.def)(
            a[i],
            this.contexts.nodes,
            embedSettings
          );
    }

    // Draw labels:
    // - No batching
    if (drawLabels) {
      renderers = sigma.canvas.labels;
      for (a = this.nodesOnScreen, i = 0, l = a.length; i < l; i++)
        if (!a[i].hidden)
          (renderers[
            a[i].type || this.settings(options, 'defaultNodeType')
          ] || renderers.def)(
            a[i],
            this.contexts.labels,
            embedSettings
          );
    }

    this.dispatchEvent('render');

    return this;
  };

  /**
   * This method creates a DOM element of the specified type, switches its
   * position to "absolute", references it to the domElements attribute, and
   * finally appends it to the container.
   *
   * @param  {string} tag The label tag.
   * @param  {string} id  The id of the element (to store it in "domElements").
   */
  sigma.renderers.canvas.prototype.initDOM = function(tag, id) {
    var dom = document.createElement(tag);

    dom.style.position = 'absolute';
    dom.setAttribute('class', 'sigma-' + id);

    this.domElements[id] = dom;
    this.container.appendChild(dom);

    if (tag.toLowerCase() === 'canvas')
      this.contexts[id] = dom.getContext('2d');
  };

  /**
   * This method resizes each DOM elements in the container and stores the new
   * dimensions. Then, it renders the graph.
   *
   * @param  {?number}                width  The new width of the container.
   * @param  {?number}                height The new height of the container.
   * @return {sigma.renderers.canvas}        Returns the instance itself.
   */
  sigma.renderers.canvas.prototype.resize = function(w, h) {
    var k,
        oldWidth = this.width,
        oldHeight = this.height,
        pixelRatio = sigma.utils.getPixelRatio();

    if (w !== undefined && h !== undefined) {
      this.width = w;
      this.height = h;
    } else {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;

      w = this.width;
      h = this.height;
    }

    if (oldWidth !== this.width || oldHeight !== this.height) {
      for (k in this.domElements) {
        this.domElements[k].style.width = w + 'px';
        this.domElements[k].style.height = h + 'px';

        if (this.domElements[k].tagName.toLowerCase() === 'canvas') {
          this.domElements[k].setAttribute('width', (w * pixelRatio) + 'px');
          this.domElements[k].setAttribute('height', (h * pixelRatio) + 'px');

          if (pixelRatio !== 1)
            this.contexts[k].scale(pixelRatio, pixelRatio);
        }
      }
    }

    return this;
  };

  /**
   * This method clears each canvas.
   *
   * @return {sigma.renderers.canvas} Returns the instance itself.
   */
  sigma.renderers.canvas.prototype.clear = function() {
    for (var k in this.contexts) {
      this.contexts[k].clearRect(0, 0, this.width, this.height);
    }

    return this;
  };

  /**
   * This method kills contexts and other attributes.
   */
  sigma.renderers.canvas.prototype.kill = function() {
    var k,
        captor;

    // Kill captors:
    while ((captor = this.captors.pop()))
      captor.kill();
    delete this.captors;

    // Kill contexts:
    for (k in this.domElements) {
      this.domElements[k].parentNode.removeChild(this.domElements[k]);
      delete this.domElements[k];
      delete this.contexts[k];
    }
    delete this.domElements;
    delete this.contexts;
  };




  /**
   * The labels, nodes and edges renderers are stored in the three following
   * objects. When an element is drawn, its type will be checked and if a
   * renderer with the same name exists, it will be used. If not found, the
   * default renderer will be used instead.
   *
   * They are stored in different files, in the "./canvas" folder.
   */
  sigma.utils.pkg('sigma.canvas.nodes');
  sigma.utils.pkg('sigma.canvas.edges');
  sigma.utils.pkg('sigma.canvas.labels');
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.renderers');

  /**
   * This function is the constructor of the canvas sigma's renderer.
   *
   * @param  {sigma.classes.graph}            graph    The graph to render.
   * @param  {sigma.classes.camera}           camera   The camera.
   * @param  {configurable}           settings The sigma instance settings
   *                                           function.
   * @param  {object}                 object   The options object.
   * @return {sigma.renderers.canvas}          The renderer instance.
   */
  sigma.renderers.webgl = function(graph, camera, settings, options) {
    if (typeof options !== 'object')
      throw 'sigma.renderers.webgl: Wrong arguments.';

    if (!(options.container instanceof HTMLElement))
      throw 'Container not found.';

    var k,
        i,
        l,
        a,
        fn,
        _self = this;

    sigma.classes.dispatcher.extend(this);

    // Conrad related attributes:
    this.jobs = {};

    Object.defineProperty(this, 'conradId', {
      value: sigma.utils.id()
    });

    // Initialize main attributes:
    this.graph = graph;
    this.camera = camera;
    this.contexts = {};
    this.domElements = {};
    this.options = options;
    this.container = this.options.container;
    this.settings = (
        typeof options.settings === 'object' &&
        options.settings
      ) ?
        settings.embedObjects(options.settings) :
        settings;

    // Find the prefix:
    this.options.prefix = this.camera.readPrefix;

    // Initialize programs hash
    Object.defineProperty(this, 'nodePrograms', {
      value: {}
    });
    Object.defineProperty(this, 'edgePrograms', {
      value: {}
    });
    Object.defineProperty(this, 'nodeFloatArrays', {
      value: {}
    });
    Object.defineProperty(this, 'edgeFloatArrays', {
      value: {}
    });
    Object.defineProperty(this, 'edgeIndicesArrays', {
      value: {}
    });

    // Initialize the DOM elements:
    if (this.settings(options, 'batchEdgesDrawing')) {
      this.initDOM('canvas', 'edges', true);
      this.initDOM('canvas', 'nodes', true);
    } else {
      this.initDOM('canvas', 'scene', true);
      this.contexts.nodes = this.contexts.scene;
      this.contexts.edges = this.contexts.scene;
    }

    this.initDOM('canvas', 'labels');
    this.initDOM('canvas', 'mouse');
    this.contexts.hover = this.contexts.mouse;

    // Initialize captors:
    this.captors = [];
    a = this.options.captors || [sigma.captors.mouse, sigma.captors.touch];
    for (i = 0, l = a.length; i < l; i++) {
      fn = typeof a[i] === 'function' ? a[i] : sigma.captors[a[i]];
      this.captors.push(
        new fn(
          this.domElements.mouse,
          this.camera,
          this.settings
        )
      );
    }

    // Deal with sigma events:
    sigma.misc.bindEvents.call(this, this.camera.prefix);
    sigma.misc.drawHovers.call(this, this.camera.prefix);

    this.resize();
  };




  /**
   * This method will generate the nodes and edges float arrays. This step is
   * separated from the "render" method, because to keep WebGL efficient, since
   * all the camera and middlewares are modelised as matrices and they do not
   * require the float arrays to be regenerated.
   *
   * Basically, when the user moves the camera or applies some specific linear
   * transformations, this process step will be skipped, and the "render"
   * method will efficiently refresh the rendering.
   *
   * And when the user modifies the graph colors or positions (applying a new
   * layout or filtering the colors, for instance), this "process" step will be
   * required to regenerate the float arrays.
   *
   * @return {sigma.renderers.webgl} Returns the instance itself.
   */
  sigma.renderers.webgl.prototype.process = function() {
    var a,
        i,
        l,
        k,
        type,
        renderer,
        graph = this.graph,
        options = sigma.utils.extend(options, this.options),
        defaultEdgeType = this.settings(options, 'defaultEdgeType'),
        defaultNodeType = this.settings(options, 'defaultNodeType');

    // Empty float arrays:
    for (k in this.nodeFloatArrays)
      delete this.nodeFloatArrays[k];

    for (k in this.edgeFloatArrays)
      delete this.edgeFloatArrays[k];

    for (k in this.edgeIndicesArrays)
      delete this.edgeIndicesArrays[k];

    // Sort edges and nodes per types:
    for (a = graph.edges(), i = 0, l = a.length; i < l; i++) {
      type = a[i].type || defaultEdgeType;
      k = (type && sigma.webgl.edges[type]) ? type : 'def';

      if (!this.edgeFloatArrays[k])
        this.edgeFloatArrays[k] = {
          edges: []
        };

      this.edgeFloatArrays[k].edges.push(a[i]);
    }

    for (a = graph.nodes(), i = 0, l = a.length; i < l; i++) {
      type = a[i].type || defaultNodeType;
      k = (type && sigma.webgl.nodes[type]) ? type : 'def';

      if (!this.nodeFloatArrays[k])
        this.nodeFloatArrays[k] = {
          nodes: []
        };

      this.nodeFloatArrays[k].nodes.push(a[i]);
    }

    // Push edges:
    for (k in this.edgeFloatArrays) {
      renderer = sigma.webgl.edges[k];
      a = this.edgeFloatArrays[k].edges;

      // Creating the necessary arrays
      this.edgeFloatArrays[k].array = new Float32Array(
        a.length * renderer.POINTS * renderer.ATTRIBUTES
      );

      for (i = 0, l = a.length; i < l; i++) {

        // Just check that the edge and both its extremities are visible:
        if (
          !a[i].hidden &&
          !graph.nodes(a[i].source).hidden &&
          !graph.nodes(a[i].target).hidden
        )
          renderer.addEdge(
            a[i],
            graph.nodes(a[i].source),
            graph.nodes(a[i].target),
            this.edgeFloatArrays[k].array,
            i * renderer.POINTS * renderer.ATTRIBUTES,
            options.prefix,
            this.settings
          );
      }

      if (typeof renderer.computeIndices === 'function')
        this.edgeIndicesArrays[k] = renderer.computeIndices(
          this.edgeFloatArrays[k].array
        );
    }

    // Push nodes:
    for (k in this.nodeFloatArrays) {
      renderer = sigma.webgl.nodes[k];
      a = this.nodeFloatArrays[k].nodes;

      // Creating the necessary arrays
      this.nodeFloatArrays[k].array = new Float32Array(
        a.length * renderer.POINTS * renderer.ATTRIBUTES
      );

      for (i = 0, l = a.length; i < l; i++) {
        if (!this.nodeFloatArrays[k].array)
          this.nodeFloatArrays[k].array = new Float32Array(
            a.length * renderer.POINTS * renderer.ATTRIBUTES
          );

        // Just check that the edge and both its extremities are visible:
        if (
          !a[i].hidden
        )
          renderer.addNode(
            a[i],
            this.nodeFloatArrays[k].array,
            i * renderer.POINTS * renderer.ATTRIBUTES,
            options.prefix,
            this.settings
          );
      }
    }

    return this;
  };




  /**
   * This method renders the graph. It basically calls each program (and
   * generate them if they do not exist yet) to render nodes and edges, batched
   * per renderer.
   *
   * As in the canvas renderer, it is possible to display edges, nodes and / or
   * labels in batches, to make the whole thing way more scalable.
   *
   * @param  {?object}               params Eventually an object of options.
   * @return {sigma.renderers.webgl}        Returns the instance itself.
   */
  sigma.renderers.webgl.prototype.render = function(params) {
    var a,
        i,
        l,
        k,
        o,
        program,
        renderer,
        self = this,
        graph = this.graph,
        nodesGl = this.contexts.nodes,
        edgesGl = this.contexts.edges,
        matrix = this.camera.getMatrix(),
        options = sigma.utils.extend(params, this.options),
        drawLabels = this.settings(options, 'drawLabels'),
        drawEdges = this.settings(options, 'drawEdges'),
        drawNodes = this.settings(options, 'drawNodes');

    // Call the resize function:
    this.resize(false);

    // Check the 'hideEdgesOnMove' setting:
    if (this.settings(options, 'hideEdgesOnMove'))
      if (this.camera.isAnimated || this.camera.isMoving)
        drawEdges = false;

    // Clear canvases:
    this.clear();

    // Translate matrix to [width/2, height/2]:
    matrix = sigma.utils.matrices.multiply(
      matrix,
      sigma.utils.matrices.translation(this.width / 2, this.height / 2)
    );

    // Kill running jobs:
    for (k in this.jobs)
      if (conrad.hasJob(k))
        conrad.killJob(k);

    if (drawEdges) {
      if (this.settings(options, 'batchEdgesDrawing'))
        (function() {
          var a,
              k,
              i,
              id,
              job,
              arr,
              end,
              start,
              indices,
              renderer,
              batchSize,
              currentProgram;

          id = 'edges_' + this.conradId;
          batchSize = this.settings(options, 'webglEdgesBatchSize');
          a = Object.keys(this.edgeFloatArrays);

          if (!a.length)
            return;
          i = 0;
          renderer = sigma.webgl.edges[a[i]];
          arr = this.edgeFloatArrays[a[i]].array;
          indices = this.edgeIndicesArrays[a[i]];
          start = 0;
          end = Math.min(
            start + batchSize * renderer.POINTS,
            arr.length / renderer.ATTRIBUTES
          );

          job = function() {
            // Check program:
            if (!this.edgePrograms[a[i]])
              this.edgePrograms[a[i]] = renderer.initProgram(edgesGl);

            if (start < end) {
              edgesGl.useProgram(this.edgePrograms[a[i]]);
              renderer.render(
                edgesGl,
                this.edgePrograms[a[i]],
                arr,
                {
                  settings: this.settings,
                  matrix: matrix,
                  width: this.width,
                  height: this.height,
                  ratio: this.camera.ratio,
                  scalingRatio: this.settings(
                    options,
                    'webglOversamplingRatio'
                  ),
                  start: start,
                  count: end - start,
                  indicesData: indices
                }
              );
            }

            // Catch job's end:
            if (
              end >= arr.length / renderer.ATTRIBUTES &&
              i === a.length - 1
            ) {
              delete this.jobs[id];
              return false;
            }

            if (end >= arr.length / renderer.ATTRIBUTES) {
              i++;
              arr = this.edgeFloatArrays[a[i]].array;
              renderer = sigma.webgl.edges[a[i]];
              start = 0;
              end = Math.min(
                start + batchSize * renderer.POINTS,
                arr.length / renderer.ATTRIBUTES
              );
            } else {
              start = end;
              end = Math.min(
                start + batchSize * renderer.POINTS,
                arr.length / renderer.ATTRIBUTES
              );
            }

            return true;
          };

          this.jobs[id] = job;
          conrad.addJob(id, job.bind(this));
        }).call(this);
      else {
        for (k in this.edgeFloatArrays) {
          renderer = sigma.webgl.edges[k];

          // Check program:
          if (!this.edgePrograms[k])
            this.edgePrograms[k] = renderer.initProgram(edgesGl);

          // Render
          if (this.edgeFloatArrays[k]) {
            edgesGl.useProgram(this.edgePrograms[k]);
            renderer.render(
              edgesGl,
              this.edgePrograms[k],
              this.edgeFloatArrays[k].array,
              {
                settings: this.settings,
                matrix: matrix,
                width: this.width,
                height: this.height,
                ratio: this.camera.ratio,
                scalingRatio: this.settings(options, 'webglOversamplingRatio'),
                indicesData: this.edgeIndicesArrays[k]
              }
            );
          }
        }
      }
    }

    if (drawNodes) {
      // Enable blending:
      nodesGl.blendFunc(nodesGl.SRC_ALPHA, nodesGl.ONE_MINUS_SRC_ALPHA);
      nodesGl.enable(nodesGl.BLEND);

      for (k in this.nodeFloatArrays) {
        renderer = sigma.webgl.nodes[k];

        // Check program:
        if (!this.nodePrograms[k])
          this.nodePrograms[k] = renderer.initProgram(nodesGl);

        // Render
        if (this.nodeFloatArrays[k]) {
          nodesGl.useProgram(this.nodePrograms[k]);
          renderer.render(
            nodesGl,
            this.nodePrograms[k],
            this.nodeFloatArrays[k].array,
            {
              settings: this.settings,
              matrix: matrix,
              width: this.width,
              height: this.height,
              ratio: this.camera.ratio,
              scalingRatio: this.settings(options, 'webglOversamplingRatio')
            }
          );
        }
      }
    }

    if (drawLabels) {
      a = this.camera.quadtree.area(
        this.camera.getRectangle(this.width, this.height)
      );

      // Apply camera view to these nodes:
      this.camera.applyView(
        undefined,
        undefined,
        {
          nodes: a,
          edges: [],
          width: this.width,
          height: this.height
        }
      );

      o = function(key) {
        return self.settings({
          prefix: self.camera.prefix
        }, key);
      };

      for (i = 0, l = a.length; i < l; i++)
        if (!a[i].hidden)
          (
            sigma.canvas.labels[
              a[i].type ||
              this.settings(options, 'defaultNodeType')
            ] || sigma.canvas.labels.def
          )(a[i], this.contexts.labels, o);
    }

    this.dispatchEvent('render');

    return this;
  };




  /**
   * This method creates a DOM element of the specified type, switches its
   * position to "absolute", references it to the domElements attribute, and
   * finally appends it to the container.
   *
   * @param  {string}   tag   The label tag.
   * @param  {string}   id    The id of the element (to store it in
   *                          "domElements").
   * @param  {?boolean} webgl Will init the WebGL context if true.
   */
  sigma.renderers.webgl.prototype.initDOM = function(tag, id, webgl) {
    var gl,
        dom = document.createElement(tag),
        self = this;

    dom.style.position = 'absolute';
    dom.setAttribute('class', 'sigma-' + id);

    this.domElements[id] = dom;
    this.container.appendChild(dom);

    if (tag.toLowerCase() === 'canvas') {
      this.contexts[id] = dom.getContext(webgl ? 'experimental-webgl' : '2d', {
        preserveDrawingBuffer: true
      });

      // Adding webgl context loss listeners
      if (webgl) {
        dom.addEventListener('webglcontextlost', function(e) {
          e.preventDefault();
        }, false);

        dom.addEventListener('webglcontextrestored', function(e) {
          self.render();
        }, false);
      }
    }
  };

  /**
   * This method resizes each DOM elements in the container and stores the new
   * dimensions. Then, it renders the graph.
   *
   * @param  {?number}               width  The new width of the container.
   * @param  {?number}               height The new height of the container.
   * @return {sigma.renderers.webgl}        Returns the instance itself.
   */
  sigma.renderers.webgl.prototype.resize = function(w, h) {
    var k,
        oldWidth = this.width,
        oldHeight = this.height,
        pixelRatio = sigma.utils.getPixelRatio();

    if (w !== undefined && h !== undefined) {
      this.width = w;
      this.height = h;
    } else {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;

      w = this.width;
      h = this.height;
    }

    if (oldWidth !== this.width || oldHeight !== this.height) {
      for (k in this.domElements) {
        this.domElements[k].style.width = w + 'px';
        this.domElements[k].style.height = h + 'px';

        if (this.domElements[k].tagName.toLowerCase() === 'canvas') {
          // If simple 2D canvas:
          if (this.contexts[k] && this.contexts[k].scale) {
            this.domElements[k].setAttribute('width', (w * pixelRatio) + 'px');
            this.domElements[k].setAttribute('height', (h * pixelRatio) + 'px');

            if (pixelRatio !== 1)
              this.contexts[k].scale(pixelRatio, pixelRatio);
          } else {
            this.domElements[k].setAttribute(
              'width',
              (w * this.settings('webglOversamplingRatio')) + 'px'
            );
            this.domElements[k].setAttribute(
              'height',
              (h * this.settings('webglOversamplingRatio')) + 'px'
            );
          }
        }
      }
    }

    // Scale:
    for (k in this.contexts)
      if (this.contexts[k] && this.contexts[k].viewport)
        this.contexts[k].viewport(
          0,
          0,
          this.width * this.settings('webglOversamplingRatio'),
          this.height * this.settings('webglOversamplingRatio')
        );

    return this;
  };

  /**
   * This method clears each canvas.
   *
   * @return {sigma.renderers.webgl} Returns the instance itself.
   */
  sigma.renderers.webgl.prototype.clear = function() {
    this.contexts.labels.clearRect(0, 0, this.width, this.height);
    this.contexts.nodes.clear(this.contexts.nodes.COLOR_BUFFER_BIT);
    this.contexts.edges.clear(this.contexts.edges.COLOR_BUFFER_BIT);

    return this;
  };

  /**
   * This method kills contexts and other attributes.
   */
  sigma.renderers.webgl.prototype.kill = function() {
    var k,
        captor;

    // Kill captors:
    while ((captor = this.captors.pop()))
      captor.kill();
    delete this.captors;

    // Kill contexts:
    for (k in this.domElements) {
      this.domElements[k].parentNode.removeChild(this.domElements[k]);
      delete this.domElements[k];
      delete this.contexts[k];
    }
    delete this.domElements;
    delete this.contexts;
  };




  /**
   * The object "sigma.webgl.nodes" contains the different WebGL node
   * renderers. The default one draw nodes as discs. Here are the attributes
   * any node renderer must have:
   *
   * {number}   POINTS      The number of points required to draw a node.
   * {number}   ATTRIBUTES  The number of attributes needed to draw one point.
   * {function} addNode     A function that adds a node to the data stack that
   *                        will be given to the buffer. Here is the arguments:
   *                        > {object}       node
   *                        > {number}       index   The node index in the
   *                                                 nodes array.
   *                        > {Float32Array} data    The stack.
   *                        > {object}       options Some options.
   * {function} render      The function that will effectively render the nodes
   *                        into the buffer.
   *                        > {WebGLRenderingContext} gl
   *                        > {WebGLProgram}          program
   *                        > {Float32Array} data    The stack to give to the
   *                                                 buffer.
   *                        > {object}       params  An object containing some
   *                                                 options, like width,
   *                                                 height, the camera ratio.
   * {function} initProgram The function that will initiate the program, with
   *                        the relevant shaders and parameters. It must return
   *                        the newly created program.
   *
   * Check sigma.webgl.nodes.def or sigma.webgl.nodes.fast to see how it
   * works more precisely.
   */
  sigma.utils.pkg('sigma.webgl.nodes');




  /**
   * The object "sigma.webgl.edges" contains the different WebGL edge
   * renderers. The default one draw edges as direct lines. Here are the
   * attributes any edge renderer must have:
   *
   * {number}   POINTS      The number of points required to draw an edge.
   * {number}   ATTRIBUTES  The number of attributes needed to draw one point.
   * {function} addEdge     A function that adds an edge to the data stack that
   *                        will be given to the buffer. Here is the arguments:
   *                        > {object}       edge
   *                        > {object}       source
   *                        > {object}       target
   *                        > {Float32Array} data    The stack.
   *                        > {object}       options Some options.
   * {function} render      The function that will effectively render the edges
   *                        into the buffer.
   *                        > {WebGLRenderingContext} gl
   *                        > {WebGLProgram}          program
   *                        > {Float32Array} data    The stack to give to the
   *                                                 buffer.
   *                        > {object}       params  An object containing some
   *                                                 options, like width,
   *                                                 height, the camera ratio.
   * {function} initProgram The function that will initiate the program, with
   *                        the relevant shaders and parameters. It must return
   *                        the newly created program.
   *
   * Check sigma.webgl.edges.def or sigma.webgl.edges.fast to see how it
   * works more precisely.
   */
  sigma.utils.pkg('sigma.webgl.edges');




  /**
   * The object "sigma.canvas.labels" contains the different
   * label renderers for the WebGL renderer. Since displaying texts in WebGL is
   * definitely painful and since there a way less labels to display than nodes
   * or edges, the default renderer simply renders them in a canvas.
   *
   * A labels renderer is a simple function, taking as arguments the related
   * node, the renderer and a settings function.
   */
  sigma.utils.pkg('sigma.canvas.labels');
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  if (typeof conrad === 'undefined')
    throw 'conrad is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.renderers');

  /**
   * This function is the constructor of the svg sigma's renderer.
   *
   * @param  {sigma.classes.graph}            graph    The graph to render.
   * @param  {sigma.classes.camera}           camera   The camera.
   * @param  {configurable}           settings The sigma instance settings
   *                                           function.
   * @param  {object}                 object   The options object.
   * @return {sigma.renderers.svg}             The renderer instance.
   */
  sigma.renderers.svg = function(graph, camera, settings, options) {
    if (typeof options !== 'object')
      throw 'sigma.renderers.svg: Wrong arguments.';

    if (!(options.container instanceof HTMLElement))
      throw 'Container not found.';

    var i,
        l,
        a,
        fn,
        self = this;

    sigma.classes.dispatcher.extend(this);

    // Initialize main attributes:
    this.graph = graph;
    this.camera = camera;
    this.domElements = {
      graph: null,
      groups: {},
      nodes: {},
      edges: {},
      labels: {},
      hovers: {}
    };
    this.measurementCanvas = null;
    this.options = options;
    this.container = this.options.container;
    this.settings = (
        typeof options.settings === 'object' &&
        options.settings
      ) ?
        settings.embedObjects(options.settings) :
        settings;

    // Is the renderer meant to be freestyle?
    this.settings('freeStyle', !!this.options.freeStyle);

    // SVG xmlns
    this.settings('xmlns', 'http://www.w3.org/2000/svg');

    // Indexes:
    this.nodesOnScreen = [];
    this.edgesOnScreen = [];

    // Find the prefix:
    this.options.prefix = 'renderer' + sigma.utils.id() + ':';

    // Initialize the DOM elements
    this.initDOM('svg');

    // Initialize captors:
    this.captors = [];
    a = this.options.captors || [sigma.captors.mouse, sigma.captors.touch];
    for (i = 0, l = a.length; i < l; i++) {
      fn = typeof a[i] === 'function' ? a[i] : sigma.captors[a[i]];
      this.captors.push(
        new fn(
          this.domElements.graph,
          this.camera,
          this.settings
        )
      );
    }

    // Bind resize:
    window.addEventListener('resize', function() {
      self.resize();
    });

    // Deal with sigma events:
    // TODO: keep an option to override the DOM events?
    sigma.misc.bindDOMEvents.call(this, this.domElements.graph);
    this.bindHovers(this.options.prefix);

    // Resize
    this.resize(false);
  };

  /**
   * This method renders the graph on the svg scene.
   *
   * @param  {?object}                options Eventually an object of options.
   * @return {sigma.renderers.svg}            Returns the instance itself.
   */
  sigma.renderers.svg.prototype.render = function(options) {
    options = options || {};

    var a,
        i,
        k,
        e,
        l,
        o,
        source,
        target,
        start,
        edges,
        renderers,
        subrenderers,
        index = {},
        graph = this.graph,
        nodes = this.graph.nodes,
        prefix = this.options.prefix || '',
        drawEdges = this.settings(options, 'drawEdges'),
        drawNodes = this.settings(options, 'drawNodes'),
        drawLabels = this.settings(options, 'drawLabels'),
        embedSettings = this.settings.embedObjects(options, {
          prefix: this.options.prefix,
          forceLabels: this.options.forceLabels
        });

    // Check the 'hideEdgesOnMove' setting:
    if (this.settings(options, 'hideEdgesOnMove'))
      if (this.camera.isAnimated || this.camera.isMoving)
        drawEdges = false;

    // Apply the camera's view:
    this.camera.applyView(
      undefined,
      this.options.prefix,
      {
        width: this.width,
        height: this.height
      }
    );

    // Hiding everything
    // TODO: find a more sensible way to perform this operation
    this.hideDOMElements(this.domElements.nodes);
    this.hideDOMElements(this.domElements.edges);
    this.hideDOMElements(this.domElements.labels);

    // Find which nodes are on screen
    this.edgesOnScreen = [];
    this.nodesOnScreen = this.camera.quadtree.area(
      this.camera.getRectangle(this.width, this.height)
    );

    // Node index
    for (a = this.nodesOnScreen, i = 0, l = a.length; i < l; i++)
      index[a[i].id] = a[i];

    // Find which edges are on screen
    for (a = graph.edges(), i = 0, l = a.length; i < l; i++) {
      o = a[i];
      if (
        (index[o.source] || index[o.target]) &&
        (!o.hidden && !nodes(o.source).hidden && !nodes(o.target).hidden)
      )
        this.edgesOnScreen.push(o);
    }

    // Display nodes
    //---------------
    renderers = sigma.svg.nodes;
    subrenderers = sigma.svg.labels;

    //-- First we create the nodes which are not already created
    if (drawNodes)
      for (a = this.nodesOnScreen, i = 0, l = a.length; i < l; i++) {
        if (!a[i].hidden && !this.domElements.nodes[a[i].id]) {

          // Node
          e = (renderers[a[i].type] || renderers.def).create(
            a[i],
            embedSettings
          );

          this.domElements.nodes[a[i].id] = e;
          this.domElements.groups.nodes.appendChild(e);

          // Label
          e = (subrenderers[a[i].type] || subrenderers.def).create(
            a[i],
            embedSettings
          );

          this.domElements.labels[a[i].id] = e;
          this.domElements.groups.labels.appendChild(e);
        }
      }

    //-- Second we update the nodes
    if (drawNodes)
      for (a = this.nodesOnScreen, i = 0, l = a.length; i < l; i++) {

        if (a[i].hidden)
          continue;

        // Node
        (renderers[a[i].type] || renderers.def).update(
          a[i],
          this.domElements.nodes[a[i].id],
          embedSettings
        );

        // Label
        (subrenderers[a[i].type] || subrenderers.def).update(
          a[i],
          this.domElements.labels[a[i].id],
          embedSettings
        );
      }

    // Display edges
    //---------------
    renderers = sigma.svg.edges;

    //-- First we create the edges which are not already created
    if (drawEdges)
      for (a = this.edgesOnScreen, i = 0, l = a.length; i < l; i++) {
        if (!this.domElements.edges[a[i].id]) {
          source = nodes(a[i].source);
          target = nodes(a[i].target);

          e = (renderers[a[i].type] || renderers.def).create(
            a[i],
            source,
            target,
            embedSettings
          );

          this.domElements.edges[a[i].id] = e;
          this.domElements.groups.edges.appendChild(e);
        }
       }

    //-- Second we update the edges
    if (drawEdges)
      for (a = this.edgesOnScreen, i = 0, l = a.length; i < l; i++) {
        source = nodes(a[i].source);
        target = nodes(a[i].target);

        (renderers[a[i].type] || renderers.def).update(
          a[i],
          this.domElements.edges[a[i].id],
          source,
          target,
          embedSettings
        );
       }

    this.dispatchEvent('render');

    return this;
  };

  /**
   * This method creates a DOM element of the specified type, switches its
   * position to "absolute", references it to the domElements attribute, and
   * finally appends it to the container.
   *
   * @param  {string} tag The label tag.
   * @param  {string} id  The id of the element (to store it in "domElements").
   */
  sigma.renderers.svg.prototype.initDOM = function(tag) {
    var dom = document.createElementNS(this.settings('xmlns'), tag),
        c = this.settings('classPrefix'),
        g,
        l,
        i;

    dom.style.position = 'absolute';
    dom.setAttribute('class', c + '-svg');

    // Setting SVG namespace
    dom.setAttribute('xmlns', this.settings('xmlns'));
    dom.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    dom.setAttribute('version', '1.1');

    // Creating the measurement canvas
    var canvas = document.createElement('canvas');
    canvas.setAttribute('class', c + '-measurement-canvas');

    // Appending elements
    this.domElements.graph = this.container.appendChild(dom);

    // Creating groups
    var groups = ['edges', 'nodes', 'labels', 'hovers'];
    for (i = 0, l = groups.length; i < l; i++) {
      g = document.createElementNS(this.settings('xmlns'), 'g');

      g.setAttributeNS(null, 'id', c + '-group-' + groups[i]);
      g.setAttributeNS(null, 'class', c + '-group');

      this.domElements.groups[groups[i]] =
        this.domElements.graph.appendChild(g);
    }

    // Appending measurement canvas
    this.container.appendChild(canvas);
    this.measurementCanvas = canvas.getContext('2d');
  };

  /**
   * This method hides a batch of SVG DOM elements.
   *
   * @param  {array}                  elements  An array of elements to hide.
   * @param  {object}                 renderer  The renderer to use.
   * @return {sigma.renderers.svg}              Returns the instance itself.
   */
  sigma.renderers.svg.prototype.hideDOMElements = function(elements) {
    var o,
        i;

    for (i in elements) {
      o = elements[i];
      sigma.svg.utils.hide(o);
    }

    return this;
  };

  /**
   * This method binds the hover events to the renderer.
   *
   * @param  {string} prefix The renderer prefix.
   */
  // TODO: add option about whether to display hovers or not
  sigma.renderers.svg.prototype.bindHovers = function(prefix) {
    var renderers = sigma.svg.hovers,
        self = this,
        hoveredNode;

    function overNode(e) {
      var node = e.data.node,
          embedSettings = self.settings.embedObjects({
            prefix: prefix
          });

      if (!embedSettings('enableHovering'))
        return;

      var hover = (renderers[node.type] || renderers.def).create(
        node,
        self.domElements.nodes[node.id],
        self.measurementCanvas,
        embedSettings
      );

      self.domElements.hovers[node.id] = hover;

      // Inserting the hover in the dom
      self.domElements.groups.hovers.appendChild(hover);
      hoveredNode = node;
    }

    function outNode(e) {
      var node = e.data.node,
          embedSettings = self.settings.embedObjects({
            prefix: prefix
          });

      if (!embedSettings('enableHovering'))
        return;

      // Deleting element
      self.domElements.groups.hovers.removeChild(
        self.domElements.hovers[node.id]
      );
      hoveredNode = null;
      delete self.domElements.hovers[node.id];

      // Reinstate
      self.domElements.groups.nodes.appendChild(
        self.domElements.nodes[node.id]
      );
    }

    // OPTIMIZE: perform a real update rather than a deletion
    function update() {
      if (!hoveredNode)
        return;

      var embedSettings = self.settings.embedObjects({
            prefix: prefix
          });

      // Deleting element before update
      self.domElements.groups.hovers.removeChild(
        self.domElements.hovers[hoveredNode.id]
      );
      delete self.domElements.hovers[hoveredNode.id];

      var hover = (renderers[hoveredNode.type] || renderers.def).create(
        hoveredNode,
        self.domElements.nodes[hoveredNode.id],
        self.measurementCanvas,
        embedSettings
      );

      self.domElements.hovers[hoveredNode.id] = hover;

      // Inserting the hover in the dom
      self.domElements.groups.hovers.appendChild(hover);
    }

    // Binding events
    this.bind('overNode', overNode);
    this.bind('outNode', outNode);

    // Update on render
    this.bind('render', update);
  };

  /**
   * This method resizes each DOM elements in the container and stores the new
   * dimensions. Then, it renders the graph.
   *
   * @param  {?number}                width  The new width of the container.
   * @param  {?number}                height The new height of the container.
   * @return {sigma.renderers.svg}           Returns the instance itself.
   */
  sigma.renderers.svg.prototype.resize = function(w, h) {
    var oldWidth = this.width,
        oldHeight = this.height,
        pixelRatio = 1;

    if (w !== undefined && h !== undefined) {
      this.width = w;
      this.height = h;
    } else {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;

      w = this.width;
      h = this.height;
    }

    if (oldWidth !== this.width || oldHeight !== this.height) {
      this.domElements.graph.style.width = w + 'px';
      this.domElements.graph.style.height = h + 'px';

      if (this.domElements.graph.tagName.toLowerCase() === 'svg') {
        this.domElements.graph.setAttribute('width', (w * pixelRatio));
        this.domElements.graph.setAttribute('height', (h * pixelRatio));
      }
    }

    return this;
  };


  /**
   * The labels, nodes and edges renderers are stored in the three following
   * objects. When an element is drawn, its type will be checked and if a
   * renderer with the same name exists, it will be used. If not found, the
   * default renderer will be used instead.
   *
   * They are stored in different files, in the "./svg" folder.
   */
  sigma.utils.pkg('sigma.svg.nodes');
  sigma.utils.pkg('sigma.svg.edges');
  sigma.utils.pkg('sigma.svg.labels');
}).call(this);

;(function(global) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.renderers');

  // Check if WebGL is enabled:
  var canvas,
      webgl = !!global.WebGLRenderingContext;
  if (webgl) {
    canvas = document.createElement('canvas');
    try {
      webgl = !!(
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      );
    } catch (e) {
      webgl = false;
    }
  }

  // Copy the good renderer:
  sigma.renderers.def = webgl ?
    sigma.renderers.webgl :
    sigma.renderers.canvas;
})(this);

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.webgl.nodes');

  /**
   * This node renderer will display nodes as discs, shaped in triangles with
   * the gl.TRIANGLES display mode. So, to be more precise, to draw one node,
   * it will store three times the center of node, with the color and the size,
   * and an angle indicating which "corner" of the triangle to draw.
   *
   * The fragment shader does not deal with anti-aliasing, so make sure that
   * you deal with it somewhere else in the code (by default, the WebGL
   * renderer will oversample the rendering through the webglOversamplingRatio
   * value).
   */
  sigma.webgl.nodes.def = {
    POINTS: 3,
    ATTRIBUTES: 5,
    addNode: function(node, data, i, prefix, settings) {
      var color = sigma.utils.floatColor(
        node.color || settings('defaultNodeColor')
      );

      data[i++] = node[prefix + 'x'];
      data[i++] = node[prefix + 'y'];
      data[i++] = node[prefix + 'size'];
      data[i++] = color;
      data[i++] = 0;

      data[i++] = node[prefix + 'x'];
      data[i++] = node[prefix + 'y'];
      data[i++] = node[prefix + 'size'];
      data[i++] = color;
      data[i++] = 2 * Math.PI / 3;

      data[i++] = node[prefix + 'x'];
      data[i++] = node[prefix + 'y'];
      data[i++] = node[prefix + 'size'];
      data[i++] = color;
      data[i++] = 4 * Math.PI / 3;
    },
    render: function(gl, program, data, params) {
      var buffer;

      // Define attributes:
      var positionLocation =
            gl.getAttribLocation(program, 'a_position'),
          sizeLocation =
            gl.getAttribLocation(program, 'a_size'),
          colorLocation =
            gl.getAttribLocation(program, 'a_color'),
          angleLocation =
            gl.getAttribLocation(program, 'a_angle'),
          resolutionLocation =
            gl.getUniformLocation(program, 'u_resolution'),
          matrixLocation =
            gl.getUniformLocation(program, 'u_matrix'),
          ratioLocation =
            gl.getUniformLocation(program, 'u_ratio'),
          scaleLocation =
            gl.getUniformLocation(program, 'u_scale');

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

      gl.uniform2f(resolutionLocation, params.width, params.height);
      gl.uniform1f(
        ratioLocation,
        1 / Math.pow(params.ratio, params.settings('nodesPowRatio'))
      );
      gl.uniform1f(scaleLocation, params.scalingRatio);
      gl.uniformMatrix3fv(matrixLocation, false, params.matrix);

      gl.enableVertexAttribArray(positionLocation);
      gl.enableVertexAttribArray(sizeLocation);
      gl.enableVertexAttribArray(colorLocation);
      gl.enableVertexAttribArray(angleLocation);

      gl.vertexAttribPointer(
        positionLocation,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        0
      );
      gl.vertexAttribPointer(
        sizeLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        8
      );
      gl.vertexAttribPointer(
        colorLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        12
      );
      gl.vertexAttribPointer(
        angleLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        16
      );

      gl.drawArrays(
        gl.TRIANGLES,
        params.start || 0,
        params.count || (data.length / this.ATTRIBUTES)
      );
    },
    initProgram: function(gl) {
      var vertexShader,
          fragmentShader,
          program;

      vertexShader = sigma.utils.loadShader(
        gl,
        [
          'attribute vec2 a_position;',
          'attribute float a_size;',
          'attribute float a_color;',
          'attribute float a_angle;',

          'uniform vec2 u_resolution;',
          'uniform float u_ratio;',
          'uniform float u_scale;',
          'uniform mat3 u_matrix;',

          'varying vec4 color;',
          'varying vec2 center;',
          'varying float radius;',

          'void main() {',
            // Multiply the point size twice:
            'radius = a_size * u_ratio;',

            // Scale from [[-1 1] [-1 1]] to the container:
            'vec2 position = (u_matrix * vec3(a_position, 1)).xy;',
            // 'center = (position / u_resolution * 2.0 - 1.0) * vec2(1, -1);',
            'center = position * u_scale;',
            'center = vec2(center.x, u_scale * u_resolution.y - center.y);',

            'position = position +',
              '2.0 * radius * vec2(cos(a_angle), sin(a_angle));',
            'position = (position / u_resolution * 2.0 - 1.0) * vec2(1, -1);',

            'radius = radius * u_scale;',

            'gl_Position = vec4(position, 0, 1);',

            // Extract the color:
            'float c = a_color;',
            'color.b = mod(c, 256.0); c = floor(c / 256.0);',
            'color.g = mod(c, 256.0); c = floor(c / 256.0);',
            'color.r = mod(c, 256.0); c = floor(c / 256.0); color /= 255.0;',
            'color.a = 1.0;',
          '}'
        ].join('\n'),
        gl.VERTEX_SHADER
      );

      fragmentShader = sigma.utils.loadShader(
        gl,
        [
          'precision mediump float;',

          'varying vec4 color;',
          'varying vec2 center;',
          'varying float radius;',

          'void main(void) {',
            'vec4 color0 = vec4(0.0, 0.0, 0.0, 0.0);',

            'vec2 m = gl_FragCoord.xy - center;',
            'float diff = radius - sqrt(m.x * m.x + m.y * m.y);',

            // Here is how we draw a disc instead of a square:
            'if (diff > 0.0)',
              'gl_FragColor = color;',
            'else',
              'gl_FragColor = color0;',
          '}'
        ].join('\n'),
        gl.FRAGMENT_SHADER
      );

      program = sigma.utils.loadProgram(gl, [vertexShader, fragmentShader]);

      return program;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.webgl.nodes');

  /**
   * This node renderer will display nodes in the fastest way: Nodes are basic
   * squares, drawn through the gl.POINTS drawing method. The size of the nodes
   * are represented with the "gl_PointSize" value in the vertex shader.
   *
   * It is the fastest node renderer here since the buffer just takes one line
   * to draw each node (with attributes "x", "y", "size" and "color").
   *
   * Nevertheless, this method has some problems, especially due to some issues
   * with the gl.POINTS:
   *  - First, if the center of a node is outside the scene, the point will not
   *    be drawn, even if it should be partly on screen.
   *  - I tried applying a fragment shader similar to the one in the default
   *    node renderer to display them as discs, but it did not work fine on
   *    some computers settings, filling the discs with weird gradients not
   *    depending on the actual color.
   */
  sigma.webgl.nodes.fast = {
    POINTS: 1,
    ATTRIBUTES: 4,
    addNode: function(node, data, i, prefix, settings) {
      data[i++] = node[prefix + 'x'];
      data[i++] = node[prefix + 'y'];
      data[i++] = node[prefix + 'size'];
      data[i++] = sigma.utils.floatColor(
        node.color || settings('defaultNodeColor')
      );
    },
    render: function(gl, program, data, params) {
      var buffer;

      // Define attributes:
      var positionLocation =
            gl.getAttribLocation(program, 'a_position'),
          sizeLocation =
            gl.getAttribLocation(program, 'a_size'),
          colorLocation =
            gl.getAttribLocation(program, 'a_color'),
          resolutionLocation =
            gl.getUniformLocation(program, 'u_resolution'),
          matrixLocation =
            gl.getUniformLocation(program, 'u_matrix'),
          ratioLocation =
            gl.getUniformLocation(program, 'u_ratio'),
          scaleLocation =
            gl.getUniformLocation(program, 'u_scale');

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

      gl.uniform2f(resolutionLocation, params.width, params.height);
      gl.uniform1f(
        ratioLocation,
        1 / Math.pow(params.ratio, params.settings('nodesPowRatio'))
      );
      gl.uniform1f(scaleLocation, params.scalingRatio);
      gl.uniformMatrix3fv(matrixLocation, false, params.matrix);

      gl.enableVertexAttribArray(positionLocation);
      gl.enableVertexAttribArray(sizeLocation);
      gl.enableVertexAttribArray(colorLocation);

      gl.vertexAttribPointer(
        positionLocation,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        0
      );
      gl.vertexAttribPointer(
        sizeLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        8
      );
      gl.vertexAttribPointer(
        colorLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        12
      );

      gl.drawArrays(
        gl.POINTS,
        params.start || 0,
        params.count || (data.length / this.ATTRIBUTES)
      );
    },
    initProgram: function(gl) {
      var vertexShader,
          fragmentShader,
          program;

      vertexShader = sigma.utils.loadShader(
        gl,
        [
          'attribute vec2 a_position;',
          'attribute float a_size;',
          'attribute float a_color;',

          'uniform vec2 u_resolution;',
          'uniform float u_ratio;',
          'uniform float u_scale;',
          'uniform mat3 u_matrix;',

          'varying vec4 color;',

          'void main() {',
            // Scale from [[-1 1] [-1 1]] to the container:
            'gl_Position = vec4(',
              '((u_matrix * vec3(a_position, 1)).xy /',
                'u_resolution * 2.0 - 1.0) * vec2(1, -1),',
              '0,',
              '1',
            ');',

            // Multiply the point size twice:
            //  - x SCALING_RATIO to correct the canvas scaling
            //  - x 2 to correct the formulae
            'gl_PointSize = a_size * u_ratio * u_scale * 2.0;',

            // Extract the color:
            'float c = a_color;',
            'color.b = mod(c, 256.0); c = floor(c / 256.0);',
            'color.g = mod(c, 256.0); c = floor(c / 256.0);',
            'color.r = mod(c, 256.0); c = floor(c / 256.0); color /= 255.0;',
            'color.a = 1.0;',
          '}'
        ].join('\n'),
        gl.VERTEX_SHADER
      );

      fragmentShader = sigma.utils.loadShader(
        gl,
        [
          'precision mediump float;',

          'varying vec4 color;',

          'void main(void) {',
            'float border = 0.01;',
            'float radius = 0.5;',

            'vec4 color0 = vec4(0.0, 0.0, 0.0, 0.0);',
            'vec2 m = gl_PointCoord - vec2(0.5, 0.5);',
            'float dist = radius - sqrt(m.x * m.x + m.y * m.y);',

            'float t = 0.0;',
            'if (dist > border)',
              't = 1.0;',
            'else if (dist > 0.0)',
              't = dist / border;',

            'gl_FragColor = mix(color0, color, t);',
          '}'
        ].join('\n'),
        gl.FRAGMENT_SHADER
      );

      program = sigma.utils.loadProgram(gl, [vertexShader, fragmentShader]);

      return program;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.webgl.edges');

  /**
   * This edge renderer will display edges as lines going from the source node
   * to the target node. To deal with edge thicknesses, the lines are made of
   * two triangles forming rectangles, with the gl.TRIANGLES drawing mode.
   *
   * It is expensive, since drawing a single edge requires 6 points, each
   * having 7 attributes (source position, target position, thickness, color
   * and a flag indicating which vertice of the rectangle it is).
   */
  sigma.webgl.edges.def = {
    POINTS: 6,
    ATTRIBUTES: 7,
    addEdge: function(edge, source, target, data, i, prefix, settings) {
      var w = (edge[prefix + 'size'] || 1) / 2,
          x1 = source[prefix + 'x'],
          y1 = source[prefix + 'y'],
          x2 = target[prefix + 'x'],
          y2 = target[prefix + 'y'],
          color = edge.color;

      if (!color)
        switch (settings('edgeColor')) {
          case 'source':
            color = source.color || settings('defaultNodeColor');
            break;
          case 'target':
            color = target.color || settings('defaultNodeColor');
            break;
          default:
            color = settings('defaultEdgeColor');
            break;
        }

      // Normalize color:
      color = sigma.utils.floatColor(color);

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = w;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = 1.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = w;
      data[i++] = 1.0;
      data[i++] = color;

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = w;
      data[i++] = 0.0;
      data[i++] = color;
    },
    render: function(gl, program, data, params) {
      var buffer;

      // Define attributes:
      var colorLocation =
            gl.getAttribLocation(program, 'a_color'),
          positionLocation1 =
            gl.getAttribLocation(program, 'a_position1'),
          positionLocation2 =
            gl.getAttribLocation(program, 'a_position2'),
          thicknessLocation =
            gl.getAttribLocation(program, 'a_thickness'),
          minusLocation =
            gl.getAttribLocation(program, 'a_minus'),
          resolutionLocation =
            gl.getUniformLocation(program, 'u_resolution'),
          matrixLocation =
            gl.getUniformLocation(program, 'u_matrix'),
          matrixHalfPiLocation =
            gl.getUniformLocation(program, 'u_matrixHalfPi'),
          matrixHalfPiMinusLocation =
            gl.getUniformLocation(program, 'u_matrixHalfPiMinus'),
          ratioLocation =
            gl.getUniformLocation(program, 'u_ratio'),
          scaleLocation =
            gl.getUniformLocation(program, 'u_scale');

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

      gl.uniform2f(resolutionLocation, params.width, params.height);
      gl.uniform1f(
        ratioLocation,
        params.ratio / Math.pow(params.ratio, params.settings('edgesPowRatio'))
      );
      gl.uniform1f(scaleLocation, params.scalingRatio);
      gl.uniformMatrix3fv(matrixLocation, false, params.matrix);
      gl.uniformMatrix2fv(
        matrixHalfPiLocation,
        false,
        sigma.utils.matrices.rotation(Math.PI / 2, true)
      );
      gl.uniformMatrix2fv(
        matrixHalfPiMinusLocation,
        false,
        sigma.utils.matrices.rotation(-Math.PI / 2, true)
      );

      gl.enableVertexAttribArray(colorLocation);
      gl.enableVertexAttribArray(positionLocation1);
      gl.enableVertexAttribArray(positionLocation2);
      gl.enableVertexAttribArray(thicknessLocation);
      gl.enableVertexAttribArray(minusLocation);

      gl.vertexAttribPointer(positionLocation1,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        0
      );
      gl.vertexAttribPointer(positionLocation2,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        8
      );
      gl.vertexAttribPointer(thicknessLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        16
      );
      gl.vertexAttribPointer(minusLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        20
      );
      gl.vertexAttribPointer(colorLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        24
      );

      gl.drawArrays(
        gl.TRIANGLES,
        params.start || 0,
        params.count || (data.length / this.ATTRIBUTES)
      );
    },
    initProgram: function(gl) {
      var vertexShader,
          fragmentShader,
          program;

      vertexShader = sigma.utils.loadShader(
        gl,
        [
          'attribute vec2 a_position1;',
          'attribute vec2 a_position2;',
          'attribute float a_thickness;',
          'attribute float a_minus;',
          'attribute float a_color;',

          'uniform vec2 u_resolution;',
          'uniform float u_ratio;',
          'uniform float u_scale;',
          'uniform mat3 u_matrix;',
          'uniform mat2 u_matrixHalfPi;',
          'uniform mat2 u_matrixHalfPiMinus;',

          'varying vec4 color;',

          'void main() {',
            // Find the good point:
            'vec2 position = a_thickness * u_ratio *',
              'normalize(a_position2 - a_position1);',

            'mat2 matrix = a_minus * u_matrixHalfPiMinus +',
              '(1.0 - a_minus) * u_matrixHalfPi;',

            'position = matrix * position + a_position1;',

            // Scale from [[-1 1] [-1 1]] to the container:
            'gl_Position = vec4(',
              '((u_matrix * vec3(position, 1)).xy /',
                'u_resolution * 2.0 - 1.0) * vec2(1, -1),',
              '0,',
              '1',
            ');',

            // Extract the color:
            'float c = a_color;',
            'color.b = mod(c, 256.0); c = floor(c / 256.0);',
            'color.g = mod(c, 256.0); c = floor(c / 256.0);',
            'color.r = mod(c, 256.0); c = floor(c / 256.0); color /= 255.0;',
            'color.a = 1.0;',
          '}'
        ].join('\n'),
        gl.VERTEX_SHADER
      );

      fragmentShader = sigma.utils.loadShader(
        gl,
        [
          'precision mediump float;',

          'varying vec4 color;',

          'void main(void) {',
            'gl_FragColor = color;',
          '}'
        ].join('\n'),
        gl.FRAGMENT_SHADER
      );

      program = sigma.utils.loadProgram(gl, [vertexShader, fragmentShader]);

      return program;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.webgl.edges');

  /**
   * This edge renderer will display edges as lines with the gl.LINES display
   * mode. Since this mode does not support well thickness, edges are all drawn
   * with the same thickness (3px), independantly of the edge attributes or the
   * zooming ratio.
   */
  sigma.webgl.edges.fast = {
    POINTS: 2,
    ATTRIBUTES: 3,
    addEdge: function(edge, source, target, data, i, prefix, settings) {
      var w = (edge[prefix + 'size'] || 1) / 2,
          x1 = source[prefix + 'x'],
          y1 = source[prefix + 'y'],
          x2 = target[prefix + 'x'],
          y2 = target[prefix + 'y'],
          color = edge.color;

      if (!color)
        switch (settings('edgeColor')) {
          case 'source':
            color = source.color || settings('defaultNodeColor');
            break;
          case 'target':
            color = target.color || settings('defaultNodeColor');
            break;
          default:
            color = settings('defaultEdgeColor');
            break;
        }

      // Normalize color:
      color = sigma.utils.floatColor(color);

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = color;
    },
    render: function(gl, program, data, params) {
      var buffer;

      // Define attributes:
      var colorLocation =
            gl.getAttribLocation(program, 'a_color'),
          positionLocation =
            gl.getAttribLocation(program, 'a_position'),
          resolutionLocation =
            gl.getUniformLocation(program, 'u_resolution'),
          matrixLocation =
            gl.getUniformLocation(program, 'u_matrix');

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

      gl.uniform2f(resolutionLocation, params.width, params.height);
      gl.uniformMatrix3fv(matrixLocation, false, params.matrix);

      gl.enableVertexAttribArray(positionLocation);
      gl.enableVertexAttribArray(colorLocation);

      gl.vertexAttribPointer(positionLocation,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        0
      );
      gl.vertexAttribPointer(colorLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        8
      );

      gl.lineWidth(3);
      gl.drawArrays(
        gl.LINES,
        params.start || 0,
        params.count || (data.length / this.ATTRIBUTES)
      );
    },
    initProgram: function(gl) {
      var vertexShader,
          fragmentShader,
          program;

      vertexShader = sigma.utils.loadShader(
        gl,
        [
          'attribute vec2 a_position;',
          'attribute float a_color;',

          'uniform vec2 u_resolution;',
          'uniform mat3 u_matrix;',

          'varying vec4 color;',

          'void main() {',
            // Scale from [[-1 1] [-1 1]] to the container:
            'gl_Position = vec4(',
              '((u_matrix * vec3(a_position, 1)).xy /',
                'u_resolution * 2.0 - 1.0) * vec2(1, -1),',
              '0,',
              '1',
            ');',

            // Extract the color:
            'float c = a_color;',
            'color.b = mod(c, 256.0); c = floor(c / 256.0);',
            'color.g = mod(c, 256.0); c = floor(c / 256.0);',
            'color.r = mod(c, 256.0); c = floor(c / 256.0); color /= 255.0;',
            'color.a = 1.0;',
          '}'
        ].join('\n'),
        gl.VERTEX_SHADER
      );

      fragmentShader = sigma.utils.loadShader(
        gl,
        [
          'precision mediump float;',

          'varying vec4 color;',

          'void main(void) {',
            'gl_FragColor = color;',
          '}'
        ].join('\n'),
        gl.FRAGMENT_SHADER
      );

      program = sigma.utils.loadProgram(gl, [vertexShader, fragmentShader]);

      return program;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.webgl.edges');

  /**
   * This edge renderer will display edges as arrows going from the source node
   * to the target node. To deal with edge thicknesses, the lines are made of
   * three triangles: two forming rectangles, with the gl.TRIANGLES drawing
   * mode.
   *
   * It is expensive, since drawing a single edge requires 9 points, each
   * having a lot of attributes.
   */
  sigma.webgl.edges.arrow = {
    POINTS: 9,
    ATTRIBUTES: 11,
    addEdge: function(edge, source, target, data, i, prefix, settings) {
      var w = (edge[prefix + 'size'] || 1) / 2,
          x1 = source[prefix + 'x'],
          y1 = source[prefix + 'y'],
          x2 = target[prefix + 'x'],
          y2 = target[prefix + 'y'],
          targetSize = target[prefix + 'size'],
          color = edge.color;

      if (!color)
        switch (settings('edgeColor')) {
          case 'source':
            color = source.color || settings('defaultNodeColor');
            break;
          case 'target':
            color = target.color || settings('defaultNodeColor');
            break;
          default:
            color = settings('defaultEdgeColor');
            break;
        }

      // Normalize color:
      color = sigma.utils.floatColor(color);

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 1.0;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 0.0;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = color;

      // Arrow head:
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 1.0;
      data[i++] = -1.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 1.0;
      data[i++] = 1.0;
      data[i++] = color;
    },
    render: function(gl, program, data, params) {
      var buffer;

      // Define attributes:
      var positionLocation1 =
            gl.getAttribLocation(program, 'a_pos1'),
          positionLocation2 =
            gl.getAttribLocation(program, 'a_pos2'),
          thicknessLocation =
            gl.getAttribLocation(program, 'a_thickness'),
          targetSizeLocation =
            gl.getAttribLocation(program, 'a_tSize'),
          delayLocation =
            gl.getAttribLocation(program, 'a_delay'),
          minusLocation =
            gl.getAttribLocation(program, 'a_minus'),
          headLocation =
            gl.getAttribLocation(program, 'a_head'),
          headPositionLocation =
            gl.getAttribLocation(program, 'a_headPosition'),
          colorLocation =
            gl.getAttribLocation(program, 'a_color'),
          resolutionLocation =
            gl.getUniformLocation(program, 'u_resolution'),
          matrixLocation =
            gl.getUniformLocation(program, 'u_matrix'),
          matrixHalfPiLocation =
            gl.getUniformLocation(program, 'u_matrixHalfPi'),
          matrixHalfPiMinusLocation =
            gl.getUniformLocation(program, 'u_matrixHalfPiMinus'),
          ratioLocation =
            gl.getUniformLocation(program, 'u_ratio'),
          nodeRatioLocation =
            gl.getUniformLocation(program, 'u_nodeRatio'),
          arrowHeadLocation =
            gl.getUniformLocation(program, 'u_arrowHead'),
          scaleLocation =
            gl.getUniformLocation(program, 'u_scale');

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

      gl.uniform2f(resolutionLocation, params.width, params.height);
      gl.uniform1f(
        ratioLocation,
        params.ratio / Math.pow(params.ratio, params.settings('edgesPowRatio'))
      );
      gl.uniform1f(
        nodeRatioLocation,
        Math.pow(params.ratio, params.settings('nodesPowRatio')) /
        params.ratio
      );
      gl.uniform1f(arrowHeadLocation, 5.0);
      gl.uniform1f(scaleLocation, params.scalingRatio);
      gl.uniformMatrix3fv(matrixLocation, false, params.matrix);
      gl.uniformMatrix2fv(
        matrixHalfPiLocation,
        false,
        sigma.utils.matrices.rotation(Math.PI / 2, true)
      );
      gl.uniformMatrix2fv(
        matrixHalfPiMinusLocation,
        false,
        sigma.utils.matrices.rotation(-Math.PI / 2, true)
      );

      gl.enableVertexAttribArray(positionLocation1);
      gl.enableVertexAttribArray(positionLocation2);
      gl.enableVertexAttribArray(thicknessLocation);
      gl.enableVertexAttribArray(targetSizeLocation);
      gl.enableVertexAttribArray(delayLocation);
      gl.enableVertexAttribArray(minusLocation);
      gl.enableVertexAttribArray(headLocation);
      gl.enableVertexAttribArray(headPositionLocation);
      gl.enableVertexAttribArray(colorLocation);

      gl.vertexAttribPointer(positionLocation1,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        0
      );
      gl.vertexAttribPointer(positionLocation2,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        8
      );
      gl.vertexAttribPointer(thicknessLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        16
      );
      gl.vertexAttribPointer(targetSizeLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        20
      );
      gl.vertexAttribPointer(delayLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        24
      );
      gl.vertexAttribPointer(minusLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        28
      );
      gl.vertexAttribPointer(headLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        32
      );
      gl.vertexAttribPointer(headPositionLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        36
      );
      gl.vertexAttribPointer(colorLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        40
      );

      gl.drawArrays(
        gl.TRIANGLES,
        params.start || 0,
        params.count || (data.length / this.ATTRIBUTES)
      );
    },
    initProgram: function(gl) {
      var vertexShader,
          fragmentShader,
          program;

      vertexShader = sigma.utils.loadShader(
        gl,
        [
          'attribute vec2 a_pos1;',
          'attribute vec2 a_pos2;',
          'attribute float a_thickness;',
          'attribute float a_tSize;',
          'attribute float a_delay;',
          'attribute float a_minus;',
          'attribute float a_head;',
          'attribute float a_headPosition;',
          'attribute float a_color;',

          'uniform vec2 u_resolution;',
          'uniform float u_ratio;',
          'uniform float u_nodeRatio;',
          'uniform float u_arrowHead;',
          'uniform float u_scale;',
          'uniform mat3 u_matrix;',
          'uniform mat2 u_matrixHalfPi;',
          'uniform mat2 u_matrixHalfPiMinus;',

          'varying vec4 color;',

          'void main() {',
            // Find the good point:
            'vec2 pos = normalize(a_pos2 - a_pos1);',

            'mat2 matrix = (1.0 - a_head) *',
              '(',
                'a_minus * u_matrixHalfPiMinus +',
                '(1.0 - a_minus) * u_matrixHalfPi',
              ') + a_head * (',
                'a_headPosition * u_matrixHalfPiMinus * 0.6 +',
                '(a_headPosition * a_headPosition - 1.0) * mat2(1.0)',
              ');',

            'pos = a_pos1 + (',
              // Deal with body:
              '(1.0 - a_head) * a_thickness * u_ratio * matrix * pos +',
              // Deal with head:
              'a_head * u_arrowHead * a_thickness * u_ratio * matrix * pos +',
              // Deal with delay:
              'a_delay * pos * (',
                'a_tSize / u_nodeRatio +',
                'u_arrowHead * a_thickness * u_ratio',
              ')',
            ');',

            // Scale from [[-1 1] [-1 1]] to the container:
            'gl_Position = vec4(',
              '((u_matrix * vec3(pos, 1)).xy /',
                'u_resolution * 2.0 - 1.0) * vec2(1, -1),',
              '0,',
              '1',
            ');',

            // Extract the color:
            'float c = a_color;',
            'color.b = mod(c, 256.0); c = floor(c / 256.0);',
            'color.g = mod(c, 256.0); c = floor(c / 256.0);',
            'color.r = mod(c, 256.0); c = floor(c / 256.0); color /= 255.0;',
            'color.a = 1.0;',
          '}'
        ].join('\n'),
        gl.VERTEX_SHADER
      );

      fragmentShader = sigma.utils.loadShader(
        gl,
        [
          'precision mediump float;',

          'varying vec4 color;',

          'void main(void) {',
            'gl_FragColor = color;',
          '}'
        ].join('\n'),
        gl.FRAGMENT_SHADER
      );

      program = sigma.utils.loadProgram(gl, [vertexShader, fragmentShader]);

      return program;
    }
  };
})();

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.labels');

  /**
   * This label renderer will just display the label on the right of the node.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.labels.def = function(node, context, settings) {
    var fontSize,
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'];

    if (size < settings('labelThreshold'))
      return;

    if (!node.label || typeof node.label !== 'string')
      return;

    fontSize = (settings('labelSize') === 'fixed') ?
      settings('defaultLabelSize') :
      settings('labelSizeRatio') * size;

    context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') +
      fontSize + 'px ' + settings('font');
    context.fillStyle = (settings('labelColor') === 'node') ?
      (node.color || settings('defaultNodeColor')) :
      settings('defaultLabelColor');

    context.fillText(
      node.label,
      Math.round(node[prefix + 'x'] + size + 3),
      Math.round(node[prefix + 'y'] + fontSize / 3)
    );
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.hovers');

  /**
   * This hover renderer will basically display the label with a background.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.hovers.def = function(node, context, settings) {
    var x,
        y,
        w,
        h,
        e,
        fontStyle = settings('hoverFontStyle') || settings('fontStyle'),
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'],
        fontSize = (settings('labelSize') === 'fixed') ?
          settings('defaultLabelSize') :
          settings('labelSizeRatio') * size;

    // Label background:
    context.font = (fontStyle ? fontStyle + ' ' : '') +
      fontSize + 'px ' + (settings('hoverFont') || settings('font'));

    context.beginPath();
    context.fillStyle = settings('labelHoverBGColor') === 'node' ?
      (node.color || settings('defaultNodeColor')) :
      settings('defaultHoverLabelBGColor');

    if (node.label && settings('labelHoverShadow')) {
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 8;
      context.shadowColor = settings('labelHoverShadowColor');
    }

    if (node.label && typeof node.label === 'string') {
      x = Math.round(node[prefix + 'x'] - fontSize / 2 - 2);
      y = Math.round(node[prefix + 'y'] - fontSize / 2 - 2);
      w = Math.round(
        context.measureText(node.label).width + fontSize / 2 + size + 7
      );
      h = Math.round(fontSize + 4);
      e = Math.round(fontSize / 2 + 2);

      context.moveTo(x, y + e);
      context.arcTo(x, y, x + e, y, e);
      context.lineTo(x + w, y);
      context.lineTo(x + w, y + h);
      context.lineTo(x + e, y + h);
      context.arcTo(x, y + h, x, y + h - e, e);
      context.lineTo(x, y + e);

      context.closePath();
      context.fill();

      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
    }

    // Node border:
    if (settings('borderSize') > 0) {
      context.beginPath();
      context.fillStyle = settings('nodeBorderColor') === 'node' ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultNodeBorderColor');
      context.arc(
        node[prefix + 'x'],
        node[prefix + 'y'],
        size + settings('borderSize'),
        0,
        Math.PI * 2,
        true
      );
      context.closePath();
      context.fill();
    }

    // Node:
    var nodeRenderer = sigma.canvas.nodes[node.type] || sigma.canvas.nodes.def;
    nodeRenderer(node, context, settings);

    // Display the label:
    if (node.label && typeof node.label === 'string') {
      context.fillStyle = (settings('labelHoverColor') === 'node') ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultLabelHoverColor');

      context.fillText(
        node.label,
        Math.round(node[prefix + 'x'] + size + 3),
        Math.round(node[prefix + 'y'] + fontSize / 3)
      );
    }
  };
}).call(this);

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.nodes');

  /**
   * The default node renderer. It renders the node as a simple disc.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.nodes.def = function(node, context, settings) {
    var prefix = settings('prefix') || '';

    context.fillStyle = node.color || settings('defaultNodeColor');
    context.beginPath();
    context.arc(
      node[prefix + 'x'],
      node[prefix + 'y'],
      node[prefix + 'size'],
      0,
      Math.PI * 2,
      true
    );

    context.closePath();
    context.fill();
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * The default edge renderer. It renders the edge as a simple line.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.def = function(edge, source, target, context, settings) {
    var color = edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor');

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This edge renderer will display edges as arrows going from the source node
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.arrow = function(edge, source, target, context, settings) {
    var color = edge.color,
        prefix = settings('prefix') || '',
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        size = edge[prefix + 'size'] || 1,
        tSize = target[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        aSize = Math.max(size * 2.5, settings('minArrowSize')),
        d = Math.sqrt(Math.pow(tX - sX, 2) + Math.pow(tY - sY, 2)),
        aX = sX + (tX - sX) * (d - aSize - tSize) / d,
        aY = sY + (tY - sY) * (d - aSize - tSize) / d,
        vX = (tX - sX) * aSize / d,
        vY = (tY - sY) * aSize / d;

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(sX, sY);
    context.lineTo(
      aX,
      aY
    );
    context.stroke();

    context.fillStyle = color;
    context.beginPath();
    context.moveTo(aX + vX, aY + vY);
    context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
    context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
    context.lineTo(aX + vX, aY + vY);
    context.closePath();
    context.fill();
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.def =
    function(edge, source, target, context, settings) {
      var color = edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor');

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }
    size *= settings('edgeHoverSizeRatio');

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.curve =
    function(edge, source, target, context, settings) {
    var color = edge.color,
        prefix = settings('prefix') || '',
        size = settings('edgeHoverSizeRatio') * (edge[prefix + 'size'] || 1),
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        cp = {},
        sSize = source[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'];

    cp = (source.id === target.id) ?
      sigma.utils.getSelfLoopControlPoints(sX, sY, sSize) :
      sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY);

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(sX, sY);
    if (source.id === target.id) {
      context.bezierCurveTo(cp.x1, cp.y1, cp.x2, cp.y2, tX, tY);
    } else {
      context.quadraticCurveTo(cp.x, cp.y, tX, tY);
    }
    context.stroke();
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.arrow =
    function(edge, source, target, context, settings) {
    var color = edge.color,
        prefix = settings('prefix') || '',
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        size = edge[prefix + 'size'] || 1,
        tSize = target[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'];

    size = (edge.hover) ?
      settings('edgeHoverSizeRatio') * size : size;
    var aSize = size * 2.5,
        d = Math.sqrt(Math.pow(tX - sX, 2) + Math.pow(tY - sY, 2)),
        aX = sX + (tX - sX) * (d - aSize - tSize) / d,
        aY = sY + (tY - sY) * (d - aSize - tSize) / d,
        vX = (tX - sX) * aSize / d,
        vY = (tY - sY) * aSize / d;

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(sX, sY);
    context.lineTo(
      aX,
      aY
    );
    context.stroke();

    context.fillStyle = color;
    context.beginPath();
    context.moveTo(aX + vX, aY + vY);
    context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
    context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
    context.lineTo(aX + vX, aY + vY);
    context.closePath();
    context.fill();
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.curvedArrow =
    function(edge, source, target, context, settings) {
    var color = edge.color,
        prefix = settings('prefix') || '',
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        cp = {},
        size = settings('edgeHoverSizeRatio') * (edge[prefix + 'size'] || 1),
        tSize = target[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        d,
        aSize,
        aX,
        aY,
        vX,
        vY;

    cp = (source.id === target.id) ?
      sigma.utils.getSelfLoopControlPoints(sX, sY, tSize) :
      sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY);

    if (source.id === target.id) {
      d = Math.sqrt(Math.pow(tX - cp.x1, 2) + Math.pow(tY - cp.y1, 2));
      aSize = size * 2.5;
      aX = cp.x1 + (tX - cp.x1) * (d - aSize - tSize) / d;
      aY = cp.y1 + (tY - cp.y1) * (d - aSize - tSize) / d;
      vX = (tX - cp.x1) * aSize / d;
      vY = (tY - cp.y1) * aSize / d;
    }
    else {
      d = Math.sqrt(Math.pow(tX - cp.x, 2) + Math.pow(tY - cp.y, 2));
      aSize = size * 2.5;
      aX = cp.x + (tX - cp.x) * (d - aSize - tSize) / d;
      aY = cp.y + (tY - cp.y) * (d - aSize - tSize) / d;
      vX = (tX - cp.x) * aSize / d;
      vY = (tY - cp.y) * aSize / d;
    }

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(sX, sY);
    if (source.id === target.id) {
      context.bezierCurveTo(cp.x2, cp.y2, cp.x1, cp.y1, aX, aY);
    } else {
      context.quadraticCurveTo(cp.x, cp.y, aX, aY);
    }
    context.stroke();

    context.fillStyle = color;
    context.beginPath();
    context.moveTo(aX + vX, aY + vY);
    context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
    context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
    context.lineTo(aX + vX, aY + vY);
    context.closePath();
    context.fill();
  };
})();

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.extremities');

  /**
   * The default renderer for hovered edge extremities. It renders the edge
   * extremities as hovered.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.extremities.def =
    function(edge, source, target, context, settings) {
    // Source Node:
    (
      sigma.canvas.hovers[source.type] ||
      sigma.canvas.hovers.def
    ) (
      source, context, settings
    );

    // Target Node:
    (
      sigma.canvas.hovers[target.type] ||
      sigma.canvas.hovers.def
    ) (
      target, context, settings
    );
  };
}).call(this);

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.svg.utils');

  /**
   * Some useful functions used by sigma's SVG renderer.
   */
  sigma.svg.utils = {

    /**
     * SVG Element show.
     *
     * @param  {DOMElement}               element   The DOM element to show.
     */
    show: function(element) {
      element.style.display = '';
      return this;
    },

    /**
     * SVG Element hide.
     *
     * @param  {DOMElement}               element   The DOM element to hide.
     */
    hide: function(element) {
      element.style.display = 'none';
      return this;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.svg.nodes');

  /**
   * The default node renderer. It renders the node as a simple disc.
   */
  sigma.svg.nodes.def = {

    /**
     * SVG Element creation.
     *
     * @param  {object}                   node     The node object.
     * @param  {configurable}             settings The settings function.
     */
    create: function(node, settings) {
      var prefix = settings('prefix') || '',
          circle = document.createElementNS(settings('xmlns'), 'circle');

      // Defining the node's circle
      circle.setAttributeNS(null, 'data-node-id', node.id);
      circle.setAttributeNS(null, 'class', settings('classPrefix') + '-node');
      circle.setAttributeNS(
        null, 'fill', node.color || settings('defaultNodeColor'));

      // Returning the DOM Element
      return circle;
    },

    /**
     * SVG Element update.
     *
     * @param  {object}                   node     The node object.
     * @param  {DOMElement}               circle   The node DOM element.
     * @param  {configurable}             settings The settings function.
     */
    update: function(node, circle, settings) {
      var prefix = settings('prefix') || '';

      // Applying changes
      // TODO: optimize - check if necessary
      circle.setAttributeNS(null, 'cx', node[prefix + 'x']);
      circle.setAttributeNS(null, 'cy', node[prefix + 'y']);
      circle.setAttributeNS(null, 'r', node[prefix + 'size']);

      // Updating only if not freestyle
      if (!settings('freeStyle'))
        circle.setAttributeNS(
          null, 'fill', node.color || settings('defaultNodeColor'));

      // Showing
      circle.style.display = '';

      return this;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.svg.edges');

  /**
   * The default edge renderer. It renders the node as a simple line.
   */
  sigma.svg.edges.def = {

    /**
     * SVG Element creation.
     *
     * @param  {object}                   edge       The edge object.
     * @param  {object}                   source     The source node object.
     * @param  {object}                   target     The target node object.
     * @param  {configurable}             settings   The settings function.
     */
    create: function(edge, source, target, settings) {
      var color = edge.color,
          prefix = settings('prefix') || '',
          edgeColor = settings('edgeColor'),
          defaultNodeColor = settings('defaultNodeColor'),
          defaultEdgeColor = settings('defaultEdgeColor');

      if (!color)
        switch (edgeColor) {
          case 'source':
            color = source.color || defaultNodeColor;
            break;
          case 'target':
            color = target.color || defaultNodeColor;
            break;
          default:
            color = defaultEdgeColor;
            break;
        }

      var line = document.createElementNS(settings('xmlns'), 'line');

      // Attributes
      line.setAttributeNS(null, 'data-edge-id', edge.id);
      line.setAttributeNS(null, 'class', settings('classPrefix') + '-edge');
      line.setAttributeNS(null, 'stroke', color);

      return line;
    },

    /**
     * SVG Element update.
     *
     * @param  {object}                   edge       The edge object.
     * @param  {DOMElement}               line       The line DOM Element.
     * @param  {object}                   source     The source node object.
     * @param  {object}                   target     The target node object.
     * @param  {configurable}             settings   The settings function.
     */
    update: function(edge, line, source, target, settings) {
      var prefix = settings('prefix') || '';

      line.setAttributeNS(null, 'stroke-width', edge[prefix + 'size'] || 1);
      line.setAttributeNS(null, 'x1', source[prefix + 'x']);
      line.setAttributeNS(null, 'y1', source[prefix + 'y']);
      line.setAttributeNS(null, 'x2', target[prefix + 'x']);
      line.setAttributeNS(null, 'y2', target[prefix + 'y']);

      // Showing
      line.style.display = '';

      return this;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.svg.edges');

  /**
   * The curve edge renderer. It renders the node as a bezier curve.
   */
  sigma.svg.edges.curve = {

    /**
     * SVG Element creation.
     *
     * @param  {object}                   edge       The edge object.
     * @param  {object}                   source     The source node object.
     * @param  {object}                   target     The target node object.
     * @param  {configurable}             settings   The settings function.
     */
    create: function(edge, source, target, settings) {
      var color = edge.color,
          prefix = settings('prefix') || '',
          edgeColor = settings('edgeColor'),
          defaultNodeColor = settings('defaultNodeColor'),
          defaultEdgeColor = settings('defaultEdgeColor');

      if (!color)
        switch (edgeColor) {
          case 'source':
            color = source.color || defaultNodeColor;
            break;
          case 'target':
            color = target.color || defaultNodeColor;
            break;
          default:
            color = defaultEdgeColor;
            break;
        }

      var path = document.createElementNS(settings('xmlns'), 'path');

      // Attributes
      path.setAttributeNS(null, 'data-edge-id', edge.id);
      path.setAttributeNS(null, 'class', settings('classPrefix') + '-edge');
      path.setAttributeNS(null, 'stroke', color);

      return path;
    },

    /**
     * SVG Element update.
     *
     * @param  {object}                   edge       The edge object.
     * @param  {DOMElement}               line       The line DOM Element.
     * @param  {object}                   source     The source node object.
     * @param  {object}                   target     The target node object.
     * @param  {configurable}             settings   The settings function.
     */
    update: function(edge, path, source, target, settings) {
      var prefix = settings('prefix') || '';

      path.setAttributeNS(null, 'stroke-width', edge[prefix + 'size'] || 1);

      // Control point
      var cx = (source[prefix + 'x'] + target[prefix + 'x']) / 2 +
        (target[prefix + 'y'] - source[prefix + 'y']) / 4,
          cy = (source[prefix + 'y'] + target[prefix + 'y']) / 2 +
        (source[prefix + 'x'] - target[prefix + 'x']) / 4;

      // Path
      var p = 'M' + source[prefix + 'x'] + ',' + source[prefix + 'y'] + ' ' +
              'Q' + cx + ',' + cy + ' ' +
              target[prefix + 'x'] + ',' + target[prefix + 'y'];

      // Updating attributes
      path.setAttributeNS(null, 'd', p);
      path.setAttributeNS(null, 'fill', 'none');

      // Showing
      path.style.display = '';

      return this;
    }
  };
})();

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.svg.labels');

  /**
   * The default label renderer. It renders the label as a simple text.
   */
  sigma.svg.labels.def = {

    /**
     * SVG Element creation.
     *
     * @param  {object}                   node       The node object.
     * @param  {configurable}             settings   The settings function.
     */
    create: function(node, settings) {
      var prefix = settings('prefix') || '',
          size = node[prefix + 'size'],
          text = document.createElementNS(settings('xmlns'), 'text');

      var fontSize = (settings('labelSize') === 'fixed') ?
        settings('defaultLabelSize') :
        settings('labelSizeRatio') * size;

      var fontColor = (settings('labelColor') === 'node') ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultLabelColor');

      text.setAttributeNS(null, 'data-label-target', node.id);
      text.setAttributeNS(null, 'class', settings('classPrefix') + '-label');
      text.setAttributeNS(null, 'font-size', fontSize);
      text.setAttributeNS(null, 'font-family', settings('font'));
      text.setAttributeNS(null, 'fill', fontColor);

      text.innerHTML = node.label;
      text.textContent = node.label;

      return text;
    },

    /**
     * SVG Element update.
     *
     * @param  {object}                   node     The node object.
     * @param  {DOMElement}               text     The label DOM element.
     * @param  {configurable}             settings The settings function.
     */
    update: function(node, text, settings) {
      var prefix = settings('prefix') || '',
          size = node[prefix + 'size'];

      var fontSize = (settings('labelSize') === 'fixed') ?
        settings('defaultLabelSize') :
        settings('labelSizeRatio') * size;

      // Case when we don't want to display the label
      if (!settings('forceLabels') && size < settings('labelThreshold'))
        return;

      if (typeof node.label !== 'string')
        return;

      // Updating
      text.setAttributeNS(null, 'x',
        Math.round(node[prefix + 'x'] + size + 3));
      text.setAttributeNS(null, 'y',
        Math.round(node[prefix + 'y'] + fontSize / 3));

      // Showing
      text.style.display = '';

      return this;
    }
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.svg.hovers');

  /**
   * The default hover renderer.
   */
  sigma.svg.hovers.def = {

    /**
     * SVG Element creation.
     *
     * @param  {object}           node               The node object.
     * @param  {CanvasElement}    measurementCanvas  A fake canvas handled by
     *                            the svg to perform some measurements and
     *                            passed by the renderer.
     * @param  {DOMElement}       nodeCircle         The node DOM Element.
     * @param  {configurable}     settings           The settings function.
     */
    create: function(node, nodeCircle, measurementCanvas, settings) {

      // Defining visual properties
      var x,
          y,
          w,
          h,
          e,
          d,
          fontStyle = settings('hoverFontStyle') || settings('fontStyle'),
          prefix = settings('prefix') || '',
          size = node[prefix + 'size'],
          fontSize = (settings('labelSize') === 'fixed') ?
            settings('defaultLabelSize') :
            settings('labelSizeRatio') * size,
          fontColor = (settings('labelHoverColor') === 'node') ?
                        (node.color || settings('defaultNodeColor')) :
                        settings('defaultLabelHoverColor');

      // Creating elements
      var group = document.createElementNS(settings('xmlns'), 'g'),
          rectangle = document.createElementNS(settings('xmlns'), 'rect'),
          circle = document.createElementNS(settings('xmlns'), 'circle'),
          text = document.createElementNS(settings('xmlns'), 'text');

      // Defining properties
      group.setAttributeNS(null, 'class', settings('classPrefix') + '-hover');
      group.setAttributeNS(null, 'data-node-id', node.id);

      if (typeof node.label === 'string') {

        // Text
        text.innerHTML = node.label;
        text.textContent = node.label;
        text.setAttributeNS(
            null,
            'class',
            settings('classPrefix') + '-hover-label');
        text.setAttributeNS(null, 'font-size', fontSize);
        text.setAttributeNS(null, 'font-family', settings('font'));
        text.setAttributeNS(null, 'fill', fontColor);
        text.setAttributeNS(null, 'x',
          Math.round(node[prefix + 'x'] + size + 3));
        text.setAttributeNS(null, 'y',
          Math.round(node[prefix + 'y'] + fontSize / 3));

        // Measures
        // OPTIMIZE: Find a better way than a measurement canvas
        x = Math.round(node[prefix + 'x'] - fontSize / 2 - 2);
        y = Math.round(node[prefix + 'y'] - fontSize / 2 - 2);
        w = Math.round(
          measurementCanvas.measureText(node.label).width +
            fontSize / 2 + size + 9
        );
        h = Math.round(fontSize + 4);
        e = Math.round(fontSize / 2 + 2);

        // Circle
        circle.setAttributeNS(
            null,
            'class',
            settings('classPrefix') + '-hover-area');
        circle.setAttributeNS(null, 'fill', '#fff');
        circle.setAttributeNS(null, 'cx', node[prefix + 'x']);
        circle.setAttributeNS(null, 'cy', node[prefix + 'y']);
        circle.setAttributeNS(null, 'r', e);

        // Rectangle
        rectangle.setAttributeNS(
            null,
            'class',
            settings('classPrefix') + '-hover-area');
        rectangle.setAttributeNS(null, 'fill', '#fff');
        rectangle.setAttributeNS(null, 'x', node[prefix + 'x'] + e / 4);
        rectangle.setAttributeNS(null, 'y', node[prefix + 'y'] - e);
        rectangle.setAttributeNS(null, 'width', w);
        rectangle.setAttributeNS(null, 'height', h);
      }

      // Appending childs
      group.appendChild(circle);
      group.appendChild(rectangle);
      group.appendChild(text);
      group.appendChild(nodeCircle);

      return group;
    }
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.middlewares');
  sigma.utils.pkg('sigma.utils');

  /**
   * This middleware will rescale the graph such that it takes an optimal space
   * on the renderer.
   *
   * As each middleware, this function is executed in the scope of the sigma
   * instance.
   *
   * @param {?string} readPrefix  The read prefix.
   * @param {?string} writePrefix The write prefix.
   * @param {object}  options     The parameters.
   */
  sigma.middlewares.rescale = function(readPrefix, writePrefix, options) {
    var i,
        l,
        a,
        b,
        c,
        d,
        scale,
        margin,
        n = this.graph.nodes(),
        e = this.graph.edges(),
        settings = this.settings.embedObjects(options || {}),
        bounds = settings('bounds') || sigma.utils.getBoundaries(
          this.graph,
          readPrefix,
          true
        ),
        minX = bounds.minX,
        minY = bounds.minY,
        maxX = bounds.maxX,
        maxY = bounds.maxY,
        sizeMax = bounds.sizeMax,
        weightMax = bounds.weightMax,
        w = settings('width') || 1,
        h = settings('height') || 1,
        rescaleSettings = settings('autoRescale'),
        validSettings = {
          nodePosition: 1,
          nodeSize: 1,
          edgeSize: 1
        };

    /**
     * What elements should we rescale?
     */
    if (!(rescaleSettings instanceof Array))
      rescaleSettings = ['nodePosition', 'nodeSize', 'edgeSize'];

    for (i = 0, l = rescaleSettings.length; i < l; i++)
      if (!validSettings[rescaleSettings[i]])
        throw new Error(
          'The rescale setting "' + rescaleSettings[i] + '" is not recognized.'
        );

    var np = ~rescaleSettings.indexOf('nodePosition'),
        ns = ~rescaleSettings.indexOf('nodeSize'),
        es = ~rescaleSettings.indexOf('edgeSize');

    /**
     * First, we compute the scaling ratio, without considering the sizes
     * of the nodes : Each node will have its center in the canvas, but might
     * be partially out of it.
     */
    scale = settings('scalingMode') === 'outside' ?
      Math.max(
        w / Math.max(maxX - minX, 1),
        h / Math.max(maxY - minY, 1)
      ) :
      Math.min(
        w / Math.max(maxX - minX, 1),
        h / Math.max(maxY - minY, 1)
      );

    /**
     * Then, we correct that scaling ratio considering a margin, which is
     * basically the size of the biggest node.
     * This has to be done as a correction since to compare the size of the
     * biggest node to the X and Y values, we have to first get an
     * approximation of the scaling ratio.
     **/
    margin =
      (
        settings('rescaleIgnoreSize') ?
          0 :
          (settings('maxNodeSize') || sizeMax) / scale
      ) +
      (settings('sideMargin') || 0);
    maxX += margin;
    minX -= margin;
    maxY += margin;
    minY -= margin;

    // Fix the scaling with the new extrema:
    scale = settings('scalingMode') === 'outside' ?
      Math.max(
        w / Math.max(maxX - minX, 1),
        h / Math.max(maxY - minY, 1)
      ) :
      Math.min(
        w / Math.max(maxX - minX, 1),
        h / Math.max(maxY - minY, 1)
      );

    // Size homothetic parameters:
    if (!settings('maxNodeSize') && !settings('minNodeSize')) {
      a = 1;
      b = 0;
    } else if (settings('maxNodeSize') === settings('minNodeSize')) {
      a = 0;
      b = +settings('maxNodeSize');
    } else {
      a = (settings('maxNodeSize') - settings('minNodeSize')) / sizeMax;
      b = +settings('minNodeSize');
    }

    if (!settings('maxEdgeSize') && !settings('minEdgeSize')) {
      c = 1;
      d = 0;
    } else if (settings('maxEdgeSize') === settings('minEdgeSize')) {
      c = 0;
      d = +settings('minEdgeSize');
    } else {
      c = (settings('maxEdgeSize') - settings('minEdgeSize')) / weightMax;
      d = +settings('minEdgeSize');
    }

    // Rescale the nodes and edges:
    for (i = 0, l = e.length; i < l; i++)
      e[i][writePrefix + 'size'] =
        e[i][readPrefix + 'size'] * (es ? c : 1) + (es ? d : 0);

    for (i = 0, l = n.length; i < l; i++) {
      n[i][writePrefix + 'size'] =
        n[i][readPrefix + 'size'] * (ns ? a : 1) + (ns ? b : 0);
      n[i][writePrefix + 'x'] =
        (n[i][readPrefix + 'x'] - (maxX + minX) / 2) * (np ? scale : 1);
      n[i][writePrefix + 'y'] =
        (n[i][readPrefix + 'y'] - (maxY + minY) / 2) * (np ? scale : 1);
    }
  };

  sigma.utils.getBoundaries = function(graph, prefix, doEdges) {
    var i,
        l,
        e = graph.edges(),
        n = graph.nodes(),
        weightMax = -Infinity,
        sizeMax = -Infinity,
        minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    if (doEdges)
      for (i = 0, l = e.length; i < l; i++)
        weightMax = Math.max(e[i][prefix + 'size'], weightMax);

    for (i = 0, l = n.length; i < l; i++) {
      sizeMax = Math.max(n[i][prefix + 'size'], sizeMax);
      maxX = Math.max(n[i][prefix + 'x'], maxX);
      minX = Math.min(n[i][prefix + 'x'], minX);
      maxY = Math.max(n[i][prefix + 'y'], maxY);
      minY = Math.min(n[i][prefix + 'y'], minY);
    }

    weightMax = weightMax || 1;
    sizeMax = sizeMax || 1;

    return {
      weightMax: weightMax,
      sizeMax: sizeMax,
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY
    };
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.middlewares');

  /**
   * This middleware will just copy the graphic properties.
   *
   * @param {?string} readPrefix  The read prefix.
   * @param {?string} writePrefix The write prefix.
   */
  sigma.middlewares.copy = function(readPrefix, writePrefix) {
    var i,
        l,
        a;

    if (writePrefix + '' === readPrefix + '')
      return;

    a = this.graph.nodes();
    for (i = 0, l = a.length; i < l; i++) {
      a[i][writePrefix + 'x'] = a[i][readPrefix + 'x'];
      a[i][writePrefix + 'y'] = a[i][readPrefix + 'y'];
      a[i][writePrefix + 'size'] = a[i][readPrefix + 'size'];
    }

    a = this.graph.edges();
    for (i = 0, l = a.length; i < l; i++)
      a[i][writePrefix + 'size'] = a[i][readPrefix + 'size'];
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.misc.animation.running');

  /**
   * Generates a unique ID for the animation.
   *
   * @return {string} Returns the new ID.
   */
  var _getID = (function() {
    var id = 0;
    return function() {
      return '' + (++id);
    };
  })();

  /**
   * This function animates a camera. It has to be called with the camera to
   * animate, the values of the coordinates to reach and eventually some
   * options. It returns a number id, that you can use to kill the animation,
   * with the method sigma.misc.animation.kill(id).
   *
   * The available options are:
   *
   *   {?number}            duration   The duration of the animation.
   *   {?function}          onNewFrame A callback to execute when the animation
   *                                   enter a new frame.
   *   {?function}          onComplete A callback to execute when the animation
   *                                   is completed or killed.
   *   {?(string|function)} easing     The name of a function from the package
   *                                   sigma.utils.easings, or a custom easing
   *                                   function.
   *
   * @param  {camera}  camera  The camera to animate.
   * @param  {object}  target  The coordinates to reach.
   * @param  {?object} options Eventually an object to specify some options to
   *                           the function. The available options are
   *                           presented in the description of the function.
   * @return {number}          The animation id, to make it easy to kill
   *                           through the method "sigma.misc.animation.kill".
   */
  sigma.misc.animation.camera = function(camera, val, options) {
    if (
      !(camera instanceof sigma.classes.camera) ||
      typeof val !== 'object' ||
      !val
    )
      throw 'animation.camera: Wrong arguments.';

    if (
      typeof val.x !== 'number' &&
      typeof val.y !== 'number' &&
      typeof val.ratio !== 'number' &&
      typeof val.angle !== 'number'
    )
      throw 'There must be at least one valid coordinate in the given val.';

    var fn,
        id,
        anim,
        easing,
        duration,
        initialVal,
        o = options || {},
        start = sigma.utils.dateNow();

    // Store initial values:
    initialVal = {
      x: camera.x,
      y: camera.y,
      ratio: camera.ratio,
      angle: camera.angle
    };

    duration = o.duration;
    easing = typeof o.easing !== 'function' ?
      sigma.utils.easings[o.easing || 'quadraticInOut'] :
      o.easing;

    fn = function() {
      var coef,
          t = o.duration ? (sigma.utils.dateNow() - start) / o.duration : 1;

      // If the animation is over:
      if (t >= 1) {
        camera.isAnimated = false;
        camera.goTo({
          x: val.x !== undefined ? val.x : initialVal.x,
          y: val.y !== undefined ? val.y : initialVal.y,
          ratio: val.ratio !== undefined ? val.ratio : initialVal.ratio,
          angle: val.angle !== undefined ? val.angle : initialVal.angle
        });

        cancelAnimationFrame(id);
        delete sigma.misc.animation.running[id];

        // Check callbacks:
        if (typeof o.onComplete === 'function')
          o.onComplete();

      // Else, let's keep going:
      } else {
        coef = easing(t);
        camera.isAnimated = true;
        camera.goTo({
          x: val.x !== undefined ?
            initialVal.x + (val.x - initialVal.x) * coef :
            initialVal.x,
          y: val.y !== undefined ?
            initialVal.y + (val.y - initialVal.y) * coef :
            initialVal.y,
          ratio: val.ratio !== undefined ?
            initialVal.ratio + (val.ratio - initialVal.ratio) * coef :
            initialVal.ratio,
          angle: val.angle !== undefined ?
            initialVal.angle + (val.angle - initialVal.angle) * coef :
            initialVal.angle
        });

        // Check callbacks:
        if (typeof o.onNewFrame === 'function')
          o.onNewFrame();

        anim.frameId = requestAnimationFrame(fn);
      }
    };

    id = _getID();
    anim = {
      frameId: requestAnimationFrame(fn),
      target: camera,
      type: 'camera',
      options: o,
      fn: fn
    };
    sigma.misc.animation.running[id] = anim;

    return id;
  };

  /**
   * Kills a running animation. It triggers the eventual onComplete callback.
   *
   * @param  {number} id  The id of the animation to kill.
   * @return {object}     Returns the sigma.misc.animation package.
   */
  sigma.misc.animation.kill = function(id) {
    if (arguments.length !== 1 || typeof id !== 'number')
      throw 'animation.kill: Wrong arguments.';

    var o = sigma.misc.animation.running[id];

    if (o) {
      cancelAnimationFrame(id);
      delete sigma.misc.animation.running[o.frameId];

      if (o.type === 'camera')
        o.target.isAnimated = false;

      // Check callbacks:
      if (typeof (o.options || {}).onComplete === 'function')
        o.options.onComplete();
    }

    return this;
  };

  /**
   * Kills every running animations, or only the one with the specified type,
   * if a string parameter is given.
   *
   * @param  {?(string|object)} filter A string to filter the animations to kill
   *                                   on their type (example: "camera"), or an
   *                                   object to filter on their target.
   * @return {number}                  Returns the number of animations killed
   *                                   that way.
   */
  sigma.misc.animation.killAll = function(filter) {
    var o,
        id,
        count = 0,
        type = typeof filter === 'string' ? filter : null,
        target = typeof filter === 'object' ? filter : null,
        running = sigma.misc.animation.running;

    for (id in running)
      if (
        (!type || running[id].type === type) &&
        (!target || running[id].target === target)
      ) {
        o = sigma.misc.animation.running[id];
        cancelAnimationFrame(o.frameId);
        delete sigma.misc.animation.running[id];

        if (o.type === 'camera')
          o.target.isAnimated = false;

        // Increment counter:
        count++;

        // Check callbacks:
        if (typeof (o.options || {}).onComplete === 'function')
          o.options.onComplete();
      }

    return count;
  };

  /**
   * Returns "true" if any animation that is currently still running matches
   * the filter given to the function.
   *
   * @param  {string|object} filter A string to filter the animations to kill
   *                                on their type (example: "camera"), or an
   *                                object to filter on their target.
   * @return {boolean}              Returns true if any running animation
   *                                matches.
   */
  sigma.misc.animation.has = function(filter) {
    var id,
        type = typeof filter === 'string' ? filter : null,
        target = typeof filter === 'object' ? filter : null,
        running = sigma.misc.animation.running;

    for (id in running)
      if (
        (!type || running[id].type === type) &&
        (!target || running[id].target === target)
      )
        return true;

    return false;
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.misc');

  /**
   * This helper will bind any no-DOM renderer (for instance canvas or WebGL)
   * to its captors, to properly dispatch the good events to the sigma instance
   * to manage clicking, hovering etc...
   *
   * It has to be called in the scope of the related renderer.
   */
  sigma.misc.bindEvents = function(prefix) {
    var i,
        l,
        mX,
        mY,
        captor,
        self = this;

    function getNodes(e) {
      if (e) {
        mX = 'x' in e.data ? e.data.x : mX;
        mY = 'y' in e.data ? e.data.y : mY;
      }

      var i,
          j,
          l,
          n,
          x,
          y,
          s,
          inserted,
          selected = [],
          modifiedX = mX + self.width / 2,
          modifiedY = mY + self.height / 2,
          point = self.camera.cameraPosition(
            mX,
            mY
          ),
          nodes = self.camera.quadtree.point(
            point.x,
            point.y
          );

      if (nodes.length)
        for (i = 0, l = nodes.length; i < l; i++) {
          n = nodes[i];
          x = n[prefix + 'x'];
          y = n[prefix + 'y'];
          s = n[prefix + 'size'];

          if (
            !n.hidden &&
            modifiedX > x - s &&
            modifiedX < x + s &&
            modifiedY > y - s &&
            modifiedY < y + s &&
            Math.sqrt(
              Math.pow(modifiedX - x, 2) +
              Math.pow(modifiedY - y, 2)
            ) < s
          ) {
            // Insert the node:
            inserted = false;

            for (j = 0; j < selected.length; j++)
              if (n.size > selected[j].size) {
                selected.splice(j, 0, n);
                inserted = true;
                break;
              }

            if (!inserted)
              selected.push(n);
          }
        }

      return selected;
    }


    function getEdges(e) {
      if (!self.settings('enableEdgeHovering')) {
        // No event if the setting is off:
        return [];
      }

      var isCanvas = (
        sigma.renderers.canvas && self instanceof sigma.renderers.canvas);

      if (!isCanvas) {
        // A quick hardcoded rule to prevent people from using this feature
        // with the WebGL renderer (which is not good enough at the moment):
        throw new Error(
          'The edge events feature is not compatible with the WebGL renderer'
        );
      }

      if (e) {
        mX = 'x' in e.data ? e.data.x : mX;
        mY = 'y' in e.data ? e.data.y : mY;
      }

      var i,
          j,
          l,
          a,
          edge,
          s,
          maxEpsilon = self.settings('edgeHoverPrecision'),
          source,
          target,
          cp,
          nodeIndex = {},
          inserted,
          selected = [],
          modifiedX = mX + self.width / 2,
          modifiedY = mY + self.height / 2,
          point = self.camera.cameraPosition(
            mX,
            mY
          ),
          edges = [];

      if (isCanvas) {
        var nodesOnScreen = self.camera.quadtree.area(
          self.camera.getRectangle(self.width, self.height)
        );
        for (a = nodesOnScreen, i = 0, l = a.length; i < l; i++)
          nodeIndex[a[i].id] = a[i];
      }

      if (self.camera.edgequadtree !== undefined) {
        edges = self.camera.edgequadtree.point(
          point.x,
          point.y
        );
      }

      function insertEdge(selected, edge) {
        inserted = false;

        for (j = 0; j < selected.length; j++)
          if (edge.size > selected[j].size) {
            selected.splice(j, 0, edge);
            inserted = true;
            break;
          }

        if (!inserted)
          selected.push(edge);
      }

      if (edges.length)
        for (i = 0, l = edges.length; i < l; i++) {
          edge = edges[i];
          source = self.graph.nodes(edge.source);
          target = self.graph.nodes(edge.target);
          // (HACK) we can't get edge[prefix + 'size'] on WebGL renderer:
          s = edge[prefix + 'size'] ||
              edge['read_' + prefix + 'size'];

          // First, let's identify which edges are drawn. To do this, we keep
          // every edges that have at least one extremity displayed according to
          // the quadtree and the "hidden" attribute. We also do not keep hidden
          // edges.
          // Then, let's check if the mouse is on the edge (we suppose that it
          // is a line segment).

          if (
            !edge.hidden &&
            !source.hidden && !target.hidden &&
            (!isCanvas ||
              (nodeIndex[edge.source] || nodeIndex[edge.target])) &&
            sigma.utils.getDistance(
              source[prefix + 'x'],
              source[prefix + 'y'],
              modifiedX,
              modifiedY) > source[prefix + 'size'] &&
            sigma.utils.getDistance(
              target[prefix + 'x'],
              target[prefix + 'y'],
              modifiedX,
              modifiedY) > target[prefix + 'size']
          ) {
            if (edge.type == 'curve' || edge.type == 'curvedArrow') {
              if (source.id === target.id) {
                cp = sigma.utils.getSelfLoopControlPoints(
                  source[prefix + 'x'],
                  source[prefix + 'y'],
                  source[prefix + 'size']
                );
                if (
                  sigma.utils.isPointOnBezierCurve(
                  modifiedX,
                  modifiedY,
                  source[prefix + 'x'],
                  source[prefix + 'y'],
                  target[prefix + 'x'],
                  target[prefix + 'y'],
                  cp.x1,
                  cp.y1,
                  cp.x2,
                  cp.y2,
                  Math.max(s, maxEpsilon)
                )) {
                  insertEdge(selected, edge);
                }
              }
              else {
                cp = sigma.utils.getQuadraticControlPoint(
                  source[prefix + 'x'],
                  source[prefix + 'y'],
                  target[prefix + 'x'],
                  target[prefix + 'y']);
                if (
                  sigma.utils.isPointOnQuadraticCurve(
                  modifiedX,
                  modifiedY,
                  source[prefix + 'x'],
                  source[prefix + 'y'],
                  target[prefix + 'x'],
                  target[prefix + 'y'],
                  cp.x,
                  cp.y,
                  Math.max(s, maxEpsilon)
                )) {
                  insertEdge(selected, edge);
                }
              }
            } else if (
                sigma.utils.isPointOnSegment(
                modifiedX,
                modifiedY,
                source[prefix + 'x'],
                source[prefix + 'y'],
                target[prefix + 'x'],
                target[prefix + 'y'],
                Math.max(s, maxEpsilon)
              )) {
              insertEdge(selected, edge);
            }
          }
        }

      return selected;
    }


    function bindCaptor(captor) {
      var nodes,
          edges,
          overNodes = {},
          overEdges = {};

      function onClick(e) {
        if (!self.settings('eventsEnabled'))
          return;

        self.dispatchEvent('click', e.data);

        nodes = getNodes(e);
        edges = getEdges(e);

        if (nodes.length) {
          self.dispatchEvent('clickNode', {
            node: nodes[0],
            captor: e.data
          });
          self.dispatchEvent('clickNodes', {
            node: nodes,
            captor: e.data
          });
        } else if (edges.length) {
          self.dispatchEvent('clickEdge', {
            edge: edges[0],
            captor: e.data
          });
          self.dispatchEvent('clickEdges', {
            edge: edges,
            captor: e.data
          });
        } else
          self.dispatchEvent('clickStage', {captor: e.data});
      }

      function onDoubleClick(e) {
        if (!self.settings('eventsEnabled'))
          return;

        self.dispatchEvent('doubleClick', e.data);

        nodes = getNodes(e);
        edges = getEdges(e);

        if (nodes.length) {
          self.dispatchEvent('doubleClickNode', {
            node: nodes[0],
            captor: e.data
          });
          self.dispatchEvent('doubleClickNodes', {
            node: nodes,
            captor: e.data
          });
        } else if (edges.length) {
          self.dispatchEvent('doubleClickEdge', {
            edge: edges[0],
            captor: e.data
          });
          self.dispatchEvent('doubleClickEdges', {
            edge: edges,
            captor: e.data
          });
        } else
          self.dispatchEvent('doubleClickStage', {captor: e.data});
      }

      function onRightClick(e) {
        if (!self.settings('eventsEnabled'))
          return;

        self.dispatchEvent('rightClick', e.data);

        nodes = getNodes(e);
        edges = getEdges(e);

        if (nodes.length) {
          self.dispatchEvent('rightClickNode', {
            node: nodes[0],
            captor: e.data
          });
          self.dispatchEvent('rightClickNodes', {
            node: nodes,
            captor: e.data
          });
        } else if (edges.length) {
          self.dispatchEvent('rightClickEdge', {
            edge: edges[0],
            captor: e.data
          });
          self.dispatchEvent('rightClickEdges', {
            edge: edges,
            captor: e.data
          });
        } else
          self.dispatchEvent('rightClickStage', {captor: e.data});
      }

      function onOut(e) {
        if (!self.settings('eventsEnabled'))
          return;

        var k,
            i,
            l,
            le,
            outNodes = [],
            outEdges = [];

        for (k in overNodes)
          outNodes.push(overNodes[k]);

        overNodes = {};
        // Dispatch both single and multi events:
        for (i = 0, l = outNodes.length; i < l; i++)
          self.dispatchEvent('outNode', {
            node: outNodes[i],
            captor: e.data
          });
        if (outNodes.length)
          self.dispatchEvent('outNodes', {
            nodes: outNodes,
            captor: e.data
          });

        overEdges = {};
        // Dispatch both single and multi events:
        for (i = 0, le = outEdges.length; i < le; i++)
          self.dispatchEvent('outEdge', {
            edge: outEdges[i],
            captor: e.data
          });
        if (outEdges.length)
          self.dispatchEvent('outEdges', {
            edges: outEdges,
            captor: e.data
          });
      }

      function onMove(e) {
        if (!self.settings('eventsEnabled'))
          return;

        nodes = getNodes(e);
        edges = getEdges(e);

        var i,
            k,
            node,
            edge,
            newOutNodes = [],
            newOverNodes = [],
            currentOverNodes = {},
            l = nodes.length,
            newOutEdges = [],
            newOverEdges = [],
            currentOverEdges = {},
            le = edges.length;

        // Check newly overred nodes:
        for (i = 0; i < l; i++) {
          node = nodes[i];
          currentOverNodes[node.id] = node;
          if (!overNodes[node.id]) {
            newOverNodes.push(node);
            overNodes[node.id] = node;
          }
        }

        // Check no more overred nodes:
        for (k in overNodes)
          if (!currentOverNodes[k]) {
            newOutNodes.push(overNodes[k]);
            delete overNodes[k];
          }

        // Dispatch both single and multi events:
        for (i = 0, l = newOverNodes.length; i < l; i++)
          self.dispatchEvent('overNode', {
            node: newOverNodes[i],
            captor: e.data
          });
        for (i = 0, l = newOutNodes.length; i < l; i++)
          self.dispatchEvent('outNode', {
            node: newOutNodes[i],
            captor: e.data
          });
        if (newOverNodes.length)
          self.dispatchEvent('overNodes', {
            nodes: newOverNodes,
            captor: e.data
          });
        if (newOutNodes.length)
          self.dispatchEvent('outNodes', {
            nodes: newOutNodes,
            captor: e.data
          });

        // Check newly overred edges:
        for (i = 0; i < le; i++) {
          edge = edges[i];
          currentOverEdges[edge.id] = edge;
          if (!overEdges[edge.id]) {
            newOverEdges.push(edge);
            overEdges[edge.id] = edge;
          }
        }

        // Check no more overred edges:
        for (k in overEdges)
          if (!currentOverEdges[k]) {
            newOutEdges.push(overEdges[k]);
            delete overEdges[k];
          }

        // Dispatch both single and multi events:
        for (i = 0, le = newOverEdges.length; i < le; i++)
          self.dispatchEvent('overEdge', {
            edge: newOverEdges[i],
            captor: e.data
          });
        for (i = 0, le = newOutEdges.length; i < le; i++)
          self.dispatchEvent('outEdge', {
            edge: newOutEdges[i],
            captor: e.data
          });
        if (newOverEdges.length)
          self.dispatchEvent('overEdges', {
            edges: newOverEdges,
            captor: e.data
          });
        if (newOutEdges.length)
          self.dispatchEvent('outEdges', {
            edges: newOutEdges,
            captor: e.data
          });
      }

      // Bind events:
      captor.bind('click', onClick);
      captor.bind('mousedown', onMove);
      captor.bind('mouseup', onMove);
      captor.bind('mousemove', onMove);
      captor.bind('mouseout', onOut);
      captor.bind('doubleclick', onDoubleClick);
      captor.bind('rightclick', onRightClick);
      self.bind('render', onMove);
    }

    for (i = 0, l = this.captors.length; i < l; i++)
      bindCaptor(this.captors[i]);
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.misc');

  /**
   * This helper will bind any DOM renderer (for instance svg)
   * to its captors, to properly dispatch the good events to the sigma instance
   * to manage clicking, hovering etc...
   *
   * It has to be called in the scope of the related renderer.
   */
  sigma.misc.bindDOMEvents = function(container) {
    var self = this,
        graph = this.graph;

    // DOMElement abstraction
    function Element(domElement) {

      // Helpers
      this.attr = function(attrName) {
        return domElement.getAttributeNS(null, attrName);
      };

      // Properties
      this.tag = domElement.tagName;
      this.class = this.attr('class');
      this.id = this.attr('id');

      // Methods
      this.isNode = function() {
        return !!~this.class.indexOf(self.settings('classPrefix') + '-node');
      };

      this.isEdge = function() {
        return !!~this.class.indexOf(self.settings('classPrefix') + '-edge');
      };

      this.isHover = function() {
        return !!~this.class.indexOf(self.settings('classPrefix') + '-hover');
      };
    }

    // Click
    function click(e) {
      if (!self.settings('eventsEnabled'))
        return;

      // Generic event
      self.dispatchEvent('click', e);

      // Are we on a node?
      var element = new Element(e.target);

      if (element.isNode())
        self.dispatchEvent('clickNode', {
          node: graph.nodes(element.attr('data-node-id'))
        });
      else
        self.dispatchEvent('clickStage');

      e.preventDefault();
      e.stopPropagation();
    }

    // Double click
    function doubleClick(e) {
      if (!self.settings('eventsEnabled'))
        return;

      // Generic event
      self.dispatchEvent('doubleClick', e);

      // Are we on a node?
      var element = new Element(e.target);

      if (element.isNode())
        self.dispatchEvent('doubleClickNode', {
          node: graph.nodes(element.attr('data-node-id'))
        });
      else
        self.dispatchEvent('doubleClickStage');

      e.preventDefault();
      e.stopPropagation();
    }

    // On over
    function onOver(e) {
      var target = e.toElement || e.target;

      if (!self.settings('eventsEnabled') || !target)
        return;

      var el = new Element(target);

      if (el.isNode()) {
        self.dispatchEvent('overNode', {
          node: graph.nodes(el.attr('data-node-id'))
        });
      }
      else if (el.isEdge()) {
        var edge = graph.edges(el.attr('data-edge-id'));
        self.dispatchEvent('overEdge', {
          edge: edge,
          source: graph.nodes(edge.source),
          target: graph.nodes(edge.target)
        });
      }
    }

    // On out
    function onOut(e) {
      var target = e.fromElement || e.originalTarget;

      if (!self.settings('eventsEnabled'))
        return;

      var el = new Element(target);

      if (el.isNode()) {
        self.dispatchEvent('outNode', {
          node: graph.nodes(el.attr('data-node-id'))
        });
      }
      else if (el.isEdge()) {
        var edge = graph.edges(el.attr('data-edge-id'));
        self.dispatchEvent('outEdge', {
          edge: edge,
          source: graph.nodes(edge.source),
          target: graph.nodes(edge.target)
        });
      }
    }

    // Registering Events:

    // Click
    container.addEventListener('click', click, false);
    sigma.utils.doubleClick(container, 'click', doubleClick);

    // Touch counterparts
    container.addEventListener('touchstart', click, false);
    sigma.utils.doubleClick(container, 'touchstart', doubleClick);

    // Mouseover
    container.addEventListener('mouseover', onOver, true);

    // Mouseout
    container.addEventListener('mouseout', onOut, true);
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.misc');

  /**
   * This method listens to "overNode", "outNode", "overEdge" and "outEdge"
   * events from a renderer and renders the nodes differently on the top layer.
   * The goal is to make any node label readable with the mouse, and to
   * highlight hovered nodes and edges.
   *
   * It has to be called in the scope of the related renderer.
   */
  sigma.misc.drawHovers = function(prefix) {
    var self = this,
        hoveredNodes = {},
        hoveredEdges = {};

    this.bind('overNode', function(event) {
      var node = event.data.node;
      if (!node.hidden) {
        hoveredNodes[node.id] = node;
        draw();
      }
    });

    this.bind('outNode', function(event) {
      delete hoveredNodes[event.data.node.id];
      draw();
    });

    this.bind('overEdge', function(event) {
      var edge = event.data.edge;
      if (!edge.hidden) {
        hoveredEdges[edge.id] = edge;
        draw();
      }
    });

    this.bind('outEdge', function(event) {
      delete hoveredEdges[event.data.edge.id];
      draw();
    });

    this.bind('render', function(event) {
      draw();
    });

    function draw() {

      var k,
          source,
          target,
          hoveredNode,
          hoveredEdge,
          c = self.contexts.hover.canvas,
          defaultNodeType = self.settings('defaultNodeType'),
          defaultEdgeType = self.settings('defaultEdgeType'),
          nodeRenderers = sigma.canvas.hovers,
          edgeRenderers = sigma.canvas.edgehovers,
          extremitiesRenderers = sigma.canvas.extremities,
          embedSettings = self.settings.embedObjects({
            prefix: prefix
          });

      // Clear self.contexts.hover:
      self.contexts.hover.clearRect(0, 0, c.width, c.height);

      // Node render: single hover
      if (
        embedSettings('enableHovering') &&
        embedSettings('singleHover') &&
        Object.keys(hoveredNodes).length
      ) {
        hoveredNode = hoveredNodes[Object.keys(hoveredNodes)[0]];
        (
          nodeRenderers[hoveredNode.type] ||
          nodeRenderers[defaultNodeType] ||
          nodeRenderers.def
        )(
          hoveredNode,
          self.contexts.hover,
          embedSettings
        );
      }

      // Node render: multiple hover
      if (
        embedSettings('enableHovering') &&
        !embedSettings('singleHover')
      )
        for (k in hoveredNodes)
          (
            nodeRenderers[hoveredNodes[k].type] ||
            nodeRenderers[defaultNodeType] ||
            nodeRenderers.def
          )(
            hoveredNodes[k],
            self.contexts.hover,
            embedSettings
          );

      // Edge render: single hover
      if (
        embedSettings('enableEdgeHovering') &&
        embedSettings('singleHover') &&
        Object.keys(hoveredEdges).length
      ) {
        hoveredEdge = hoveredEdges[Object.keys(hoveredEdges)[0]];
        source = self.graph.nodes(hoveredEdge.source);
        target = self.graph.nodes(hoveredEdge.target);

        if (! hoveredEdge.hidden) {
          (
            edgeRenderers[hoveredEdge.type] ||
            edgeRenderers[defaultEdgeType] ||
            edgeRenderers.def
          ) (
            hoveredEdge,
            source,
            target,
            self.contexts.hover,
            embedSettings
          );

          if (embedSettings('edgeHoverExtremities')) {
            (
              extremitiesRenderers[hoveredEdge.type] ||
              extremitiesRenderers.def
            )(
              hoveredEdge,
              source,
              target,
              self.contexts.hover,
              embedSettings
            );

          } else {
            // Avoid edges rendered over nodes:
            (
              sigma.canvas.nodes[source.type] ||
              sigma.canvas.nodes.def
            ) (
              source,
              self.contexts.hover,
              embedSettings
            );
            (
              sigma.canvas.nodes[target.type] ||
              sigma.canvas.nodes.def
            ) (
              target,
              self.contexts.hover,
              embedSettings
            );
          }
        }
      }

      // Edge render: multiple hover
      if (
        embedSettings('enableEdgeHovering') &&
        !embedSettings('singleHover')
      ) {
        for (k in hoveredEdges) {
          hoveredEdge = hoveredEdges[k];
          source = self.graph.nodes(hoveredEdge.source);
          target = self.graph.nodes(hoveredEdge.target);

          if (!hoveredEdge.hidden) {
            (
              edgeRenderers[hoveredEdge.type] ||
              edgeRenderers[defaultEdgeType] ||
              edgeRenderers.def
            ) (
              hoveredEdge,
              source,
              target,
              self.contexts.hover,
              embedSettings
            );

            if (embedSettings('edgeHoverExtremities')) {
              (
                extremitiesRenderers[hoveredEdge.type] ||
                extremitiesRenderers.def
              )(
                hoveredEdge,
                source,
                target,
                self.contexts.hover,
                embedSettings
              );
            } else {
              // Avoid edges rendered over nodes:
              (
                sigma.canvas.nodes[source.type] ||
                sigma.canvas.nodes.def
              ) (
                source,
                self.contexts.hover,
                embedSettings
              );
              (
                sigma.canvas.nodes[target.type] ||
                sigma.canvas.nodes.def
              ) (
                target,
                self.contexts.hover,
                embedSettings
              );
            }
          }
        }
      }
    }
  };
}).call(this);

},{}],3:[function(require,module,exports){
window.$ = require('jquery');
window.sigma = require("sigma");

let sig;

$(() => {
	console.log("loaded");
	$.getJSON("data/data.json", (g) => {
		sig = new sigma({
			container: 'graph-container',
			graph: g,
			settings: {
				autoRescale: false
			}
		});

		let info = $('#artist-list');
		for (let n of g.nodes) {
			let artist = $(`<div class="artist"><a href="#${n.id}">${n.label}</a> <a href="https://www.youtube.com/results?search_query=${n.label}" target="_blank">(youtube)</a></div>`)
			info.append(artist);
		}

		sig.camera.goTo({
			"x": 640,
			"y": 360,
			"ratio": 1.0
		});
	});
});

window.onhashchange = () => {
	let hash = location.hash;
	hash = hash.substring(1);
	console.log(hash);
	let g = sig.graph;
	let camera = sig.camera;
	console.log(camera);
	for (let n of g.nodes()) {
		if (n.id == hash) {
			console.log('found', n);
			camera.goTo({
				"x": n.x,
				"y": n.y
			});
			// sigma.utils.zoomTo(camera, n.x, n.y, 0.8);
			sig.refresh();
			break;
		}
	}
};
},{"jquery":1,"sigma":2}]},{},[3])

//# sourceMappingURL=app.js.map
