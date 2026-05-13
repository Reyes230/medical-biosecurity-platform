// backend/src/main/java/com/medbiosecurity/business_core/catalog/application/usecase/RegisterProductService.java
package com.medbiosecurity.business_core.catalog.application.usecase;

import com.medbiosecurity.business_core.catalog.application.dto.RegisterProductRequest;
import com.medbiosecurity.business_core.catalog.domain.model.*;
import com.medbiosecurity.business_core.catalog.domain.repository.ProductRepository;
import com.medbiosecurity.business_core.inventory.domain.model.Inventory;
import com.medbiosecurity.business_core.inventory.domain.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RegisterProductService implements RegisterProductUseCase {

    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    @Override
    @Transactional // Asegura que si falla el inventario, no se guarde el producto
    public UUID execute(RegisterProductRequest request) {
        // 1. Crear el Producto y su Variante inicial (Dominio de Catálogo)
        ProductId productId = ProductId.generate();
        VariantId variantId = VariantId.generate();

        Product product = new Product(
                productId,
                request.name(),
                request.description(),
                new Category(request.category())
        );

        ProductVariant variant = new ProductVariant(
                variantId,
                request.sku(),
                request.attributes(),
                Money.of(request.basePrice().doubleValue(), request.currency())
        );

        product.addVariant(variant);

        // 2. Crear el registro de Inventario (Dominio de Inventario)
        Inventory inventory = new Inventory(variantId);
        // Podríamos añadir una transacción inicial de "Ajuste" si el request trae stock inicial

        // 3. Persistir ambos contextos usando los adaptadores de infraestructura
        productRepository.save(product);
        inventoryRepository.save(inventory);

        return productId.value();
    }
}