package com.medbiosecurity.business_core.catalog.infrastructure.rest;

import com.medbiosecurity.business_core.catalog.application.dto.ProductCatalogResponse;
import com.medbiosecurity.business_core.catalog.application.dto.RegisterProductRequest;
import com.medbiosecurity.business_core.catalog.application.dto.UpdateProductRequest;
import com.medbiosecurity.business_core.catalog.application.usecase.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final RegisterProductUseCase registerProductUseCase;
    private final GetProductCatalogService getProductCatalogService;
    private final GetProductByIdService getProductByIdService;
    private final UpdateProductUseCase updateProductUseCase;
    private final DeleteProductUseCase deleteProductUseCase;

    @PostMapping
    public ResponseEntity<UUID> createProduct(@Valid @RequestBody RegisterProductRequest request) {
        UUID productId = registerProductUseCase.execute(request);
        return new ResponseEntity<>(productId, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProductCatalogResponse>> getAllProducts() {
        return ResponseEntity.ok(getProductCatalogService.execute());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductCatalogResponse> getProductById(@PathVariable UUID id) {
        return ResponseEntity.ok(getProductByIdService.execute(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProduct(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateProductRequest request
    ) {
        updateProductUseCase.execute(id, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        deleteProductUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}