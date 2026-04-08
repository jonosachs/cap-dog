package com.capitalcityapp.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Country {
	@Id
	@GeneratedValue
	private Long id;
	private String country;
	private String code;
	private String capital;
	private String region;
	private String population;
	private String currency;

	public Country() {
	}

	public Country(String country, String capital) {
		this.country = country;
		this.capital = capital;
	}

	public Country(String country, String code, String capital, String region, String population, String currency) {
		this.country = country;
		this.code = code;
		this.capital = capital;
		this.region = region;
		this.population = population;
		this.currency = currency;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public void setCapital(String capital) {
		this.capital = capital;
	}

	public String getCountry() {
		return country;
	}

	public String getCapital() {
		return capital;
	}

	public String getCode() {
		return code;
	}

	public String getRegion() {
		return region;
	}

	public String getCurrency() {
		return currency;
	}

	public String getPopulation() {
		return population;
	}

	public Long getId() {
		return id;
	}
}
