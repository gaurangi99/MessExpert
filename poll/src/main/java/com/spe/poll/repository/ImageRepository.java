package com.spe.poll.repository;

import com.spe.poll.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByFileName(String fileName);

    Boolean existsByFileName(String filename);
//
//    Image getImageByImageDataNotNull();
}
