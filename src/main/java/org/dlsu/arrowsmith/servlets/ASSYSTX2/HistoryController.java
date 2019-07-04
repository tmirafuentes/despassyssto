package org.dlsu.arrowsmith.servlets.ASSYSTX2;

import org.dlsu.arrowsmith.classes.dtos.ASSYSTX2.RecentChangesDTO;
import org.dlsu.arrowsmith.classes.main.Response;
import org.dlsu.arrowsmith.services.FacultyService;
import org.dlsu.arrowsmith.services.OfferingService;
import org.dlsu.arrowsmith.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Iterator;

@RestController
@RequestMapping({"/", "/history"})
public class HistoryController
{
    /*** Services ***/
    @Autowired
    private OfferingService offeringService;

    @Autowired
    private UserService userService;

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private MessageSource messages;

    @GetMapping("/retrieve-recent-changes")
    public Response retrieveMostRecentChanges()
    {
        /* Retrieve all changes */
        Iterator workspaceHistory = userService.retrieveWorkspaceHistory();

        /* Transfer to new list */
        ArrayList<RecentChangesDTO> mostRecent = new ArrayList<>();
        for(int i = 0; i < 10 && workspaceHistory.hasNext(); i++)
        {
            RecentChangesDTO dto = (RecentChangesDTO) workspaceHistory.next();
            mostRecent.add(dto);
        }

        return new Response("Done", mostRecent.iterator());
    }
}
