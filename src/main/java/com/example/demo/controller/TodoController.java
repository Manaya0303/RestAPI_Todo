package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.model.Task;
import com.example.demo.service.TodoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TodoController {
	
	private TodoService todoService;
	
	@GetMapping("/todo")
	public List<Task> getAllTodo() {
		
		return todoService.getAllTasks();
	}
	
	@GetMapping("/todo/{taskId}")
	public Task getTodo(@PathVariable ("taskId") Long taskId) {
		
		return todoService.getTask(taskId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
	}
	
	@PostMapping("/todo")
	public void addTask(@RequestBody Task task) {
		
	}

}
