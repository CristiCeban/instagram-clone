package com.buy_posts.Controller;

import java.io.IOException;

import com.buy_posts.DTO.ProductDto;
import com.buy_posts.Model.ProductDao;
import com.buy_posts.Model.ProductPhotoDao;
import com.buy_posts.Model.UserDao;
import com.buy_posts.Repository.UserRepository;
import com.buy_posts.Service.ProductPhotoService;
import com.buy_posts.Service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.web.context.request.RequestContextHolder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import net.bytebuddy.utility.RandomString;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// @CrossOrigin("http://localhost:1234")
@RestController
@RequestMapping(path = "/api/products")
public class ProductController {
    @Autowired
    private ProductService  productService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductPhotoService photoService;

    // @RequestParam("productInfo") String productInfo 
    @PostMapping(value="/add")
    public List<String>  postMethodName(@RequestParam("files") MultipartFile[] photos, Authentication authenticate,String name,String long_description,String short_description,String price,String categoryId)
            throws IOException {
        String username = authenticate.getName();
		UserDao user = userRepository.findByEmail(username);
        Integer userId = user.getId();
        List<String> fileNames = new ArrayList<>();
        double priceParsed = Double.parseDouble(price);
        long categoryParsed = Long.parseLong(categoryId);
        ProductDto prod = new ProductDto(name,long_description,short_description,priceParsed,categoryParsed);
        Arrays.asList(photos).stream().forEach(file -> {
            fileNames.add(file.getOriginalFilename());
            try {
                saveImage(file);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
          });

        


        // ProductDto productDTO = new ObjectMapper().readValue(productInfo, ProductDto.class);
        // ProductDto productDTO = new ObjectMapper().readValue(productInfo, ProductDto.class);
        

        ProductDao product = productService.addProduct(prod, userId);

        List<ProductPhotoDao> productPhotos = new ArrayList<>();
        for (String string : fileNames) {
            // productPhotos.add(new ProductPhotoDao(string, product));
            productPhotos.add(photoService.addPhotoToProduct(string, product));
        }

        // product.setPhotos(productPhotos);
        // long productId = product.getId();


        // System.out.println(userId);
        // for (MultipartFile multipartFile : photos) {
        //     System.out.println(multipartFile.getOriginalFilename()); 
        // }

        
        return fileNames;

        
    }
    

    private String saveImage(@RequestParam("files") MultipartFile img) throws IOException {
        Path path = Paths.get("products");
        if (!Files.exists(path)) {
            Files.createDirectory(path);
        }

            String randomString = RandomString.make(10);
            String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
            String hex = DigestUtils.sha256Hex(sessionId);
            String extension = img.getOriginalFilename().split("\\.")[1];
            String filename = "products/" + randomString + hex + "." + extension;
            File upl = new File(filename);
            upl.createNewFile();
            FileOutputStream os = new FileOutputStream(upl);
            os.write(img.getBytes());
            os.close();

        return filename;
    }
}
