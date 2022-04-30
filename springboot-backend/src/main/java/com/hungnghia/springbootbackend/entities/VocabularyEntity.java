package com.hungnghia.springbootbackend.entities;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Vocabulary")
public class VocabularyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "image")
    private String image;

    @Column(name = "content")
    private String content;

    @Column(name = "transcribe")
    private String transcribe;

    @Column(name = "mean_example_vocabulary")
    private String mean_example_vocabulary;

    @Column(name = "mean")
    private String mean;

    @Column(name = "explain_vocabulary")
    private String explain_vocabulary;

    @Column(name = "example_vocabulary")
    private String example_vocabulary;

    @Column(name = "file_audio")
    private String file_audio;

    @Column(name = "check_learn")
    private boolean check_learn;

    @ManyToOne
    @JoinColumn(name = "vocabulary_topic_id")
    private VocabularyTopicEntity vocabularyTopicEntity;
}
