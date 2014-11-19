/*
 * @License Apache License, Version 2.0 Copyright 2014 the original author or authors.
 *
 * Convenient JavaScript library to communicate with a Spring Data REST backend.
 * Pre-configures rest.js with HAL and HATEOAS support so you don't have to.
 *
 * sdr is part of Spring Data REST (http://projects.spring.io/spring-data-rest)
 *
 * @author Greg Turnquist
 */

(function(define) { 'use strict';
	define(function(require) {

		var follow = require('./lib/follow');
		var halHelper = require('./lib/halHelper');
		var restInvoker = require('./lib/restInvoker');

		// Public API
		return {
			follow: follow,
			restInvoker: restInvoker,
			halHelper : halHelper
		}

	});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));