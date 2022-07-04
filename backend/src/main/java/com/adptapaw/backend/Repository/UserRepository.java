package com.adptapaw.backend.Repository;

import com.adptapaw.backend.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserRepository extends MongoRepository<User,Object> {

}