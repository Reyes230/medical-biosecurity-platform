// backend/src/main/java/com/medbiosecurity/business_core/catalog/infrastructure/persistence/ProductMapper.java
package com.medbiosecurity.business_core.catalog.infrastructure.persistence;

import com.medbiosecurity.business_core.catalog.domain.model.*;
import java.util.Currency;
import java.util.stream.Collectors;

public class ProductMapper {

    public static ProductEntity toEntity(Product domain) {
        return ProductEntity.builder()
                .id(domain.getId().value())
                .name(domain.getName())
                .description(domain.getDescription())
                .category(domain.getCategory().name()) // Asumimos que Category solo guarda el nombre por ahora
                .variants(domain.getVariants().stream()
                        .map(ProductMapper::toVariantEntity)
                        .collect(Collectors.toList()))
                .build();
    }

    private static ProductVariantEntity toVariantEntity(ProductVariant domain) {
        // Nota: Para este mapper necesitaremos acceso a campos de ProductVariant. 
        // Si no creaste getters en ProductVariant, IntelliJ te marcará error.
        return ProductVariantEntity.builder()
                .id(domain.getId().value())
                .sku(domain.getSku())
                .attributes(domain.getAttributes())
                .basePrice(domain.getBasePrice().amount())
                .currency(domain.getBasePrice().currency().getCurrencyCode())
                .isActive(domain.isActive())
                .build();
    }

    // Aquí también iría el método toDomain(...) para el flujo de lectura
    public static Product toDomain(ProductEntity entity) {
        Product product = new Product(
                new ProductId(entity.getId()),
                entity.getName(),
                entity.getDescription(),
                new Category(entity.getCategory())
        );

        if (entity.getVariants() != null) {
            entity.getVariants().forEach(v -> {
                ProductVariant variant = new ProductVariant(
                        new VariantId(v.getId()),
                        v.getSku(),
                        v.getAttributes(),
                        Money.of(v.getBasePrice().doubleValue(), v.getCurrency())
                );
                product.addVariant(variant);
            });
        }

        return product;
    }
}