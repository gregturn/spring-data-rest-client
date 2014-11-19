/*
 * @License Apache License, Version 2.0 Copyright 2014 the original author or authors.
 * @author Greg Turnquist
 */
require('should');

var sdr = require('../sdr');

var rootUri = 'http://rest-app-in-five-minutes.cfapps.io';

describe('SpringDataREST', function() {

	describe('#restInvoker()', function() {
		it('should fetch SDR-based data by hopping node to node', function() {
			return sdr.restInvoker({method: 'GET', path: rootUri})
				.then(function(response) {

					response.status.code.should.equal(200);
					response.headers['Content-Type'].should.equal('application/hal+json');

					return sdr.restInvoker({method: 'GET', path: response.entity._links.employees.href});

				}).then(function(response) {

					response.status.code.should.equal(200);
					response.headers['Content-Type'].should.equal('application/hal+json');

					var employees = response.entity._embedded.employees;

					employees
						.should.be.an.Array
						.and.have.lengthOf(1);

					var employee = employees[0];

					employee.firstName.should.equal('Bilbo');
					employee.lastName.should.equal('Baggins');
					employee.title.should.equal('thief');
					employee._links
						.should.be.an.Object
						.and.have.property('self');
				})
		})
	})

	describe('#follow()', function() {
		it('should fetch SDR-based data using a chain of rels', function() {
			return sdr.follow(rootUri, ['employees', 'employees'])
				.then(function(employees) {

					employees.should.be.an.Array;
					employees.should.have.lengthOf(1);
					employees[0].firstName.should.equal('Bilbo');
					employees[0].lastName.should.equal('Baggins');
					employees[0].title.should.equal('thief');
					employees[0]._links
						.should.be.an.Object
						.and.have.property('self');
				})
		})
	})

})
