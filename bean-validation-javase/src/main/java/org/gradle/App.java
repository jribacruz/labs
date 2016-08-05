package org.gradle;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

public class App {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Foo foo = new Foo();
		ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		Validator validator = factory.getValidator();
		Set<ConstraintViolation<Foo>> violations = validator.validate(foo);

		violations.forEach(p -> System.out.println(p.getMessage()));
	}

}
