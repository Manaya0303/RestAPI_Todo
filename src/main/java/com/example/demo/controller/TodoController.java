package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
