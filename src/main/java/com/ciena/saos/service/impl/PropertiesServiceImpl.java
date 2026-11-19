package com.ciena.saos.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ciena.saos.entity.Property;
import com.ciena.saos.entity.UserPropertyValue;
import com.ciena.saos.repository.PropertiesRepository;
import com.ciena.saos.repository.UserPropertiesRepository;
import com.ciena.saos.repository.UserPropertiesValuesRepository;
import com.ciena.saos.service.PropertiesService;

@Service("propertiesService")
@RequiredArgsConstructor
public class PropertiesServiceImpl implements PropertiesService {


	private final PropertiesRepository propertiesRepository;

	private final UserPropertiesRepository userPropertiesRepository;

	private final UserPropertiesValuesRepository userPropertiesValuesRepository;

	@Override
	public List<Property> getPropertiesData() {
		return propertiesRepository.findAll();
	}

	@Override
	@Transactional
	public void updatePropertiesData(Property property) {
		Property propertiesDb = propertiesRepository.findById(property.getId()).get();
		propertiesDb.setPropertyValue(property.getPropertyValue());
	}

	@Override
	public List<Property> getUserPropertiesData(String createdBy) {
		List<Property> propertyList = new ArrayList<>();
		List<List<String>> userPropertyValueList = userPropertiesValuesRepository.findByUserName(createdBy);
		for (List<String> userPropertyValue : userPropertyValueList) {
			Property property = new Property();
			property.setId(Long.parseLong(userPropertyValue.get(0)));
			property.setPropertyName(userPropertyValue.get(1));
			property.setDisplayName(userPropertyValue.get(2));
			if (userPropertyValue.get(3) == null) {
				property.setPropertyValue("");
			} else {
				property.setPropertyValue(userPropertyValue.get(3));
			}

			propertyList.add(property);
		}
		return propertyList;

	}

	@Override
	@Transactional
	public void updateUserPropertiesData(Property property, String createdBy) {
		Optional<UserPropertyValue> propertiesDb = userPropertiesValuesRepository
				.findByPropertyIdAndUserName(property.getId(), createdBy);
		if (propertiesDb.isPresent()) {
			propertiesDb.get().setPropertyValue(property.getPropertyValue());
			propertiesDb.get().setUserName(createdBy);
		} else {
			UserPropertyValue userPropertyValue = new UserPropertyValue();
			userPropertyValue.setPropertyId(property.getId());
			userPropertyValue.setPropertyValue(property.getPropertyValue());
			userPropertyValue.setUserName(createdBy);
			userPropertiesValuesRepository.save(userPropertyValue);
		}

	}
}
