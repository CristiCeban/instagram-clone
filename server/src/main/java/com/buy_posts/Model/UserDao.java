package com.buy_posts.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "users") // This tells Hibernate to make a table out of this class
public class UserDao {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;
  @Column
  private String userName;
  @Column(unique = true)
  private String email;

  @JsonIgnore
  @Column
  private String password;

  @JsonIgnore
  private String imagePath;

  @JsonIgnore
  private String role;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  
  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
      return password;
  }

  public void setPassword(String password) {
      this.password = password;
  }

  public String getImagePath() {
      return imagePath;
  }

  public void setImagePath(String imagePath) {
      this.imagePath = imagePath;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getRole() {
    return null;
  }

  public void setRole(String role) {
    this.role = role;
  }
}