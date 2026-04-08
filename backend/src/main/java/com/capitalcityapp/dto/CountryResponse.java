package com.capitalcityapp.dto;

public record CountryResponse(
		String country,
		String code,
		String capital,
		String region,
		String population,
		String currency

) {
}
