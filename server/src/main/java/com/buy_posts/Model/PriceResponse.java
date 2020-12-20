package com.buy_posts.Model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PriceResponse {
    Double maxPrice;
    Double minPrice;

    public PriceResponse(Double maxPrice, Double minPrice) {
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
    }

    public PriceResponse(Double maxPrice) {
        this.maxPrice = maxPrice;
    }

    
}
