// backend/src/main/java/com/medbiosecurity/business_core/catalog/application/usecase/RegisterProductUseCase.java
package com.medbiosecurity.business_core.catalog.application.usecase;

import com.medbiosecurity.business_core.catalog.application.dto.RegisterProductRequest;
import java.util.UUID;

public interface RegisterProductUseCase {
    UUID execute(RegisterProductRequest request);
}