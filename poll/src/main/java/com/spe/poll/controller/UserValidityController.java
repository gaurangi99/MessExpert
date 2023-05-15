package com.spe.poll.controller;

import com.spe.poll.exception.ResourceNotFoundException;
import com.spe.poll.model.User;
import com.spe.poll.payload.*;
import com.spe.poll.repository.PollRepository;
import com.spe.poll.repository.UserRepository;
import com.spe.poll.repository.VoteRepository;
import com.spe.poll.security.CurrentUser;
import com.spe.poll.service.PollService;
import com.spe.poll.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.LoggerFactory;
import ch.qos.logback.classic.Logger;

@RequestMapping("/api/check")
@RestController
public class UserValidityController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private PollService pollService;

    private static final ch.qos.logback.classic.Logger log= (Logger) LoggerFactory.getLogger(UserValidityController.class);

    @PostMapping("/user/me")
    @PreAuthorize("hasRole('ADMIN')")
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

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<String> handleServerException(){
        log.error("UvC:Internal Server error occurred!");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server error occurred!");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleBadRequestException(){
        log.error("UvC:Bad Request!");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request!");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleNotFoundException(){
        log.error("UvC:Not Found!");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found!");
    }
}
