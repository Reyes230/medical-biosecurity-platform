package com.medbiosecurity.business_core.catalog.domain.model;

public record Category(String name) {
    public Category {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Category name cannot be empty");
        }
    }
}