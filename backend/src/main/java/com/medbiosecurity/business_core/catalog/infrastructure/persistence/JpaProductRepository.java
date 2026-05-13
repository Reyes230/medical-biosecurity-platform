// backend/src/main/java/com/medbiosecurity/business_core/catalog/infrastructure/persistence/JpaProductRepository.java
package com.medbiosecurity.business_core.catalog.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface JpaProductRepository extends JpaRepository<ProductEntity, UUID>{
    //consultas sql
}
