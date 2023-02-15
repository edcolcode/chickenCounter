package com.edcolco.chickenCounter.response;

import lombok.Builder;

@Builder
public record AuthResponse(String user, String token, String roles) {}
