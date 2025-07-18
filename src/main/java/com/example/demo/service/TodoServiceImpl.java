package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.Task;
import com.example.demo.repository.TodoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {
	
	private final TodoRepository repository;

	@Override
	public List<Task> getAllTasks() {
		
		List<Task> allTasks = new ArrayList<>();
		repository.findAll().forEach(allTasks::add);
		
		return allTasks;
	}

	@Override
	public Optional<Task> getTask(Long taskId) {
		
		return repository.findById(taskId);
	}

	@Override
	public void addTask(Task task) {
		
		repository.save(task);
	}

	@Override
	public void deleteTask(Long taskId) {
		
		repository.deleteById(taskId);
	}

}
