package com.spe.poll.controller;

import com.spe.poll.auth.UserRequest;
import com.spe.poll.model.FoodChoice;
import com.spe.poll.model.Role;
import com.spe.poll.model.User;
import com.spe.poll.repository.UserRepository;
import com.spe.poll.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;



@RequestMapping("/api/admin")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return userService.findAllUsers();
    }

    @PostMapping("/getUserById/{id}")
    public Optional<User> getUserById(@PathVariable int id){
        return userService.findUserById(id);
    }

    @PostMapping("/getUserByUsername/{username}")
    public Optional<User> getUserByUsername(@PathVariable String username){
        return userService.findUserByUsername(username);
    }

    @PostMapping("/getUserByEmail/{email}")
    public Optional<User> getUserByEmail(@PathVariable String email){
        return userService.findUserByEmail(email);
    }

    @PostMapping("/getUsersByRole/{role}")
    public List<User> getUsersByRole(@PathVariable Role role){
        return userService.findUsersByRole(role);
    }


    @PostMapping("/getUsersByRoleAndFoodChoice")
    public ResponseEntity<List<User>> getUsersByRoleAndFoodChoice(@RequestBody UserRequest userRequest){
        return ResponseEntity.ok(userService.findUsersByRoleAndFoodChoice(userRequest));
    }

    @PostMapping("/addUser")
    public User saveUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @DeleteMapping("/deleteUserById/{id}")
    public String deleteUserById(@PathVariable int id){
        return userService.deleteUserById(id);
    }

    @PutMapping("/updateUser")
    public User updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }
}
