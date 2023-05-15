package com.spe.poll.controller;

import ch.qos.logback.classic.Logger;
import com.spe.poll.model.Image;
import com.spe.poll.service.ImageService;
import org.slf4j.LoggerFactory;
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

    private static final ch.qos.logback.classic.Logger log= (Logger) LoggerFactory.getLogger(ImageController.class);

    @PutMapping("/admin/addMenu")
    public ResponseEntity<?> uploadImage(@RequestBody Image image)  {
        String uploadMenuImage = String.valueOf(imageService.addMenu(image));
        if(!uploadMenuImage.equals(null)){
            log.info("Menu added!");
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadMenuImage);
    }
    @PutMapping("/admin/addSplMenu")
    public ResponseEntity<?> uploadSplMenuImage(@RequestBody Image image){
        String uploadSplMenu = String.valueOf(imageService.addSplMenu(image));
        if(!uploadSplMenu.equals(null)){
            log.info("Spl. menu added!");
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadSplMenu);
    }

    @PostMapping("/admin/getMenu/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName){
        Image image=imageService.findMenuImageByFileName(fileName);
        if(image.getFileName().equals("IIITB_MENU") || image.getFileName().equals("IIITB_SPL_MENU")){
            log.info("Menu downloaded!");
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(image);
    }

    @DeleteMapping("/admin/deleteSplMenu")
    public ResponseEntity<?> deleteSplMenuImage(){
        imageService.deleteSplMenu();
        if(imageService.findMenuImageByFileName("IIITB_SPL_MENU").equals(null)){
            log.info("Spl. Menu deleted!");
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body("Spl. Menu deleted!");
    }

    //student retrieval of menu apis
    @PostMapping("/student/getMenu")
    public ResponseEntity<?> getMenu(){
        Optional<Image> image=imageService.findMenuImage();
        if(image.get().getFileName().equals("IIITB_MENU") || image.get().getFileName().equals("IIITB_SPL_MENU")){
            log.info("Menu found!");
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(image);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<String> handleServerException(){
        log.error("IC:Internal Server error occurred!");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server error occurred!");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleBadRequestException(){
        log.error("IC:Bad Request!");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request!");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleNotFoundException(){
        log.error("IC:Not Found!");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found!");
    }
}
