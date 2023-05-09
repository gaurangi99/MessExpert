package com.spe.poll.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spe.poll.model.audit.DateAudit;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
        }),
        @UniqueConstraint(columnNames = {
                "email"
        })
})
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User implements UserDetails  {
    @Id
    @GeneratedValue
    private int id;

    @NotBlank
    @NaturalId
    @Size(max=90)
    @Column
    private String username;

    @Size(max = 65555)
    private String password;

    @NaturalId
    @NotBlank
    @Size(max=40)
    @Email
    private String email;

    @Size(max=10)
    private String mobile;

    @NotBlank
    @Size(max=20)
    private String name;

    @Column
    @Enumerated(EnumType.STRING)
    private FoodChoice foodChoice;

//    @NotBlank
    @Enumerated(EnumType.STRING)
    @NaturalId
    private Role role;

//    private Collection<? extends GrantedAuthority> authorities;
    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

//    public User(int id, String name, String username, String email, String password, Collection<? extends GrantedAuthority> authorities){
//        this.id = id;
//        this.name = name;
//        this.username = username;
//        this.email = email;
//        this.password = password;
//
//    }
//    public static User create(User user){
////        List<GrantedAuthority> authorities = new ArrayList<>();
////        for (User role : user.getRole()){
////            authorities.add(new SimpleGrantedAuthority(role.getName()));
////        }
//        List<GrantedAuthority> authorities =List.of(new SimpleGrantedAuthority(user.getRole()));
//        return new User(user.getId(),user.getName(),user.getUsername(),user.getEmail(),user.getPassword(),authorities);
//    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public FoodChoice getFoodChoice() {
        return foodChoice;
    }

    public void setFoodChoice(FoodChoice foodChoice) {
        this.foodChoice = foodChoice;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    public User(String username,String password,String email,
              String mobile,String name,FoodChoice foodChoice,Role role){
        this.username=username;
        this.password=password;
        this.email=email;
        this.mobile=mobile;
        this.name=name;
        this.foodChoice=foodChoice;
        this.role=role;
    }

    public Instant getCreatedAt() {

    }
}