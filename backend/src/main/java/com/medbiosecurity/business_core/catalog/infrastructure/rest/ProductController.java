// backend/src/main/java/com/medbiosecurity/business_core/catalog/infrastructure/rest/ProductController.java
package com.medbiosecurity.business_core.catalog.infrastructure.rest;

import com.medbiosecurity.business_core.catalog.application.dto.RegisterProductRequest;
import com.medbiosecurity.business_core.catalog.application.usecase.RegisterProductUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final RegisterProductUseCase registerProductUseCase;

    @PostMapping
    public ResponseEntity<UUID> createProduct(@RequestBody RegisterProductRequest request) {
        // El controlador solo delega la ejecución al caso de uso
        UUID productId = registerProductUseCase.execute(request);

        // Retornamos 201 Created con el ID del nuevo recurso
        return new ResponseEntity<>(productId, HttpStatus.CREATED);
    }
}