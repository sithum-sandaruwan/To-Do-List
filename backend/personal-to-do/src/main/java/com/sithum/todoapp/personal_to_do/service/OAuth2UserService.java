package com.sithum.todoapp.personal_to_do.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
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

    public OAuth2UserService() {
        this.userRepo = null;
        // TODO Auto-generated constructor stub
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        try {
            OAuth2User oAuth2User = super.loadUser(userRequest);

            Map<String, Object> attributes = oAuth2User.getAttributes();
            String email = (String) attributes.get("email");
            String name = (String) attributes.get("name");
            String serviceProvider = userRequest.getClientRegistration().getRegistrationId();
            String serviceProviderId = (String) attributes.get("sub");

            Optional<User> userOptional = userRepo.findByEmail(email);

            User user = userOptional.orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setName(name);
                newUser.setServiceProvider(serviceProvider);
                newUser.setServiceProviderId(serviceProviderId);
                return userRepo.save(newUser);
            });

            // Create a copy of the attributes and add your user ID
            Map<String, Object> newAttributes = new HashMap<>(attributes);
            newAttributes.put("userId", user.getId());

            return new DefaultOAuth2User(
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                    newAttributes,
                    "name" // This is the name attribute key
            );

        } catch (Exception e) {
            throw new OAuth2AuthenticationException(null, "OAuth2 login failed", e);
        }
    }
}