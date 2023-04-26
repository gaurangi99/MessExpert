package com.spe.poll.auth;

import com.spe.poll.model.FoodChoice;
import com.spe.poll.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String name;
    private String username;
    private String email;
    private String password;
    private String mobile;
    private FoodChoice foodChoice;
    private Role role;

}
