// backend/src/main/java/com/medbiosecurity/business_core/catalog/application/dto/RegisterProductRequest.java
package com.medbiosecurity.business_core.catalog.application.dto;

import java.math.BigDecimal;
import java.util.Map;

public record RegisterProductRequest(
        String name,
        String description,
        String category,
        String sku,
        BigDecimal basePrice,
        String currency,
        Map<String, String> attributes
) {}