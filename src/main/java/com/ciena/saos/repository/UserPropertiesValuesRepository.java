package com.ciena.saos.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ciena.saos.entity.UserPropertyValue;

@Repository("userPropertiesValuesRepository")
public interface UserPropertiesValuesRepository extends JpaRepository<UserPropertyValue, Long> {

	@Query(value = "Select id,property_name,display_name,property_value from user_properties a left join user_properties_values b on a.id=b.property_id and b.user_name in (:userName);", nativeQuery = true)
	List<List<String>> findByUserName(String userName);

	boolean existsByUserName(String userName);

	Optional<UserPropertyValue> findByPropertyIdAndUserName(Long propertyId, String userName);


	@Query(value = "SELECT v.property_value " +
			"FROM user_properties p " +
			"JOIN user_properties_values v ON p.id = v.property_id " +
			"WHERE p.property_name = :propertyName",
			nativeQuery = true)
	List<String> findPropertyValuesByPropertyName(
			@Param("propertyName") String propertyName);



	@Query(value = "SELECT v.* " +
			"FROM user_properties_values v " +
			"JOIN user_properties p ON p.id = v.property_id " +
			"WHERE p.property_name = :propertyName " +
			"AND v.user_name = :userName",
			nativeQuery = true)
	Optional<UserPropertyValue> findByPropertyNameAndUserName(
			@Param("propertyName") String propertyName,
			@Param("userName") String userName);
}
