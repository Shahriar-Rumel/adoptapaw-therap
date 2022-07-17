package com.adptapaw.backend.service.email;

import com.adptapaw.backend.context.AbstractEmailContext;
import javax.mail.MessagingException;


public interface EmailService {

    void sendMail(AbstractEmailContext email) throws MessagingException;
}