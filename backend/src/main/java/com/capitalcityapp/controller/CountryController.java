package com.capitalcityapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capitalcityapp.dto.CountryResponse;
import com.capitalcityapp.service.CountryService;

// front-end's origin
@CrossOrigin(origins = {
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://localhost:3000"
})
@RequestMapping("/countries")
@RestController
class CountryController {

    private final CountryService service;

    CountryController(CountryService service) {
        this.service = service;
    }

    @GetMapping("")
    List<CountryResponse> all() {
        return service.findAll();
    }

    @GetMapping("/{country}")
    CountryResponse getCountry(@PathVariable String country) {
        return service.findByName(country);
    }

}
