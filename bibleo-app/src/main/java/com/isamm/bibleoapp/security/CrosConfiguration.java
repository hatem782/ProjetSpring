package com.isamm.bibleoapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CrosConfiguration {

    // Configuration CORS personnalisée pour autoriser les requêtes depuis n'importe quelle origine
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")// Toutes les URL de l'application
                        .allowedOriginPatterns("*") // Allow any origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE")// Autoriser ces méthodes HTTP
                        .allowedHeaders("*")// Autoriser tous les en-têtes
                        .allowCredentials(true);// Autoriser les informations d'identification dans les requêtes
            }
        };
    }
}
