package org.dlsu.arrowsmith.repositories;

import org.dlsu.arrowsmith.classes.Building;
import org.dlsu.arrowsmith.classes.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface BuildingRepository extends CrudRepository<Building, Long> {
    Building findBuildingByBldg_id(Long bldg_id);
    Building findBuildingByBldg_name(String bldg_name);
}