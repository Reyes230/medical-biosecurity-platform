// backend/src/main/java/com/medbiosecurity/business_core/inventory/infrastructure/persistence/InventoryEntity.java
package com.medbiosecurity.business_core.inventory.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "inventories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryEntity {

    @Id
    private UUID variantId; // Llave primaria vinculada a la variante del catálogo

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "inventory_variant_id")
    private List<InventoryTransactionEntity> transactions;
}