package com.buy_posts.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductDto {
    private String name;
    private String long_description;
    private String short_description;
    private Double price;
    private long categoryId;
    

    

    public ProductDto(String name, String long_description, String short_description, Double price, long categoryId) {
        this.name = name;
        this.long_description = long_description;
        this.short_description = short_description;
        this.price = price;
        this.categoryId = categoryId;
    }


}
