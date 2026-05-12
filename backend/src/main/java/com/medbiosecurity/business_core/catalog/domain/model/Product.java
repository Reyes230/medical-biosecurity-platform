package com.medbiosecurity.business_core.catalog.domain.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Product {
    private final ProductId id;
    private String name;
    private String description;
    private Category category;
    private final List<ProductVariant> variants;

    public Product(ProductId id, String name, String description, Category category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.variants = new ArrayList<>();
    }

    public void addVariant(ProductVariant variant) {
        if (variant == null) throw new IllegalArgumentException("Variant cannot be null");
        this.variants.add(variant);
    }

    /**
     * Regla de negocio: Un producto es genérico si solo tiene una variante
     * y no tiene atributos específicos (ej. Guantes de látex estándar).
     */
    public boolean isGeneric() {
        return variants.size() == 1 && variants.get(0).getAttribute("Talla") == null;
    }

    public ProductId getId() { return id; }
    public String getName() { return name; }
    public List<ProductVariant> getVariants() {
        return Collections.unmodifiableList(variants);
    }
}