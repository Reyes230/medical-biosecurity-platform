package com.medbiosecurity.business_core.catalog.application.usecase;

import java.util.UUID;

public interface DeleteProductUseCase {
    void execute(UUID productId);
}