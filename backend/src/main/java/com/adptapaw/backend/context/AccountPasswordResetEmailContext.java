package com.adptapaw.backend.context;


import org.springframework.web.util.UriComponentsBuilder;

public class AccountPasswordResetEmailContext  extends AbstractEmailContext{

    private String token;
    @Override
    public <T> void init(T context){

        put("firstName", "okay");
        setTemplateLocation("passwordreset.html");
        setSubject("Reset your password");
        setFrom("no-reply@adoptapaw.com");
        setTo("receiver@gmail.com");
    }

    public void setToken(String token) {
        this.token = token;
        put("token", token);
    }

    public void buildVerificationUrl(final String baseURL, final String token){
//        final String url= UriComponentsBuilder.fromHttpUrl(baseURL)
//                .path("/reset/").queryParam("token", token).toUriString();
//        put("verificationURL", url);
        final String url= UriComponentsBuilder.fromHttpUrl(baseURL)
                .path("/reset/"+ token).toUriString();
        put("verificationURL", url);
    }

}
