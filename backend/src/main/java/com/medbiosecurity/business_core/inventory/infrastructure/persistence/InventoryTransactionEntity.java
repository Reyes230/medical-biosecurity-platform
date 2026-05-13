// backend/src/main/java/com/medbiosecurity/business_core/inventory/infrastructure/persistence/InventoryTransactionEntity.java
package com.medbiosecurity.business_core.inventory.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "inventory_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryTransactionEntity {

    @Id
    private UUID id;

    @Column(nullable = false)
    private String type; // Almacena el nombre del Enum: IN, OUT, ADJUSTMENT

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private LocalDateTime transactionDate;

    private String reason;
}