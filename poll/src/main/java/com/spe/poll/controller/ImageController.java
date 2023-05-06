package com.spe.poll.controller;

import com.spe.poll.model.Image;
import com.spe.poll.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @PutMapping("/admin/addMenu")
    public ResponseEntity<?> uploadImage(@RequestBody Image image)  {
        String uploadMenuImage = String.valueOf(imageService.addMenu(image));
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadMenuImage);
    }
    @PutMapping("/admin/addSplMenu")
    public ResponseEntity<?> uploadSplMenuImage(@RequestBody Image image){
        String uploadSplMenu = String.valueOf(imageService.addSplMenu(image));
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadSplMenu);
    }

    @PostMapping("/admin/getMenu/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName){
        Image image=imageService.findMenuImageByFileName(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .body(image);
    }

    @DeleteMapping("/admin/deleteSplMenu")
    public ResponseEntity<?> deleteSplMenuImage(){
        imageService.deleteSplMenu();
        return ResponseEntity.status(HttpStatus.OK)
                .body("Spl. Menu deleted!");
    }



    //student retrieval of menu apis
    @PostMapping("/student/getMenu")
    public ResponseEntity<?> getMenu(){
        Optional<Image> image=imageService.findMenuImage();
        return ResponseEntity.status(HttpStatus.OK)
                .body(image);
    }
}
