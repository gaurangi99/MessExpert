package com.spe.poll.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ImageData")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileName;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "imageData",length=16777214)
    private String imageData;

    public Image(String fileName, String imageData) {
        this.fileName=fileName;
        this.imageData=imageData;
    }
}
