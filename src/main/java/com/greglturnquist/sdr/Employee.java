package com.greglturnquist.sdr;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@RequiredArgsConstructor
public class Employee {

	@Id @GeneratedValue
	private Long id;

	private final String firstName, lastName, title;

	private Employee() {
		this.firstName = null;
		this.lastName = null;
		this.title = null;
	}

}
