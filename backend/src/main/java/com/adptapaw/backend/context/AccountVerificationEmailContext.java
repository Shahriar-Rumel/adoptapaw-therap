package com.adptapaw.backend.context;


public class AccountVerificationEmailContext  extends AbstractEmailContext{

    @Override
    public <T> void init(T context){

        put("firstName", "okay");
        setTemplateLocation("emailsender.html");
        setSubject("Complete your registration");
        setFrom("no-reply@adoptapaw.com");
        setTo("receiver@gmail.com");
    }

}
