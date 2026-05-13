// backend/src/main/java/com/medbiosecurity/business_core/catalog/infrastructure/persistence/ProductRepositoryAdapter.java
package com.medbiosecurity.business_core.catalog.infrastructure.persistence;

import com.medbiosecurity.business_core.catalog.domain.model.Product;
import com.medbiosecurity.business_core.catalog.domain.model.ProductId;
import com.medbiosecurity.business_core.catalog.domain.repository.ProductRepository;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import java.util.Optional;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductRepositoryAdapter implements ProductRepository {

    private final JpaProductRepository jpaRepository;

    @Override
    public void save(Product product) {
        ProductEntity entity = ProductMapper.toEntity(product);
        jpaRepository.save(entity);
    }

    @Override
    public Optional<Product> findById(ProductId id) {
        // Implementaremos toDomain más adelante cuando necesitemos buscar
        return jpaRepository.findById(id.value())
                .map(entity -> null); // Placeholder para no complicar el avance ahora
    }

    @Override
    public List<Product> findAll() {
        return List.of(); // Placeholder
    }
}