package com.capitalcityapp.config;

import com.capitalcityapp.domain.Country;
import com.capitalcityapp.repository.CountryRepo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

@Configuration
public class LoadDatabase {

	@Bean
	CommandLineRunner initDatabase(CountryRepo countryRepo) {
		// Use to re-seed database
		countryRepo.deleteAll();

		return args -> {

			if (countryRepo.count() == 0) {

				try {
					ObjectMapper mapper = new ObjectMapper();
					InputStream inputStream = getClass().getResourceAsStream("/countries.json");

					List<Map<String, String>> entries = mapper.readValue(inputStream,
							new TypeReference<>() {
							});

					// Fields: name, code, capital, region, population, currency
					for (Map<String, String> entry : entries) {
						String country = entry.get("name");
						String code = entry.get("code");
						String capital = entry.get("capital");
						String region = entry.get("region");
						String population = entry.get("population");
						String currency = entry.get("currency");
						countryRepo.save(new Country(country, code, capital, region, population, currency));
					}

					System.out.println(entries.size() + " countries added to database");
				} catch (IOException e) {
					throw new IOException("Failed to load country database." + e.getMessage());
				}
			} else {
				System.out.println("DB loaded from cache with " + countryRepo.count() + " records.");
			}
		};
	};

}
