package com.adptapaw.backend.service.token.implementation;

import com.adptapaw.backend.entity.Token;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.repository.TokenRepository;
import com.adptapaw.backend.service.token.TokenService;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.keygen.BytesKeyGenerator;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.Timestamp;
import java.time.LocalDateTime;



@Service
public class TokenServiceImplementation implements TokenService {
    private static final BytesKeyGenerator DEFAULT_TOKEN_GENERATOR = KeyGenerators.secureRandom(15);
    private static final Charset US_ASCII = StandardCharsets.US_ASCII;

    @Value("${jdj.secure.token.validity}")
    private int tokenValidityInSeconds;

    @Autowired
    TokenRepository tokenRepository;

    public TokenServiceImplementation(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public Token createToken(User user){
        String tokenValue = new String(Base64.encodeBase64URLSafe(DEFAULT_TOKEN_GENERATOR.generateKey()), US_ASCII);
        Token token = new Token();
        token.setToken(tokenValue);
        token.setExpireAt(LocalDateTime.now().plusSeconds(getTokenValidityInSeconds()));
//        token.setTimeStamp();
        token.setUsertoken(user);
        this.saveToken(token);
        return token;
    }

    @Override
    public void saveToken(Token token) {
        tokenRepository.save(token);
    }

    @Override
    public Token findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    @Override
    public void removeToken(Token token) {
        tokenRepository.delete(token);
    }

    @Override
    public void removeTokenByToken(String token) {
        tokenRepository.removeByToken(token);
    }

    public int getTokenValidityInSeconds() {
        return tokenValidityInSeconds;
    }
}
