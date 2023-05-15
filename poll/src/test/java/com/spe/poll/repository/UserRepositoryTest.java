package com.spe.poll.repository;

import com.spe.poll.model.User;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static com.spe.poll.model.FoodChoice.*;
import static com.spe.poll.model.Role.*;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@RequiredArgsConstructor
@ExtendWith(SpringExtension.class)
class UserRepositoryTest{

    @Autowired
    private UserRepository userRepository;

    @Test
    void existsByUsername() {
        User user=new User("MT1999001","one123","one@gmail.com","9987563823","One",NA,STUDENT);
        userRepository.save(user);
        Boolean actualResult=userRepository.existsByUsername("MT1999001");
        assertThat(actualResult).isTrue();
    }

    @BeforeEach
    void setUp() {
        System.out.println("Setting up UserRepositoryTest...");
        Boolean flag=userRepository.existsByUsername("MT1999001");
        if(flag){
            User prevUser = userRepository.findUserByUsername("MT1999001");
            userRepository.delete(prevUser);
        }
    }

    @AfterEach
    void tearDown() {
        System.out.println("Tearing down UserRepositoryTest...");
        userRepository.deleteById(userRepository.findUserByUsername("MT1999001").getId());
    }

    @Test
    void findByUsername() {
        User user=new User("MT1999001","one123","one@gmail.com","9987563823","One",NA,STUDENT);
        userRepository.save(user);
        Optional<User> actualResult=userRepository.findByUsername("MT2022001");
        assertThat(actualResult).isNotNull();
    }
}