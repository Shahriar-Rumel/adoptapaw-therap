package com.adptapaw.backend.service.token;


import com.adptapaw.backend.entity.Token;
import com.adptapaw.backend.entity.User;

public interface TokenService  {

        Token createToken(User user);
        void saveToken(final Token token);
        Token findByToken(final String token);
        void removeToken(final Token token);
        void removeTokenByToken(final String token);

}
