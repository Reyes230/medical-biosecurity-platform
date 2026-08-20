package com.medbiosecurity.business_core.catalog.infrastructure.rest.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AdminSecurityInterceptor implements HandlerInterceptor {

    @Value("${security.admin.secret-key}")
    private String adminSecretKey;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Permitir OPTIONS (CORS preflight) y solicitudes públicas de lectura (GET)
        if (HttpMethod.OPTIONS.matches(request.getMethod()) || HttpMethod.GET.matches(request.getMethod())) {
            return true;
        }

        // Validar cabecera en operaciones de mutación (POST, PUT, DELETE)
        String clientKey = request.getHeader("X-Admin-Key");
        if (clientKey == null || !clientKey.equals(adminSecretKey)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"error\": \"Acceso no autorizado: Se requiere clave administrativa válida\"}");
            return false;
        }

        return true;
    }
}