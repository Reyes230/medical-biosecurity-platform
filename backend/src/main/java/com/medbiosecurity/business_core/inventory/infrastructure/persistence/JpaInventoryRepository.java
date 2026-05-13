// backend/src/main/java/com/medbiosecurity/business_core/inventory/infrastructure/persistence/JpaInventoryRepository.java
package com.medbiosecurity.business_core.inventory.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface JpaInventoryRepository extends JpaRepository<InventoryEntity, UUID> {
}