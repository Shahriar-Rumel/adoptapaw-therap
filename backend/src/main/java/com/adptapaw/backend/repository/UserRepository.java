package com.adptapaw.backend.repository;

import com.adptapaw.backend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserRepository extends MongoRepository<User,Object> {

}