package com.spe.poll.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {
    private Long id;
    private String username;
    private String name;
    private Instant joinedAt;
    private Long pollCount;
    private Long voteCount;

    public UserProfile(long id, String username, String name, Instant createdAt, long pollCount, long voteCount) {
        this.id=id;
        this.username=username;
        this.name=name;
        this.joinedAt=createdAt;
        this.pollCount=pollCount;
        this.voteCount=voteCount;
    }
}
