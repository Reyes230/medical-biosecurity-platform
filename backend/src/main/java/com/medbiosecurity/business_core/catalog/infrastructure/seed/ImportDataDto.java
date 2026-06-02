// C:\Users\matis\OneDrive\Documents\medical-biosecurity-platform\backend\src\main\java\com\medbiosecurity\business_core\catalog\infrastructure\seed/ImportDataDto.java
package com.medbiosecurity.business_core.catalog.infrastructure.seed;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public record ImportDataDto(
        List<StandardProductDto> standardProducts,
        List<ClothingProductDto> medicalClothing
) {}

record StandardProductDto(
        String name,
        String description,
        String category,
        String sku,
        BigDecimal basePrice,
        String currency,
        Map<String, String> attributes
) {}

record ClothingProductDto(
        String name,
        String description,
        String category,
        List<ClothingVariantDto> variants
) {}

record ClothingVariantDto(
        String sku,
        BigDecimal basePrice,
        String currency,
        Map<String, String> attributes
) {}