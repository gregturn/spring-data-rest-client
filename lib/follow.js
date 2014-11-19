/*
 * @License Apache License, Version 2.0 Copyright 2014 the original author or authors.
 * @author Greg Turnquist
 */
(function(define) { 'use strict';
	define(function(require) {

		var restInvoker = require('./restInvoker');

		return function follow(rootPath, relArray) {
			var root = restInvoker({
				method: 'GET',
				path: rootPath
			});

			return relArray.reduce(function(root, arrayItem) {
				var rel = typeof arrayItem === 'string' ? arrayItem : arrayItem.rel;
				return traverseNext(root, rel, arrayItem);
			}, root);

			function traverseNext (root, rel, arrayItem) {
				return root.then(function (response) {
					if (hasEmbeddedRel(response.entity, rel)) {
						return response.entity._embedded[rel];
					}

					if(!response.entity._links) {
						return [];
					}

					if (typeof arrayItem === 'string') {
						return restInvoker({
							method: 'GET',
							path: response.entity._links[rel].href
						});
					} else {
						return restInvoker({
							method: 'GET',
							path: response.entity._links[rel].href,
							params: arrayItem.params
						});
					}
				});
			}

			function hasEmbeddedRel (entity, rel) {
				return entity._embedded && entity._embedded.hasOwnProperty(rel);
			}
		};

	});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
