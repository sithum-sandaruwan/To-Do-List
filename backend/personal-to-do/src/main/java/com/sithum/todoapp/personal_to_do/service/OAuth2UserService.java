package com.sithum.todoapp.personal_to_do.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.sithum.todoapp.personal_to_do.UserRepository;
import com.sithum.todoapp.personal_to_do.entity.User;

@Service
public class OAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepo;

    @Autowired
    public OAuth2UserService(UserRepository userRepository) {
        this.userRepo = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {

        try {
            OAuth2User auth2User = super.loadUser(userRequest);

            String email = auth2User.getAttribute("email");
            String name = auth2User.getAttribute("name");
            String serviceProvider = userRequest.getClientRegistration().getRegistrationId();
            String serviceProviderId = auth2User.getAttribute("sub");

            Optional<User> userOptional = userRepo.findByEmail(email);

            User user = userOptional.orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setName(name);
                newUser.setServiceProvider(serviceProvider);
                newUser.setServiceProviderId(serviceProviderId);
                return userRepo.save(newUser);
            });

            return auth2User;

        } catch (Exception e) {
            throw new RuntimeException("OAuth2 login failed", e);
        }

    }
}
