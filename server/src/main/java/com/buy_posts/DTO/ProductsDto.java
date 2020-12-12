package com.buy_posts.DTO;

import java.util.List;

import com.buy_posts.Model.ProductDao;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductsDto {
    /**
     * Total nr of Products in DB.
     */
    private long totalElements;

    /**
     * Total nr of pages.
     */
    private int totalPages;

    /**
     * Current page of Products.
     */
    private List<ProductDao> products;
}
