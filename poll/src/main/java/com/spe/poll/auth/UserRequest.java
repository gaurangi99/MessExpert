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
public class UserRequest {
    private Role role;
    private FoodChoice foodChoice;
}
