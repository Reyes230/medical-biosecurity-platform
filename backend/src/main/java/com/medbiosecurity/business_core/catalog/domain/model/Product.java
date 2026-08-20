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

    public void clearVariants() {
        this.variants.clear();
    }

    public void updateDetails(String name, String description, Category category) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Product name cannot be empty");
        }
        if (category == null) {
            throw new IllegalArgumentException("Category cannot be null");
        }
        this.name = name;
        this.description = description;
        this.category = category;
    }

    public boolean isGeneric() {
        return variants.size() == 1 && variants.get(0).getAttribute("Talla") == null;
    }

    public ProductId getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Category getCategory() { return category; }
    public List<ProductVariant> getVariants() { return Collections.unmodifiableList(variants); }
}