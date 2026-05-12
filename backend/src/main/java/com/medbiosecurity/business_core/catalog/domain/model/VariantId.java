package com.medbiosecurity.business_core.catalog.domain.model;

import java.util.UUID;

public record VariantId(UUID value) {
    public VariantId {
        if (value == null) throw new IllegalArgumentException("Variant ID cannot be null");
    }

    public static VariantId generate() {
        return new VariantId(UUID.randomUUID());
    }
}
