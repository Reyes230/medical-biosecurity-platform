package com.medbiosecurity.business_core.catalog.infrastructure.rest.auth;

public record LoginResponse(boolean authenticated, String token) {}