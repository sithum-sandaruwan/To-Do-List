package com.sithum.todoapp.personal_to_do;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;

@SpringBootApplication
public class PersonalToDoApplication {

	public static void main(String[] args) {
		SpringApplication.run(PersonalToDoApplication.class, args);
	}

}
