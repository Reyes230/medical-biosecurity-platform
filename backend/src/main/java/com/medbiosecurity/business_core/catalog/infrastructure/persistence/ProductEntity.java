// backend/src/main/java/com/medbiosecurity/business_core/catalog/infrastructure/persistence/ProductEntity.java
package com.medbiosecurity.business_core.catalog.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductEntity {
    @Id
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String category;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "product_id")
    private List<ProductVariantEntity> variants;
}
