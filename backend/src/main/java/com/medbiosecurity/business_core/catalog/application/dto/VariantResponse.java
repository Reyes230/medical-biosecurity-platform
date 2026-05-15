// backend/src/main/java/com/medbiosecurity/business_core/catalog/application/dto/VariantResponse.java
package com.medbiosecurity.business_core.catalog.application.dto;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

public record VariantResponse(UUID id, String sku, BigDecimal basePrice, String currency, Map<String, String> attributes) {}