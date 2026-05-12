package com.medbiosecurity.business_core.inventory.domain.model;

public enum TransactionType {
    IN,         // Entrada por compra o devolución
    OUT,        // Salida por venta o despacho
    ADJUSTMENT  // Ajuste manual por inventario físico
}