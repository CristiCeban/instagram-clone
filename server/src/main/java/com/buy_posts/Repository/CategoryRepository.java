package com.buy_posts.Repository;

import java.util.List;

import com.buy_posts.Model.CategoryDao;

import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository  extends CrudRepository<CategoryDao, Long>{
    /**
     * Find all categories.
     *
     * @return List of categories.
     */
    List<CategoryDao> findAll();
}
