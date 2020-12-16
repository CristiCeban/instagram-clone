package com.buy_posts.Model;

import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
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

  
  private String imagePath;

  @JsonIgnore
  private String role;

  @Column
  private String phone;

  @Column
  private String name;

  @JsonIgnore
  @OneToMany(mappedBy = "userId")
  private List<ProductDao> products;


}
