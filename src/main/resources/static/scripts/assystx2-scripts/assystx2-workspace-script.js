/*
 *
 *  ASSYSTX2 SCRIPT
 *  FOR COLLABORATIVE WORKSPACE
 *
 *  This script is for the collaborative workspace
 *  pages of the ASSYSTX2 system. These includes
 *  functions for course offering management, create
 *  a new offering, concerns management, online users,
 *  and revision history/recent changes.
 *
 */

$(function() {
    /*
     *
     *  ONLOAD FUNCTIONS
     *
     */
    showPartialOfferings(0);
    var courseCodes = [];
    retrieveAllCourses();

    /*
     *  COURSE OFFERING MANAGEMENT
     *  EVENT LISTENERS
     *
     */

    /*  This event listener retrieves the
     *  previous page of a partial list of
     *  course offerings and displays it in
     *  the system.
     */
    $("#all-offerings-box").on('click', '#offerings-prev-page', function()
    {
        var pageNum = $("#offerings-prev-page").data("page-num");
        showPartialOfferings(pageNum);
    });

    /*  This event listener retrieves the
     *  next page of a partial list of
     *  course offerings and displays it in
     *  the system.
    */
    $("#all-offerings-box").on('click', '#offerings-next-page', function()
    {
        var pageNum = $("#offerings-next-page").data("page-num");
        showPartialOfferings(pageNum);
    });

    /*
     *  COURSE OFFERING MANAGEMENT
     *  FUNCTION IMPLEMENTATIONS
     *
    */

    /*  This function retrieves a partial list
 *  of course offerings from the database
 *  and displays it in the system.
 */
    function showPartialOfferings(pageNum)
    {
        $.ajax({
            type : "GET",
            url : window.location + "show-offerings?page=" + pageNum,
            success : function(result)
            {
                /* Code for removing the currently displayed course offerings */
                $("form .all-offerings-row").remove();
                $(".all-offerings-row-border").remove();
                $("#all-offerings-page-menu").remove();

                if(result.status === "Empty")
                {
                    var startPageList = "<ul id='all-offerings-page-menu'>" +
                                        "<li class='unavailable-page'>&nbsp;</li>" +
                                        "<li>" + result.data + "</li>" +
                                        "<li class='unavailable-page'>&nbsp;</li>" +
                                        "</ul>";
                    $(startPageList).appendTo("#all-offerings-box");
                }
                else if(result.status === "Done")
                {
                    /* Display each offering into the system */
                    $.each(result.data.currPartialOfferings, function(i, offering)
                    {
                        /* Create individual list items */
                        var startForm = "<form action='/assign-room' method='POST' class='assign-room-form'>";
                        var startlist = "<ul class='all-offerings-row'>";
                        var course = "<li class='cols-course'>" + offering.courseCode +
                                     "<input value='" + offering.courseCode + "' name='courseCode' hidden /> </li>";
                        var section = "<li class='cols-section'>" + offering.section +
                                      "<input value='" + offering.section + "' name='section' hidden /> </li>";
                        var days = "<li class='cols-days'>" + offering.day1 + " " + offering.day2 + "</li>";
                        var timeslot = "<li class='cols-timeslot'>" + offering.startTime + " - " + offering.endTime + "</li>";
                        var room = "<li class='cols-room'>" + offering.roomCode + "</li>";
                        var faculty = "<li class='cols-faculty'>" + offering.facultyName + "</li>";
                        var menu = "<li>" +
                            "<div class='all-offerings-row-popup'>" +
                            "<img src='/images/black-icons/vertical-dot-menu.png' class='all-offerings-row-img' />" +
                            "<div class='all-offerings-dropdown-menu'>" +
                            "<button type='submit' class='offering-assign-room-button'>Assign Room</button>" +
                            "<button type='button' class='offering-raise-concerns-button'>Raise Concerns</button>" +
                            "<button type='button' class='offering-edit-section-button'>Edit Section</button>" +
                            "<button type='button' class='offering-view-details-button'>View More Details</button>" +
                            "<button type='button' class='offering-special-class-button'>Mark as Special Class</button>" +
                            "<button type='button' class='offering-dissolve-offering-button'>Dissolve Offering</button>" +
                            "</div></div></li></ul></form>";
                        var border = "<hr class='all-offerings-row-border' />";

                        var offering_row = startForm + startlist + course + section + days + timeslot + room + faculty + menu + border;

                        /* Insert after border */
                        $(offering_row).insertAfter("#all-offerings-header-border");
                    });

                    /* Add Pagination Features into the system */
                    var startPageList = "<ul id='all-offerings-page-menu'>";
                    var prevPage = "<li ";
                    if (result.data.hasPrev == false) { prevPage = prevPage + "class='unavailable-page'"; }
                    if (result.data.hasPrev == true)
                    {
                        prevPage = prevPage + "><a id='offerings-prev-page' data-page-num='" +
                            (result.data.currPageNum - 1) + "'> <- Prev </a> </li>";
                    }
                    else { prevPage = prevPage + "> <- Prev </li>"; }
                    var currPage = "<li>Page " + (result.data.currPageNum + 1) + " of " + result.data.totalPages + "</li>";
                    var nextPage = "<li ";
                    if (result.data.hasNext == false) { nextPage = nextPage + "class='unavailable-page'"; }
                    if (result.data.hasNext == true)
                    {
                        nextPage = nextPage + "><a id='offerings-next-page' data-page-num='" +
                            (result.data.currPageNum + 1) + "'> Next -> </a> </li>";
                    }
                    else { nextPage = nextPage + "> Next -> </li>"; }
                    var endPageList = "</ul>";

                    var pageList = startPageList + prevPage + currPage + nextPage + endPageList;

                    $(pageList).appendTo("#all-offerings-box");
                }
            },
            error : function(e)
            {
                var startPageList = "<ul id='all-offerings-page-menu'>" +
                    "<li class='unavailable-page'>&nbsp;</li>" +
                    "<li>" + "There is an error loading the course offerings." + "</li>" +
                    "<li class='unavailable-page'>&nbsp;</li>" +
                    "</ul>";
                $(startPageList).appendTo("#all-offerings-box");
            }
        });
    }

    /*
     *  CREATE NEW OFFERING
     *  EVENT LISTENERS
     *
    */

    /* This event listener retrieves
     * the list of courses to guide
     * the APO in creating an offering.
    */
    $("#add-offering-course").autocomplete({
        minLength : 3,
        source : courseCodes
    });

    /*  This event listener submits a form
     *  which includes the course offering
     *  and section to the database.
    */
    $("#add-offering-box").on('click', "#add-offering-submit", function()
    {
        /* Retrieve input from text fields */
        var courseCode = $("#add-offering-course").val();
        var section = $("#add-offering-section").val();

        /* Check if it's not empty and then submit */
        if (courseCode.length == 7 && section.length <= 4 && section.length > 0)
        {
            createNewOffering(courseCode, section);
        }
        else
        {
            displayNegativeMessage("Invalid input for create new offering!");
        }
    });

    /*  This event listener submits a form
     *  which includes the course offering
     *  and section to the database and goes
     *  to the assign room page.
    */
    $("#add-offering-box").on('submit', "#add-offering-room", function()
    {
        /* Retrieve input from text fields */
        var courseCode = $("#add-offering-course").val();
        var section = $("#add-offering-section").val();

        /* Check if it's not empty and then submit */
        if (courseCode.length == 7 && section.length <= 4)
        {
            createNewOffering(courseCode, section);
        }
    });

    /* Add Offering partition's front-end
     * functionality of appearing and disappearing
     * text fields
    */
    $("#add-offering-course").focusin(function(e)
    {
        /* Change color of course code */
        $("#add-offering-course").css("background-color", "#ffffff");

        /* Make the other fields appear */
        $("#add-offering-section").fadeIn(500);
        $("#add-offering-room").fadeIn(500);
        $("#add-offering-submit").fadeIn(500);
    });

    $("#add-offering-course").focusout(function(e)
    {
        /* Make the other fields disappear unless there is content */
        if ($("#add-offering-course").val() == "")
        {
            /* Change color of course code */
            $("#add-offering-course").css("background-color", "#00e08e");

            $("#add-offering-section").val("");
            $("#add-offering-section").fadeOut(500);
            $("#add-offering-room").fadeOut(500);
            $("#add-offering-submit").fadeOut(500);
        }
    });

    /*
     *  CREATE NEW OFFERING
     *  FUNCTION IMPLEMENTATIONS
     *
    */

    /*  This function retrieves all
     *  course codes in the database.
    */
    function retrieveAllCourses()
    {
        /* Perform AJAX */
        $.ajax({
            type : "GET",
            url : window.location +  "autocomplete-course-code",
            success : function(result)
            {
                if(result.status == "Done")
                {
                    $.each(result.data, function(i, cc)
                    {
                        courseCodes.push(cc);
                    });
                }
            },
            error : function(e)
            {
                console.log("Error = " + e);
            }
        });
    }

    /*  This function creates a new offering
     *  through submitting the course code
     *  and section.
     */
    function createNewOffering(courseCode, section)
    {
        /* Prepare form data */
        var formData =
        {
            courseCode : courseCode,
            section : section
        };

        /* Perform AJAX */
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : window.location + "create-new-offering",
            data : JSON.stringify(formData),
            dataType : "json",
            success : function(result)
            {
                if(result.status == "Done")
                {
                    /* Reset text fields */
                    $("#add-offering-course").val("");
                    $("#add-offering-section").val("");

                    /* Update course offerings */
                    showPartialOfferings(0);

                    /* Display Message */
                    displayPositiveMessage(result.data);
                }
            },
            error : function(e)
            {
                displayNegativeMessage("An error occurred while creating a new offering.");
            }
        });
    }

    /*
     *  FILTER OFFERINGS
     *  FUNCTION IMPLEMENTATIONS
     *
    */

    /* Load Courses Available For Dropdown Filter */
    function retrieveFilterCourses()
    {
        $.ajax({
            type : "GET",
            url : window.location + "retrieve-filter-courses",
            success : function(result)
            {

            }
        });
    }

    /* Load Time Slots Available For Dropdown Filter */
    function retrieveFilterTimeslots()
    {
        $.ajax({
            type : "GET",
            url : window.location + "retrieve-filter-timeslots",
            success : function(result)
            {

            }
        });
    }

    /* Load Buildings Available For Dropdown Filter */
    function retrieveFilterBuildings()
    {
        $.ajax({
            type : "GET",
            url : window.location + "retrieve-filter-buildings",
            success : function(result)
            {

            }
        });
    }


    /*
     *  FEEDBACK MESSAGES
     *  FUNCTION IMPLEMENTATIONS
     *
    */

    /*  This function creates a feedback
     *  message and displays it in the system.
     */
    function displayPositiveMessage(message)
    {
        /* Put message */
        $("#positive-feedback-message").text(message);

        /* Show feedback message */
        $("#positive-feedback-message").slideDown(500, function()
        {
            setTimeout(function()
                {
                    $("#positive-feedback-message").slideUp(500);
                },
                5000);
        });
    }

    function displayNegativeMessage(message)
    {
        /* Put message */
        $("#negative-feedback-message").text(message);

        /* Show feedback message */
        $("#negative-feedback-message").slideDown(500, function()
        {
            setTimeout(function()
                {
                    $("#negative-feedback-message").slideUp(500);
                },
                5000);
        });
    }
});