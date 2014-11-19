/*
 * @License Apache License, Version 2.0 Copyright 2014 the original author or authors.
 * @author Greg Turnquist
 */
require('should');

var uriListConverter = require('../lib/uriListConverter');

// Test data
var order1 = {
	"orderNumber": "1234",
	"_links": {
		"self": {
			"href": "http://example.com/orders/1",
			"templated": "true"
		},
		"customer": {
			"href": "http://example.com/orders/1/customer",
			"templated": "true"
		}
	}
};

var order2 = {
	"orderNumber": "5678",
	"_links": {
		"self": {
			"href": "http://example.com/orders/2",
			"templated": "true"
		},
		"customer": {
			"href": "http://example.com/orders/2/customer",
			"templated": "true"
		}
	}
};


describe('UriListConverter', function() {

	describe('#read()', function() {
		it('should return empty array when fed null', function() {

			uriListConverter.read(null)
				.should.be.an.Array
				.and.eql([])
				.and.have.lengthOf(0);
		})
		it('should return single-entry array when fed empty string', function() {

			uriListConverter.read("")
				.should.be.an.Array
				.and.eql([''])
				.and.have.lengthOf(1);
		})
		it('should return single-entry array when fed string with no newlines', function() {

			uriListConverter.read("no new lines here")
				.should.be.an.Array
				.and.eql(['no new lines here'])
				.and.have.lengthOf(1);
		})
		it('should return array of URIs when fed \\n-concatenated string', function() {

			uriListConverter.read('a\nb\nc')
				.should.be.an.Array
				.and.eql(['a', 'b', 'c'])
				.and.have.lengthOf(3);
		})
	})

	describe('#write()', function() {
		it('should return empty string when fed null', function() {

			uriListConverter.write(null)
				.should.be.a.String
				.and.eql('');
		})
		it('should return empty string when fed empty array', function() {

			uriListConverter.write([])
				.should.be.a.String
				.and.eql('');
		})
		it('should throw a descriptive error when fed string', function() {

			(function() {
				uriListConverter.write("We don't handle plain strings");
			}).should.throw("obj is not a HAL-based object");
		})
		it('should return simple string when fed single-entry array', function() {

			uriListConverter.write([order1])
				.should.be.a.String
				.and.eql(order1._links.self.href);
		})
		it('should return a properly formed string when fed multi-URI array', function() {

			uriListConverter.write([order1, order2])
				.should.be.a.String
				.and.eql(order1._links.self.href + '\n' + order2._links.self.href);
		})
	})

})
