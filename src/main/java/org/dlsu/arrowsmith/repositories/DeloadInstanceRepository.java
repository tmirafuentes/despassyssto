package org.dlsu.arrowsmith.repositories;

import org.dlsu.arrowsmith.classes.main.DeloadInstance;
import org.dlsu.arrowsmith.classes.main.Deloading;
import org.dlsu.arrowsmith.classes.main.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface DeloadInstanceRepository extends CrudRepository<DeloadInstance, Long> {
    ArrayList<DeloadInstance> findAllByStartAYAndEndAYAndTerm(int startAY, int endAY, int term);
    ArrayList<DeloadInstance> findAllByStartAYAndEndAYAndTermAndFaculty(int startAY, int endAY, int term, User faculty);
    ArrayList<DeloadInstance> findAllByStartAYAndEndAYAndTermAndDeloading(int startAY, int endAY, int term, Deloading deloading);
}
