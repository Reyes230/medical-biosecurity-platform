package com.medbiosecurity.business_core.catalog.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

public record UpdateVariantDto(
        UUID id,

        @NotBlank(message = "El SKU de la variante no puede estar vacío")
        String sku,

        @NotNull(message = "El precio de la variante es obligatorio")
        @Positive(message = "El precio de la variante debe ser mayor a 0")
        BigDecimal basePrice,

        @NotBlank(message = "La moneda es obligatoria")
        String currency,

        Map<String, String> attributes
) {}