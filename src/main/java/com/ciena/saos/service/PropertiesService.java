package com.ciena.saos.service;

import java.util.List;

import com.ciena.saos.entity.Property;

public interface PropertiesService {

	public List<Property> getPropertiesData();

	public void updatePropertiesData(Property properties);

	public List<Property> getUserPropertiesData(String createdBy);

	public void updateUserPropertiesData(Property properties, String createdBy);
}
