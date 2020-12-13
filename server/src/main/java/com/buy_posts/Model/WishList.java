package com.buy_posts.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class WishList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Wish list owner Id.
     */
    private Integer userId;

    /**
     * Given product Id.
     */
    private Long productId;

    /**
     * Constructor.
     * @param userId owner
     * @param productId added product.
     */
    public WishList(Integer userId, Long productId) {
        this.userId = userId;
        this.productId = productId;
    } 
}
