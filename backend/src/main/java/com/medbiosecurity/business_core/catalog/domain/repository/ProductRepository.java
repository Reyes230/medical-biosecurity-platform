// backend/src/main/java/com/medbiosecurity/business_core/catalog/domain/repository/ProductRepository.java
package com.medbiosecurity.business_core.catalog.domain.repository;

import com.medbiosecurity.business_core.catalog.domain.model.Product;
import com.medbiosecurity.business_core.catalog.domain.model.ProductId;
import java.util.Optional;
import java.util.List;

public interface ProductRepository {
    void save(Product product);
    Optional<Product>findById(ProductId id);
    List<Product> findAll();
}
