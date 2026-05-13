package com.medbiosecurity.business_core.catalog.domain.model;

import java.util.Map;
import java.util.Collections;

public class ProductVariant {
    private final VariantId id;
    private final String sku;
    private final Map<String,String> attributes;
    private final Money basePrice;
    private boolean isActive;

    public ProductVariant(VariantId id, String sku, Map<String,String> attributes, Money basePrice) {
        this.id = id;
        this.sku = sku;
        this.attributes = attributes!=null ? Map.copyOf(attributes) : Collections.emptyMap();
        this.basePrice = basePrice;
        this.isActive = true;
    }
    // --- Estos son los métodos que el Mapper necesita para funcionar ---

    public VariantId getId() {
        return id;
    }

    public String getSku() {
        return sku;
    }

    public Map<String, String> getAttributes() {
        return attributes;
    }

    public Money getBasePrice() {
        return basePrice;
    }

    public boolean isActive() {
        return isActive;
    }

    public String getAttribute(String key){
        return attributes.get(key);
    }

}
