package com.medbiosecurity.business_core.catalog.infrastructure.rest.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final AdminSecurityInterceptor adminSecurityInterceptor;
    private final String[] allowedOrigins;

    public WebMvcConfig(
            AdminSecurityInterceptor adminSecurityInterceptor,
            @Value("${cors.allowed-origins:http://localhost:5173}") String[] allowedOrigins
    ) {
        this.adminSecurityInterceptor = adminSecurityInterceptor;
        this.allowedOrigins = allowedOrigins;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(adminSecurityInterceptor)
                .addPathPatterns("/api/v1/products/**");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("X-Admin-Key");
    }
}