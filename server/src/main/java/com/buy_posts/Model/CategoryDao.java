package com.buy_posts.Model;

import javax.persistence.*;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;


@Data
@NoArgsConstructor
@Entity(name = "categories")
public class CategoryDao {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull
    private String name;


    public CategoryDao(String name){
        this.name = name;
    }
}
