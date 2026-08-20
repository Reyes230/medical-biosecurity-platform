package com.medbiosecurity.business_core.catalog.infrastructure.persistence;

import com.medbiosecurity.business_core.catalog.domain.model.Product;
import com.medbiosecurity.business_core.catalog.domain.model.ProductId;
import com.medbiosecurity.business_core.catalog.domain.repository.ProductRepository;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

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
        return jpaRepository.findById(id.value())
                .map(ProductMapper::toDomain);
    }

    @Override
    public List<Product> findAll() {
        return jpaRepository.findAll().stream()
                .map(ProductMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(ProductId id) {
        jpaRepository.deleteById(id.value());
    }

    @Override
    public boolean existsById(ProductId id) {
        return jpaRepository.existsById(id.value());
    }
}