package com.medbiosecurity.business_core.inventory.domain.model;

import java.time.LocalDateTime;

public class InventoryTransaction {
    private final TransactionId id;
    private final TransactionType type;
    private final int quantity;
    private final LocalDateTime date;
    private final String reason;

    public InventoryTransaction(TransactionId id, TransactionType type, int quantity, String reason) {
        this.id = id;
        this.type = type;
        this.quantity = quantity;
        this.date = LocalDateTime.now();
        this.reason = reason;
    }

    // Getters
    public TransactionType getType() { return type; }
    public int getQuantity() { return quantity; }

    public LocalDateTime getDate() { return date; }
    public String getReason() { return reason; }
    public TransactionId getId() { return id; }

}