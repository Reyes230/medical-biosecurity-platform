package com.medbiosecurity.business_core.catalog.application.usecase;

import com.medbiosecurity.business_core.catalog.application.dto.ProductCatalogResponse;
import com.medbiosecurity.business_core.catalog.application.dto.VariantResponse;
import com.medbiosecurity.business_core.catalog.infrastructure.persistence.JpaProductRepository;
import com.medbiosecurity.business_core.catalog.infrastructure.persistence.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetProductCatalogService {

    // Inyectamos directamente tu repositorio de JPA
    private final JpaProductRepository jpaProductRepository;

    @Transactional(readOnly = true)
    public List<ProductCatalogResponse> execute() {
        return jpaProductRepository.findAll().stream()
                .map(ProductMapper::toDomain) // Convertimos Entidad -> Dominio
                .map(product -> new ProductCatalogResponse( // Convertimos Dominio -> DTO de salida
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
                )).collect(Collectors.toList());
    }
}