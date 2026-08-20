package com.medbiosecurity.business_core.catalog.application.usecase;

import com.medbiosecurity.business_core.catalog.application.dto.UpdateProductRequest;
import java.util.UUID;

public interface UpdateProductUseCase {
    void execute(UUID productId, UpdateProductRequest request);
}