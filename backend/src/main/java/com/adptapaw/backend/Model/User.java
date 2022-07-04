package com.adptapaw.backend.Model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString


@Document(collection = "User")
public class User {

    private String Name;
    private String Email;

}