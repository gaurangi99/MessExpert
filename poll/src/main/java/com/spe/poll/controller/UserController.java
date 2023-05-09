package com.spe.poll.controller;

import com.spe.poll.auth.UserRequest;
import com.spe.poll.exception.ResourceNotFoundException;
import com.spe.poll.model.Role;
import com.spe.poll.model.User;
import com.spe.poll.payload.*;
import com.spe.poll.repository.PollRepository;
import com.spe.poll.repository.UserRepository;
import com.spe.poll.repository.VoteRepository;
import com.spe.poll.security.CurrentUser;
import com.spe.poll.service.PollService;
import com.spe.poll.service.UserService;
import com.spe.poll.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    //////////////////////////////////////////////

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private PollService pollService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser User currentUser) {
        UserSummary userSummary = new UserSummary((long) currentUser.getId(), currentUser.getUsername(), currentUser.getName());
        return userSummary;
    }

    @PostMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @PostMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @PostMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        long pollCount = pollRepository.countByCreatedBy((long) user.getId());
        long voteCount = voteRepository.countByUserId((long) user.getId());

        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt(), pollCount, voteCount);

        return userProfile;
    }

    @PostMapping("/users/{username}/polls")
    public PagedResponse<PollResponse> getPollsCreatedBy(@PathVariable(value = "username") String username,
                                                         @CurrentUser User currentUser,
                                                         @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                         @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.getPollsCreatedBy(username, currentUser, page, size);
    }

    @PostMapping("/users/{username}/votes")
    public PagedResponse<PollResponse> getPollsVotedBy(@PathVariable(value = "username") String username,
                                                       @CurrentUser User currentUser,
                                                       @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.getPollsVotedBy(username, currentUser, page, size);
    }
}
