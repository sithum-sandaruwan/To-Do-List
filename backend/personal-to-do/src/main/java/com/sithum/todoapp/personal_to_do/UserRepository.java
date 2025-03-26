package com.sithum.todoapp.personal_to_do;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sithum.todoapp.personal_to_do.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    User findByServiceProviderAndfindByServiceProviderId(String serviceProvider, String serviceProviderId);
}
