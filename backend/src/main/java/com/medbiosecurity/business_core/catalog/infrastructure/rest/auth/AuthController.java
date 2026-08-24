package com.medbiosecurity.business_core.catalog.infrastructure.rest.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Value("${security.admin.secret-key}")
    private String adminSecretKey;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.password() != null && request.password().equals(adminSecretKey)) {
            return ResponseEntity.ok(new LoginResponse(true, adminSecretKey));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Credenciales administrativas inválidas"));
    }
}