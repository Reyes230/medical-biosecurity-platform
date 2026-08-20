package com.medbiosecurity.business_core.catalog.application.dto;

import java.util.List;

public record UpdateProductRequest(
        String name,
        String description,
        String category,
        List<UpdateVariantDto> variants
) {}