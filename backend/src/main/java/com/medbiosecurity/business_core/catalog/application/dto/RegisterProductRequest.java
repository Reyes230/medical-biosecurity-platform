package com.medbiosecurity.business_core.catalog.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.Map;

public record RegisterProductRequest(
        @NotBlank(message = "El nombre del producto no puede estar vacío")
        String name,

        @NotBlank(message = "La descripción no puede estar vacía")
        String description,

        @NotBlank(message = "La categoría no puede estar vacía")
        String category,

        @NotBlank(message = "El SKU no puede estar vacío")
        String sku,

        @NotNull(message = "El precio base es obligatorio")
        @Positive(message = "El precio base debe ser mayor a 0")
        BigDecimal basePrice,

        @NotBlank(message = "La moneda es obligatoria")
        String currency,

        Map<String, String> attributes
) {}