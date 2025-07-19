package com.example.demo.model;

import java.sql.Timestamp;
import java.time.LocalDate;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Entity(name="m_task")
@EntityListeners(AuditingEntityListener.class)
public class Task {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long taskId;
	
	@Column(length = 100, nullable = false)
	private String title;
	
	@Column(length = 500)
	private String content;
	
	@Column(length = 200)
	private String notes;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate limitDate;
	
	private String place;
	
	@CreatedDate
	@Column(updatable = false)
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Tokyo")
	private Timestamp registeredDate;
	
	@Basic(optional = false)
	private boolean finishStatus;
	

}
