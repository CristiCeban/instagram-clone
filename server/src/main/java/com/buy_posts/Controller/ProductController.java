package com.buy_posts.Controller;

import java.io.IOException;

import com.buy_posts.DTO.ProductDto;
import com.buy_posts.Model.ProductPhotoDao;
import com.buy_posts.Model.UserDao;
import com.buy_posts.Repository.UserRepository;
import com.buy_posts.Service.ProductService;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.web.context.request.RequestContextHolder;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import net.bytebuddy.utility.RandomString;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController(value = "/api/products")
public class ProductController {
    @Autowired
    private ProductService  productService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value="/add")
    public void  postMethodName(@RequestParam("files") MultipartFile[] photos, Authentication authenticate,ProductDto product)
            throws IOException {
        String username = authenticate.getName();
		UserDao user = userRepository.findByEmail(username);
        Integer userId = user.getId();


        List<ProductPhotoDao> photo = new List<ProductPhotoDao>();
        for (MultipartFile multipartFile : photos) {
            String name = saveImage(multipartFile);
            
        }

        
    }
    

    private String saveImage(@RequestParam("image") MultipartFile img) throws IOException {
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
