package com.adptapaw.backend.context;


import org.springframework.web.util.UriComponentsBuilder;

public class AccountVerificationEmailContext  extends AbstractEmailContext{

    private String token;
    @Override
    public <T> void init(T context){

        put("firstName", "okay");
        setTemplateLocation("emailsender.html");
        setSubject("Complete your registration");
        setFrom("no-reply@adoptapaw.com");
        setTo("receiver@gmail.com");
    }

    public void setToken(String token) {
        this.token = token;
        put("token", token);
    }

    public void buildVerificationUrl(final String baseURL, final String token){
//        final String url= UriComponentsBuilder.fromHttpUrl(baseURL)
//                .path("").queryParam("token", token).toUriString();

        final String url= UriComponentsBuilder.fromHttpUrl(baseURL)
                .path("/auth/verify/"+ token).toUriString();
        put("verificationURL", url);
    }

}
