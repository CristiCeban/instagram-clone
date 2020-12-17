package com.buy_posts.Model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LikedProduct {
    private ProductDao product;
    private boolean isLiked;

    public LikedProduct(ProductDao product, boolean isLiked) {
        this.product = product;
        this.isLiked = isLiked;
    }
}
