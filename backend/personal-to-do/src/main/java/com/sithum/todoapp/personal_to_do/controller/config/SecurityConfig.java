package com.sithum.todoapp.personal_to_do.controller.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import com.sithum.todoapp.personal_to_do.service.OAuth2UserService; // Add this import

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/login", "/oauth2/**", "/error").permitAll()
                        .requestMatchers(HttpMethod.GET, "/tasks", "/users").permitAll()
                        .requestMatchers(HttpMethod.POST, "/tasks", "/users").authenticated()
                        .anyRequest().authenticated())
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(oAuth2UserService()))
                        .defaultSuccessUrl("/tasks", true))
                .logout(logout -> logout
                        .logoutSuccessUrl("/")
                        .permitAll());
    }

    @Bean
    public OAuth2UserService oAuth2UserService() {
        return new OAuth2UserService();
    }
}