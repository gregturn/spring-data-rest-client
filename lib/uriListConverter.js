/*
 * @License Apache License, Version 2.0 Copyright 2014 the original author or authors.
 * @author Greg Turnquist
 */
(function(define) { 'use strict';
	define(function(require) {

		return {
			/* Parse a text/uri-list string into an array of URIs */
			read: function(str /*, opts */) {
				if (str === null) {
					return [];
				}
				return str.split('\n');
			},
			/* Convert a single or array of resources into "URI1\nURI2\nURI3..." */
			write: function(obj /*, opts */) {
				if (obj == null) {
					return '';
					// If this is an Array, extract the self URI and then join using a newline
				} else if (obj instanceof Array) {
					return obj.map(function(resource) {
						return resource._links.self.href;
					}).join('\n');
				} else { // otherwise, just return the self URI
					try {
						return obj._links.self.href;
					} catch (e) {
						throw new Error('obj is not a HAL-based object');
					}
				}
			}
		};

	});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
