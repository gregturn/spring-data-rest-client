/*
 * @License Apache License, Version 2.0 Copyright 2014 the original author or authors.
 * @author Greg Turnquist
 */
require('should');

var halHelper = require('../lib/halHelper');

describe('HalHelper', function() {

	describe('#createLink()', function() {
		it('should return empty object for null', function() {
			var wrappedObj = halHelper.createLink('orders', null);
			wrappedObj.should.have.property('orders');
			wrappedObj.orders.should.have.property('href', null);
		})
		it('should return empty object for empty string', function() {
			var wrappedObj = halHelper.createLink('orders', '');
			wrappedObj.should.have.property('orders');
			wrappedObj.orders.should.have.property('href', '');
		})
		it('should return nicely nested object for href', function() {
			var wrappedObj = halHelper.createLink('orders', 'http://example.com/orders/1');
			wrappedObj.should.have.property('orders');
			wrappedObj.orders.should.have.property('href', 'http://example.com/orders/1');
		})
	})

	describe('#createSelfLink()', function() {
		it('should return empty object for null', function() {
			var wrappedObj = halHelper.createSelfLink(null);
			wrappedObj.should.have.property('self');
			wrappedObj.self.should.have.property('href', null);
		})
		it('should return empty object for empty string', function() {
			var wrappedObj = halHelper.createSelfLink('');
			wrappedObj.should.have.property('self');
			wrappedObj.self.should.have.property('href', '');
		})
		it('should return nicely nested object for href', function() {
			var wrappedObj = halHelper.createSelfLink('http://example.com/orders/1');
			wrappedObj.should.have.property('self');
			wrappedObj.self.should.have.property('href', 'http://example.com/orders/1');
		})
	})

})
