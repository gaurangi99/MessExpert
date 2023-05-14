package com.spe.poll.service;

import com.spe.poll.repository.ImageRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ImageServiceTest {

    @Mock
    private ImageRepository imageRepository;

    private ImageService imageService;

    @BeforeEach
    void setUp() {
        this.imageService=new ImageService(this.imageRepository);
    }

    @Test
    void findMenu() {
        System.out.println("Setting up ImageServiceTest...");
        imageService.findMenu();
        verify(imageRepository).existsByFileName("IIITB_MENU");
    }

    @AfterEach
    void tearDown() {
        System.out.println("Tearing down ImageServiceTest...");
    }
}