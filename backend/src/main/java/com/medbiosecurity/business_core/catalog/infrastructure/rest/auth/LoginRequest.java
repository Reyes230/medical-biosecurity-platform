package com.medbiosecurity.business_core.catalog.infrastructure.rest.auth;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "La clave de seguridad es obligatoria")
        String password
) {}