package com.buy_posts.Model;

import java.io.Serializable;
import java.util.List;


public class CategoriesResponse implements Serializable{

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    
    private final List<CategoryDao> data;

    public CategoriesResponse(List<CategoryDao> data){
        this.data = data;
    }

    public List<CategoryDao> getData(){
        return this.data;
    }
}
