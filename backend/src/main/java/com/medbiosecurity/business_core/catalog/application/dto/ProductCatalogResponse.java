// backend/src/main/java/com/medbiosecurity/business_core/catalog/application/dto/VariantResponse.java
package com.medbiosecurity.business_core.catalog.application.dto;
import java.util.List;
import java.util.UUID;

public record ProductCatalogResponse(UUID id, String name, String description, String category, List<VariantResponse> variants) {}