/*
 * @License Apache License, Version 2.0 Copyright 2014 the original author or authors.
 * @author Greg Turnquist
 */
(function(define) { 'use strict';
	define(function(require) {

		var interceptor = require('rest/interceptor');

		return interceptor({
			request: function (request /*, config, meta */) {
				/* If the URI is a URI Template per RFC 6570 (http://tools.ietf.org/html/rfc6570), trim out the template part */
				if (request.path.indexOf('{') === -1) {
					return request;
				} else {
					request.path = request.path.split('{')[0];
					return request;
				}
			}
		});

	});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
