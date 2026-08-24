package com.medbiosecurity.business_core.catalog.application.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record UpdateProductRequest(
        @NotBlank(message = "El nombre del producto no puede estar vacío")
        String name,

        @NotBlank(message = "La descripción no puede estar vacía")
        String description,

        @NotBlank(message = "La categoría no puede estar vacía")
        String category,

        @NotEmpty(message = "Debe proporcionar al menos una variante")
        List<@Valid UpdateVariantDto> variants
) {}