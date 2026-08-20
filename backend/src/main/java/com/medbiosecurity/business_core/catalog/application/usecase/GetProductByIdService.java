package com.medbiosecurity.business_core.catalog.application.usecase;

import com.medbiosecurity.business_core.catalog.application.dto.ProductCatalogResponse;
import com.medbiosecurity.business_core.catalog.application.dto.VariantResponse;
import com.medbiosecurity.business_core.catalog.domain.model.ProductId;
import com.medbiosecurity.business_core.catalog.domain.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetProductByIdService {

    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public ProductCatalogResponse execute(UUID productId) {
        return productRepository.findById(new ProductId(productId))
                .map(product -> new ProductCatalogResponse(
                        product.getId().value(),
                        product.getName(),
                        product.getDescription(),
                        product.getCategory().name(),
                        product.getVariants().stream()
                                .map(v -> new VariantResponse(
                                        v.getId().value(),
                                        v.getSku(),
                                        v.getBasePrice().amount(),
                                        v.getBasePrice().currency().getCurrencyCode(),
                                        v.getAttributes()
                                )).collect(Collectors.toList())
                ))
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));
    }
}