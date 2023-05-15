package com.spe.poll.controller;

import ch.qos.logback.classic.Logger;
import com.spe.poll.auth.UserRequest;
import com.spe.poll.model.Role;
import com.spe.poll.model.User;
import com.spe.poll.service.UserService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/admin")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    private static final ch.qos.logback.classic.Logger log= (Logger) LoggerFactory.getLogger(UserController.class);

    @PostMapping("/getAllUsers")
    public List<User> getAllUsers(){
        if(!userService.findAllUsers().equals(null)){
            log.info("All users found!");
        }
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
    public List<User> getUsersByRoleAndFoodChoice(@RequestBody UserRequest userRequest){
        return userService.findUsersByRoleAndFoodChoice(userRequest);
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

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<String> handleServerException(){
        log.error("UC:Internal Server error occurred!");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server error occurred!");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleBadRequestException(){
        log.error("UC:Bad Request!");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request!");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleNotFoundException(){
        log.error("UC:Not Found!");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found!");
    }
}
