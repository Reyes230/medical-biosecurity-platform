// backend/src/main/java/com/medbiosecurity/business_core/inventory/infrastructure/persistence/InventoryRepositoryAdapter.java
package com.medbiosecurity.business_core.inventory.infrastructure.persistence;

import com.medbiosecurity.business_core.inventory.domain.model.Inventory;
import com.medbiosecurity.business_core.inventory.domain.repository.InventoryRepository;
import com.medbiosecurity.business_core.catalog.domain.model.VariantId;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class InventoryRepositoryAdapter implements InventoryRepository {

    private final JpaInventoryRepository jpaRepository;

    @Override
    public void save(Inventory inventory) {
        InventoryEntity entity = InventoryEntity.builder()
                .variantId(inventory.getVariantId().value())
                .transactions(inventory.getTransactions().stream()
                        .map(t -> InventoryTransactionEntity.builder()
                                .id(t.getId().value())
                                .type(t.getType().name())
                                .quantity(t.getQuantity())
                                .transactionDate(t.getDate())
                                .reason(t.getReason())
                                .build())
                        .collect(Collectors.toList()))
                .build();

        jpaRepository.save(entity);
    }

    @Override
    public Optional<Inventory> findByVariantId(VariantId variantId) {
        // Al igual que en el catálogo, dejaremos el toDomain para la fase de lectura
        return Optional.empty();
    }
}