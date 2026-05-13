// backend/src/main/java/com/medbiosecurity/business_core/catalog/infrastructure/persistence/ProductVariantEntity.java
package com.medbiosecurity.business_core.catalog.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "product_variants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantEntity {

    @Id
    private UUID id;

    @Column(nullable = false, unique = true)
    private String sku;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, String> attributes;

    @Column(nullable = false)
    private BigDecimal basePrice;

    @Column(nullable = false)
    private String currency;

    private boolean isActive;
}