package com.spe.poll.controller;

import com.spe.poll.auth.PollRequest;
import com.spe.poll.auth.VoteRequest;
import com.spe.poll.model.Poll;
import com.spe.poll.model.User;
import com.spe.poll.payload.PagedResponse;
import com.spe.poll.payload.PollResponse;
import com.spe.poll.security.CurrentUser;
import com.spe.poll.service.PollService;
import com.spe.poll.util.AppConstants;
import jakarta.validation.Valid;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import ch.qos.logback.classic.Logger;

import java.net.URI;

@RestController
@RequestMapping("/api/polls")
public class PollController {
    @Autowired
    private PollService pollService;

    private static final ch.qos.logback.classic.Logger log= (Logger) LoggerFactory.getLogger(PollController.class);

    @PostMapping("/getPolls")
    public PagedResponse<PollResponse> getPolls(@CurrentUser User currentUser,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.getAllPolls(currentUser, page, size);
    }

    @PostMapping("/addPoll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createPoll(@Valid @RequestBody PollRequest pollRequest) {

        Poll poll = pollService.createPoll(pollRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{pollId}")
                .buildAndExpand(poll.getId()).toUri();

//        return ResponseEntity.created(location)
//                .body(new ApiResponse(true, "Poll Created Successfully!"));

//        return new ResponseEntity(new ApiResponse(true, "Poll Created Successfully!"), HttpStatus.OK);
        return ResponseEntity.status(HttpStatus.OK).body("Poll Created Successfully!");
//        ApiResponse response = new ApiResponse(true, "Poll Created Successfully!");
//        return ResponseEntity.created(location).body(response);
    }

    @PostMapping("/{pollId}")
    public PollResponse getPollById(@CurrentUser User currentUser,
                                    @PathVariable Long pollId) {
//        if(!pollId.){
//            log.info("Poll returned!");
//        }
        return pollService.getPollById(pollId, currentUser);
    }

    @PostMapping("/{pollId}/votes")
    @PreAuthorize("hasRole('ADMIN')")
    public PollResponse castVote(@CurrentUser User currentUser,
                                 @PathVariable Long pollId,
                                 @Valid @RequestBody VoteRequest voteRequest) {
        return pollService.castVoteAndGetUpdatedPoll(currentUser, pollId, voteRequest);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<String> handleServerException(){
        log.error("PC:Internal Server error occurred!");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server error occurred!");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleBadRequestException(){
        log.error("PC:Bad Request!");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request!");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleNotFoundException(){
        log.error("PC:Not Found!");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found!");
    }
}
