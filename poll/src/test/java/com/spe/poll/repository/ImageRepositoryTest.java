package com.spe.poll.repository;

import com.spe.poll.model.Image;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ImageRepositoryTest {
    @Autowired
    private ImageRepository imageRepository;

    @Test
    void existsByFileName() {
        Image image=new Image("IIITB_TEST_MENU","test");
        imageRepository.save(image);
        Boolean actualResult=imageRepository.existsByFileName("IIITB_TEST_MENU");
        assertThat(actualResult).isTrue();
    }

//    @BeforeEach
//    void setUp() {
//        System.out.println("Setting up ImageRepositoryTest...");
//        Optional<Image> prevImg=imageRepository.findByFileName("IIITB_TEST_MENU");
//        if(!prevImg.equals(null)){
//            Optional<Image> prevImage = imageRepository.findByFileName("IIITB_TEST_MENU");
//            imageRepository.deleteById(prevImage.get().getId());
//        }
//    }

    @AfterEach
    void tearDown() {
        System.out.println("Tearing down ImageRepositoryTest...");
        imageRepository.deleteById(imageRepository.findByFileName("IIITB_TEST_MENU").get().getId());
    }
}