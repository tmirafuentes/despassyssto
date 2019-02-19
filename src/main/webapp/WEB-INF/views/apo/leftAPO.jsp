<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 03-Feb-19
  Time: 3:13 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<body>
<div class="leftSidebar">
    <table class="contentFilters">
        <tr class = "leftSidebarRows">
            <td>
                <p class = "filterTitles">View Offerings Per Term</p>
                <select class = "filterForms" id="select_view_offerings">
                    <option value="All">All</option>
                    <option value="First">First Term</option>
                    <option value="Second">Second Term</option>
                    <option value="Third">Third Term</option>
                </select>
            </td>
        </tr>
        <tr class = "leftSidebarRows">
            <td>
                <p class = "filterTitles"> Search Course </p>
                <form id ="form_search_class" method="POST" modelAttribute="searchString" action="/apo/search-course">
                    <input type='text' path="searchString" class = "filterForms" id="input_search_course" placeholder = "Search Course...">
                    <button id = "submit_left_side_search" type="submit"><i class="fas fa-search"></i></button>
                </form>
            </td>
        </tr>
        <tr class = "leftSidebarRows">
            <td>
                <p class = "filterTitles"> Class Type </p>
                <select class = "filterForms" id="select_left_class_type">
                    <option value="All" selected>All</option>
                    <option value="Regular">Regular</option>
                    <option value="Elective">Elective</option>
                    <option value="Special">Special</option>
                    <option value="Dissolved">Dissolved</option>
                </select>
            </td>
        </tr>
        <tr class = "leftSidebarRows">
            <td>
                <p class = "filterTitles"> Room Type </p>
                <select class = "filterForms" id="select_room_type">
                    <c:forEach items="${allRoomTypes}" var="roomType">
                        <option value="${roomType}"><c:out value="${roomType}" /></option>
                    </c:forEach>
                </select>
            </td>
        </tr>
        <tr class = "leftSidebarRows">
            <td>
                <p class = "filterTitles"> Time Block </p>
                <select class = "filterForms" id="select_left_timeblock">
                    <c:forEach items="${uniqueTimeslots}" var="timeslots">
                        <option value="${timeslots}"><c:out value="${timeslots}" /></option>
                    </c:forEach>
                </select>
            </td>
        </tr>
        <tr class = "leftSidebarRows">
            <td>
                <p class = "filterTitles"> Class Days </p>
            </td>
        </tr>
        <tr class = "leftSidebarRows">
            <td>
                <button class = "filterClassDays" id="class_m"> M </button>
                <button class = "filterClassDays" id="class_t"> T </button>
                <button class = "filterClassDays" id="class_w"> W </button>
                <button class = "filterClassDays" id="class_h"> H </button>
                <button class = "filterClassDays" id="class_f"> F </button>
                <button class = "filterClassDays" id="class_s"> S </button>
            </td>
        </tr>
    </table>
    <div class = "sidebarMenu">
        <button class = "menuLinks" id="button_add_offering"> Add New Offering </button>
        <button class = "menuLinks" id ="button_concerns"> Concerns </button>
    </div>
</div>
</body>
</html>
