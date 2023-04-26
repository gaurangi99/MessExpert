package com.spe.poll.service;


import com.spe.poll.model.User;
import com.spe.poll.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService  {
    @Autowired
    private UserRepository userRepository;
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).
                orElseThrow(()->new UsernameNotFoundException("User not found"));
    }

}