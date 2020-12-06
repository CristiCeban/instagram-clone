package com.buy_posts.Controller;

import java.util.ArrayList;
import java.util.List;

import com.buy_posts.DTO.CategoryDto;
import com.buy_posts.Model.CategoryDao;
import com.buy_posts.Service.CategoryService;
import com.nimbusds.jose.shaded.json.JSONObject;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/admin/category")
    public void addCategory(@RequestBody CategoryDto categoryInfo) {
        categoryService.addCategory(categoryInfo);
    }

    @DeleteMapping("/admin/category")
    public void deleteCategory(@RequestParam("id") Long id) {
        categoryService.deleteCategory(id);
    }

    /**
     * @param id category Id.
     * @return CategoryDTO with given Id.
     */
    public CategoryDto getCategory(@RequestParam("id") Long id) {
        return categoryService.getCategory(id);
    }

    /**
     * Get all categories from DB.
     *
     * @return List of categories.
     */
    @GetMapping(path =  "/api/categories", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object>  getCategories() {
        List<JSONObject> entities = new ArrayList<JSONObject>();
        List<CategoryDao> al = categoryService.getCategories();
        for (CategoryDao categoryDao : al) {
            JSONObject entity = new JSONObject();
        }
        return   ResponseEntity<Object>.ok(); 
    }
}
