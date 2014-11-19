/*
 * @License Apache License, Version 2.0 Copyright 2014 the original author or authors.
 * @author Greg Turnquist
 */
(function(define) { 'use strict';
	define(function() {

		return {
			// Take an href and wrap it properly for a HAL link
			createLink: function (rel, href) {
				var wrapping = {};
				wrapping[rel] = { href: href };
				return wrapping;
			},
			createSelfLink: function (href) {
				return this.createLink('self', href);
			}
		};

	});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));
