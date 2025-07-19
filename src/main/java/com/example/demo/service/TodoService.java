package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.Task;

public interface TodoService {

	List<Task> getAllTasks();
	
	Optional<Task> getTask(Long taskId);
	
	void addTask(Task task);
	
	void deleteTask(Long taskId);
	
}
