<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 03-Feb-19
  Time: 3:08 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<body>
<div id = "left_side">
    <table id = "left_side_content">
        <tr class = "left_side_rows">
            <td class ="left_side_rows_content">
                <p class = "left_side_text"> View Offerings </p>
                <select class = "left_side_select" id="select_view_offerings"> </select>
            </td>
        </tr>
        <tr class = "left_side_rows">
            <td class ="left_side_rows_content">
                <p class = "left_side_text"> Search Course </p>
                <form id ="form_search_class">
                    <input class = "left_side_select" id="input_search_course"placeholder = "Search Course...">
                    <button id = "submit_left_side_search"><i class="fas fa-search"></i></button>
                </form>
            </td>
        </tr>
        <tr class = "left_side_rows">
            <td class ="left_side_rows_content">
                <p class = "left_side_text"> Class Type </p>
                <select class = "left_side_select" id="select_left_class_type"> </select>
            </td>
        </tr>
        <tr class = "left_side_rows">
            <td class ="left_side_rows_content">
                <p class = "left_side_text"> Room Type </p>
                <select class = "left_side_select" id="select_room_type"> </select>
            </td>
        </tr>
        <tr class = "left_side_rows">
            <td class ="left_side_rows_content">
                <p class = "left_side_text"> Time Block </p>
                <select class = "left_side_select" id="select_left_timeblock"> </select>
            </td>
        </tr>
        <tr class = "left_side_rows">
            <td class ="left_side_rows_content">
                <p class = "left_side_text"> Class Days </p>
            </td>
        </tr>
        <tr class = "left_side_rows">
            <td>
                <button class = "class_days" id="class_m"> M </button>
                <button class = "class_days" id="class_t"> T </button>
                <button class = "class_days" id="class_w"> W </button>
                <button class = "class_days" id="class_h"> H </button>
                <button class = "class_days" id="class_f"> F </button>
                <button class = "class_days" id="class_s"> S </button>
            </td>
        </tr>
    </table>
    <div id = "left_button_holder">
        <!-- Go to Faculty Load Page -->
        <a href="/cvc/manage-load" class = left_buttons id ="button_view_faculty"> View Faculty<br>Load Information</a>

        <!-- Go To Deloading Page -->
        <button class = left_buttons id="button_deloading"> Deloading </button>
        <button class = left_buttons id ="button_concerns"> Concerns </button>
    </div>
</div>
</body>
</html>