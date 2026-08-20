package com.medbiosecurity.business_core.catalog.application.usecase;

import com.medbiosecurity.business_core.catalog.domain.model.ProductId;
import com.medbiosecurity.business_core.catalog.domain.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeleteProductService implements DeleteProductUseCase {

    private final ProductRepository productRepository;

    @Override
    @Transactional
    public void execute(UUID productId) {
        ProductId id = new ProductId(productId);
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Product not found with ID: " + productId);
        }
        productRepository.deleteById(id);
    }
}