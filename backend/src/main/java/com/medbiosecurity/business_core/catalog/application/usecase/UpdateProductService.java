package com.medbiosecurity.business_core.catalog.application.usecase;

import com.medbiosecurity.business_core.catalog.application.dto.UpdateProductRequest;
import com.medbiosecurity.business_core.catalog.domain.model.*;
import com.medbiosecurity.business_core.catalog.domain.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdateProductService implements UpdateProductUseCase {

    private final ProductRepository productRepository;

    @Override
    @Transactional
    public void execute(UUID productId, UpdateProductRequest request) {
        Product product = productRepository.findById(new ProductId(productId))
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

        product.updateDetails(
                request.name(),
                request.description(),
                new Category(request.category())
        );

        if (request.variants() != null && !request.variants().isEmpty()) {
            product.clearVariants();
            for (var v : request.variants()) {
                VariantId variantId = v.id() != null ? new VariantId(v.id()) : VariantId.generate();
                ProductVariant variant = new ProductVariant(
                        variantId,
                        v.sku(),
                        v.attributes(),
                        Money.of(v.basePrice().doubleValue(), v.currency() != null ? v.currency() : "USD")
                );
                product.addVariant(variant);
            }
        }

        productRepository.save(product);
    }
}