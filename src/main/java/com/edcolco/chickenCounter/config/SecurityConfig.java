package com.edcolco.chickenCounter.config;

import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

import com.edcolco.chickenCounter.config.security.RsaKeyProperties;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

/**
 * Adds configuration details to the application. We are using a self-signed
 * JWTs for the authentication. With this we get rid of an authorization server.
 *
 * @author edgar
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Value("${chickenCount.app}")
    private String appLocation;

    private final CorsConfigurationSource corsConfigurationSource;
    private final UserDetailsService userDetailsService;
    private final Set<String> activeProfilesSet;
    private final RsaKeyProperties rsaKeys;

    private final String[] AUTH_WHITELIST = {
            "",
            "/",
            "/index",
            "/index.html",
            "/data-api"
    };

    public SecurityConfig(CorsConfigurationSource corsConfigurationSource, UserDetailsService userDetailsService,
                          Set<String> activeProfilesSet, RsaKeyProperties rsaKeys) {
        this.corsConfigurationSource = corsConfigurationSource;
        this.userDetailsService = userDetailsService;
        this.activeProfilesSet = activeProfilesSet;
        this.rsaKeys = rsaKeys;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(rsaKeys.publicKey()).build();
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(rsaKeys.publicKey()).privateKey(rsaKeys.privateKey()).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));

        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        boolean isDevProfileActive = activeProfilesSet.contains("dev");

        return http
                .csrf(csrf -> csrf.disable())
                // Spring security will never create a http session and, it will never use it to obtain the security context
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(Customizer.withDefaults())
                .authorizeRequests(auth -> {
                    if (isDevProfileActive) {
                        auth.antMatchers("/h2-console/**").permitAll();
                    } else {
                        auth.antMatchers("/h2-console/**").denyAll();
                    }

                    auth.mvcMatchers(AUTH_WHITELIST).permitAll()
                            .antMatchers("/**/*.{js,html,css}").permitAll()
                            // User should be authenticated for any request in the application
                            .anyRequest().authenticated();
                })
                .userDetailsService(userDetailsService)
                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                .headers(headers -> headers.frameOptions().sameOrigin())
                .httpBasic(Customizer.withDefaults())
                .formLogin().loginPage(appLocation)
                .and()
                .build();
    }
}
