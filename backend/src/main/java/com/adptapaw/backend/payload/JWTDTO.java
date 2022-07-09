package com.adptapaw.backend.payload;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class JWTDTO {
    private String accessToken;
    private String tokenType = "Bearer";

    public JWTDTO(String accessToken) {
        this.accessToken = accessToken;
    }

}
