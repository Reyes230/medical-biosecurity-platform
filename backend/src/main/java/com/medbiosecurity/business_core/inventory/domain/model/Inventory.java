package com.medbiosecurity.business_core.inventory.domain.model;

import com.medbiosecurity.business_core.catalog.domain.model.VariantId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Inventory {
    private final VariantId variantId; // Vinculado a una variante específica
    private final List<InventoryTransaction> transactions;

    public Inventory(VariantId variantId) {
        this.variantId = variantId;
        this.transactions = new ArrayList<>();
    }

    public void addStock(int quantity, String reason) {
        transactions.add(new InventoryTransaction(TransactionId.generate(), TransactionType.IN, quantity, reason));
    }

    public void removeStock(int quantity, String reason) {
        if (calculateCurrentStock() < quantity) {
            throw new IllegalStateException("Insufficient stock for variant: " + variantId.value());
        }
        transactions.add(new InventoryTransaction(TransactionId.generate(), TransactionType.OUT, quantity, reason));
    }

    public int calculateCurrentStock() {
        return transactions.stream()
                .mapToInt(t -> t.getType() == TransactionType.IN ? t.getQuantity() : -t.getQuantity())
                .sum();
    }

    public List<InventoryTransaction> getTransactions() {
        return Collections.unmodifiableList(transactions);
    }
}