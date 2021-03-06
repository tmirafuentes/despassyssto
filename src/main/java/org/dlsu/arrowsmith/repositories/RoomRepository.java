package org.dlsu.arrowsmith.repositories;

import org.dlsu.arrowsmith.classes.main.Building;
import org.dlsu.arrowsmith.classes.main.Room;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface RoomRepository extends CrudRepository<Room, Long> {
    ArrayList<Room> findAllByBuilding(Building building);
    ArrayList<Room> findAllByRoomType(String roomType);
    ArrayList<Room> findAllByBuildingAndRoomType(Building building, String roomType);
    Room findRoomByRoomCode(String roomCode);
}
