package com.adptapaw.backend.context;

import org.springframework.web.util.UriComponentsBuilder;

public class GeneralPurposeEmailContext  extends  AbstractEmailContext{
    @Override
    public <T> void init(T context){

        put("firstName", "okay");
        setTemplateLocation("passwordreset.html");
        setSubject("General Purpose");
        setFrom("no-reply@adoptapaw.com");
        setTo("receiver@gmail.com");
    }

}
