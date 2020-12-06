package com.buy_posts.Service;

import java.util.List;
import java.util.Optional;

import com.buy_posts.DTO.CategoryDto;
import com.buy_posts.Model.CategoryDao;
import com.buy_posts.Repository.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;


    public void addCategory(CategoryDto categoryInfo){
        CategoryDao category = new CategoryDao(categoryInfo.getName());
        categoryRepository.save(category);
    }

    public List<CategoryDao> getCategories(){
        return categoryRepository.findAll();
    }

    public void deleteCategory(Long id) {
        Optional<CategoryDao> optionalCategory = categoryRepository.findById(id);
        CategoryDao category = optionalCategory.orElseThrow();
        categoryRepository.delete(category);
    }

    /**
     * @param id category Id.
     * @return CategoryDTO with given Id.
     */
    public CategoryDto getCategory(Long id) {
        Optional<CategoryDao> optionalCategory = categoryRepository.findById(id);
        CategoryDao category = optionalCategory.orElseThrow();
        return new CategoryDto(category.getName());
    }
}
