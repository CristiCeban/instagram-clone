package com.buy_posts.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDto {
    private String email;
    private String username;
    private String name;
    private String phone;
    private String password;
    private String role;
    private String imagePath;

    public UserDto(String username, String name, String phone, String imagePath) {
        this.username = username;
        this.name = name;
        this.phone = phone;
        this.imagePath = imagePath;
    }

    


}
