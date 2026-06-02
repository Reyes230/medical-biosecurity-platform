//C:\Users\matis\OneDrive\Documents\medical-biosecurity-platform\backend\src\main\java\com\medbiosecurity\business_core\catalog\infrastructure\seed/DatabaseSeeder.java
package com.medbiosecurity.business_core.catalog.infrastructure.seed;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.medbiosecurity.business_core.catalog.application.dto.RegisterProductRequest;
import com.medbiosecurity.business_core.catalog.application.usecase.RegisterProductUseCase;
import com.medbiosecurity.business_core.catalog.domain.model.*;
import com.medbiosecurity.business_core.catalog.domain.repository.ProductRepository;
import com.medbiosecurity.business_core.inventory.domain.model.Inventory;
import com.medbiosecurity.business_core.inventory.domain.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

    private final RegisterProductUseCase registerProductUseCase;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    private final ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        // Evita duplicar datos si ya hiciste la carga previamente
        if (!productRepository.findAll().isEmpty()) {
            log.info("La base de datos ya contiene productos. Se omite la importación masiva.");
            return;
        }

        log.info("Iniciando la importación masiva de datos desde JSON enriquecido...");

        try {
            InputStream inputStream = new ClassPathResource("initial_products.json").getInputStream();
            ImportDataDto data = objectMapper.readValue(inputStream, ImportDataDto.class);

            // 1. Importar los 74 productos estándar usando tu caso de uso DTO
            int standardCount = 0;
            for (StandardProductDto p : data.standardProducts()) {
                RegisterProductRequest request = new RegisterProductRequest(
                        p.name(), p.description(), p.category(), p.sku(), p.basePrice(), p.currency(), p.attributes()
                );
                registerProductUseCase.execute(request);
                standardCount++;
            }
            log.info("Se importaron con éxito {} productos estándar.", standardCount);

            // 2. Importar la ropa médica construyendo el Agregado de Dominio
            for (ClothingProductDto clothing : data.medicalClothing()) {
                importClothingWithVariants(clothing);
            }
            log.info("Se importó con éxito la matriz de Scrubs Médicos.");

        } catch (Exception e) {
            log.error("Error crítico durante la importación de datos: ", e);
        }
    }

    @Transactional
    protected void importClothingWithVariants(ClothingProductDto clothing) {
        ProductId productId = ProductId.generate();
        Product product = new Product(productId, clothing.name(), clothing.description(), new Category(clothing.category()));

        for (ClothingVariantDto v : clothing.variants()) {
            VariantId variantId = VariantId.generate();
            ProductVariant variant = new ProductVariant(
                    variantId,
                    v.sku(),
                    v.attributes(),
                    Money.of(v.basePrice().doubleValue(), v.currency())
            );
            product.addVariant(variant);

            // Cumpliendo con tu regla de negocio: Inicializar inventario en 0
            Inventory inventory = new Inventory(variantId);
            inventoryRepository.save(inventory);
        }

        productRepository.save(product);
    }
}