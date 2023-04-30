package com.spe.poll.repository;

import com.spe.poll.model.FoodChoice;
import com.spe.poll.model.Role;
import com.spe.poll.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
    User findUserByUsername(String username);

    Optional<User> findByUsernameOrEmail(String username, String email);

    List<User> findByIdIn(List<Long> userIds);

    List<User> findAllByRole(Role role);

    List<User> findAllByRoleAndFoodChoice(Role role, FoodChoice foodchoice);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    User deleteByUsername(String username);
}
