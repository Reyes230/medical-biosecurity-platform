// backend/src/main/java/com/medbiosecurity/business_core/inventory/domain/repository/InventoryRepository.java
package com.medbiosecurity.business_core.inventory.domain.repository;

import com.medbiosecurity.business_core.catalog.domain.model.ProductId;
import com.medbiosecurity.business_core.inventory.domain.model.Inventory;
import com.medbiosecurity.business_core.catalog.domain.model.VariantId;
import java.util.Optional;

public interface InventoryRepository {
    void save(Inventory inventory);
    Optional<Inventory> findByVariantId(VariantId variantId);
}
