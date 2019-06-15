/**
 *
 * THIS SCRIPT IS FOR
 * ENHANCING THE USER INTERFACE
 * OF THE ASSYSTX SYSTEM.
 *
 */

$(function()
{
    setInterval(function(){
        retrieveAllOnlineUsers();
        courseModificationUsers()
    }, 150);
    /**
     *
     * SELECTING A
     * COURSE OFFERING
     *
     */

    $(".cwOfferings .generatedContent").on("click", ".genContentRows:not(:first-child)", function()
    {
        /* Check if the offering is selected already; if so, unselect it */
        if ($(this).css("background-color") === "rgb(60, 184, 120)") {
            freeCurrentLock();
            /* Modify course offering row appearance */
            $(".modify_sidebar").find("input:text").val("");
            $(".modify_sidebar").hide();
            $(this).removeClass("selectedOffering");
            $(this).css({'background-color': '#e2e2e2'});
        }
        /* If not, select it */
        else if ($(this).css("background-color") === "rgb(226, 226, 226)")
        {
            offeringID = $(this).find(".cols-offid").val();
            freeCurrentLock();
            if(!checkCurrentSelection(offeringID))
            {
                $(".modify_sidebar").hide();
                /* Perform AJAX */
                /* Modify course offering row appearance */
                $(".modify_sidebar").find("input:text").val("");
                $("#modify_offering_message").text("");
                $(".cwOfferings .generatedContent .genContentRows:not(:first-child)").removeClass("selectedOffering");
                $(".cwOfferings .generatedContent .genContentRows:not(:first-child)").css({'background-color' : '#e2e2e2'});
                $(this).css({'background-color' : '#3cb878'});
                $(this).addClass("selectedOffering");

                /* Perform AJAX */
                $.ajax({
                    type : "POST",
                    contentType : 'application/json',
                    url : window.location + "/find-offering",//inbuilt locking
                    data : $(this).find(".cols-offid").val(),
                    dataType : 'json',
                    success : function(result)
                    {
                        if(result.status == "Done")
                        {
                            /* Put the values into the right sidebar */
                            $("#select_right_class_type").val(result.data.classStatus); /* Class Type */
                            $("#text_section").val(result.data.classSection); /* Class Section */

                            $("#select_right_start_timeblock").val(result.data.startTime); /* Start Time */
                            $("#select_right_end_timeblock").val(result.data.endTime); /* End Time */

                            $("#startTimeHolder").val(result.data.startTime); /* Start Time */
                            $("#endTimeHolder").val(result.data.endTime); /* End Time */

                            $("#select_day1").val(result.data.day1); /* Class Day 1 */
                            $("#select_day2").val(result.data.day2); /* Class Day 2 */
                            $("#text_room").val(result.data.roomCode); /* Room Code */
                            $("#select_faculty").val(result.data.faculty); /* Faculty Name */
                            $("#text_offId").val(result.data.offeringId); /* Offering ID */

                            //border change
                            /* Show Sidebar */
                            $(".modify_sidebar").show();
                        }
                        else{
                            console.log("This course offering is locked");
                        }
                    },
                    error : function(e)
                    {
                        console.log("ERROR: ", e);
                    }
                });
            }
        }
    });

    /* Selecting a Revision in Revision History */
    $("#revisionWrapper").on("click", ".revision_holder", function()
    {
        if ($(this).hasClass("selectedRevision"))
        {
            $(".collabWorkspace .generatedContent .genContentRows:not(:first-child)").remove();
            $(this).removeClass("selectedRevision");
            $(this).css({'background-color' : '#ffffff'});
        }
        else
        {
            $(".collabWorkspace .generatedContent .genContentRows:not(:first-child)").removeClass("selectedRevision");
            $(".revision_holder").css({'background-color' : '#ffffff'});
            $(this).css({'background-color' : '#3cb878'});
            $(this).addClass("selectedRevision");

            /* Perform AJAX */
            $.ajax({
                type : "POST",
                contentType : 'application/json',
                url : window.location + "/find-revision",
                data : $(this).find(".rev-his-id").val(),
                dataType : 'json',
                success : function(result)
                {
                    if(result.status == "Done")
                    {
                        alert("Course Section = " + result.data.classSection);
                        $(".collabWorkspace .generatedContent .genContentRows:not(:first-child)").remove();

                            /* Create Divs */
                            var courseCode = "<div class='genContentCols cols-course-code'>" + result.data.courseCode + "</div>";
                            var section = "<div class='genContentCols cols-section'>" + result.data.classSection + "</div>";
                            var newDays = orderDays(result.data.day1 + result.data.day2);
                            var days = (result.data.day1 != '-') ? "<div class='genContentCols .cols-days'>" + newDays + "</div>"
                                : "<div class='genContentCols cols-days'>None</div>";
                            var time = (result.data.startTime != ':') ? "<div class='genContentCols cols-timeslot'>" + result.data.startTime + " - " + result.data.endTime + "</div>"
                                : "<div class='genContentCols cols-timeslot'>Unassigned</div>";
                            var room = "<div class='genContentCols cols-room-code'>" + result.data.roomCode + "</div>";
                            var faculty = "<div class='genContentCols cols-faculty'>" + result.data.faculty + "</div>";
                            var offeringRow = "<div class='genContentRows'>" +
                                "" + courseCode + section + days + time + room + faculty + offerid +
                                "</div>";
                        $(".collabWorkspace .generatedContent").append(offeringRow);

                    }
                },
                error : function(e)
                {
                    console.log("ERROR: ", e);
                }
            });
        }
    });

    function orderDays(days)
    {
        var schoolDays = ['M', 'T', 'W', 'H', 'F', 'S', '-'];
        days = find_unique_characters(days);
        var newDays = "";

        for (var x = 0; x < days.length; x++)
            if(x < days.length-1)
                if(schoolDays.indexOf(days.charAt(x)) > schoolDays.indexOf(days.charAt(x+1)))
                    newDays = days.charAt(x + 1) + " " + days.charAt(x);
        if(newDays == "")
            return days.replace(/\s+/g, '');
        else
            return newDays.replace(/\s+/g, '');

    }
    function checkFilters(){
        if($("#select_view_offerings").val() != "All" ||  $("#select_left_class_type").val() != "All" || $("#select_room_type").val() != "All" || $("#select_left_timeblock").val() != "All")
            return true;
        return false;
    }
    function find_unique_characters(str) {
        var unique = '';
        for (var i = 0; i < str.length; i++) {
            if(unique.indexOf(str.charAt(i))==-1)
                unique += str[i];
        }
        return unique;
    }

    /**
     *
     * SELECTING A
     * COURSE OFFERING
     *
     */

    function retrieveAllOnlineUsers()
    {
        $.ajax({
            type : "GET",
            contentType : 'application/json',
            url : window.location + "/retrieve-online-users",
            dataType : 'json',
            success : function(result)
            {
                if(result.status == "Done")
                {
                    console.log("Are You Even Going in");
                    //insert sa bar sa taas
                    $("#online_icons .online_avatar").remove();
                    $.each(result.data, function(i, user) {
                        var oneEntry = "<div class='online_avatar' id =" + 'user_' + i + ">" + user.userCharacter + "</div>";
                        $("#online_icons").append(oneEntry);
                        $("#online_icons").find('#user_' + i).css("background-color", user.userColor);
                    });
                }
            },
            error : function(e)
            {
                console.log("ERROR: ", e);
            }
        });
    }
    function freeCurrentLock()
    {
        /* Perform AJAX */
        $.ajax({
            type : "GET",
            contentType : 'application/json',
            url : window.location + "/free-offering",
            dataType : 'json',
            success : function(result)
            {
                if(result.status == "Done")
                {
                    console.log("offering is free");
                }
            },
            error : function(e)
            {
                console.log("ERROR: ", e);
            }
        });
    }
    function checkCurrentSelection(offeringID)
    {
        var locked = false;
        /* Perform AJAX */
        $.ajax({
            type : "POST",
            contentType : 'application/json',
            url : window.location + "/check-lock-offering",
            data : offeringID,
            dataType : 'json',
            success : function(result)
            {
                if(result.status == "Done")
                {
                   if(result.data.checkCourseOffering == true)
                       locked = true;
                   else
                       locked = false;
                }
            },
            error : function(e)
            {
                console.log("ERROR: ", e);
            }
        });
        return locked;
    }
    function checkCurrentSelectionUser()
    {
        var locked = false;
        /* Perform AJAX */
        $.ajax({
            type : "GET",
            contentType : 'application/json',
            url : window.location + "/check-user-lock-offering",
            data : offeringID,
            dataType : 'json',
            success : function(result)
            {
                if(result.status == "Done")
                {
                    if(result.data.checkCourseOffering == true)
                        locked = true;
                    else
                        locked = false;
                }
            },
            error : function(e)
            {
                console.log("ERROR: ", e);
            }
        });
        return locked;
    }
    function courseModificationUsers()
    {
        $.ajax({
            type : "GET",
            contentType : 'application/json',
            url : window.location + "/course-retrieve-user-locations",
            dataType : 'json',
            success : function(result)
            {
                if(result.status == "Done")
                {
                    //clear all borders
                    $(".cwofferings .generatedContent .genContentRows .cols-offid").each(function( index ) {
                        $(this).parent().css("border", "none")
                    });
                    //for each user
                    //find equivalent course offering
                    //change the border
                    $.each(result.data, function(i, user) {
                        $(".cwofferings .generatedContent .genContentRows .cols-offid").each(function( index ) {
                            if($(this).val() == user.userOfferingWhereabouts)
                            {
                                console.log($(this).val + " " + user.userOfferingWhereabouts)
                                $(this).parent().css("border", "3px solid " + user.userColor)
                            }
                        });
                    });
                }
            },
            error : function(e)
            {
                console.log("ERROR: ", e);
            }
        });
    }
});