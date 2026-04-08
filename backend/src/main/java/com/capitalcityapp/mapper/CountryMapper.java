package com.capitalcityapp.mapper;

import com.capitalcityapp.domain.Country;
import com.capitalcityapp.dto.CountryRequest;
import com.capitalcityapp.dto.CountryResponse;

public class CountryMapper {
	private CountryMapper() {
	}

	public static Country fromDto(CountryRequest r) {
		Country country = new Country();
		country.setCountry(r.country());
		return country;
	}

	public static CountryResponse toDto(Country c) {
		return new CountryResponse(
				c.getCountry(),
				c.getCode(),
				c.getCapital(),
				c.getRegion(),
				c.getPopulation(),
				c.getCurrency());
	}

}
