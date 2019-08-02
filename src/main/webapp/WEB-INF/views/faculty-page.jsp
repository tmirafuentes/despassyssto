<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Troy Mirafuentes
  Date: 6/21/2019
  Time: 11:00 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>ASSYSTX - Faculty Profiles</title>

        <meta name="_csrf" content="${_csrf.token}"/>
        <!-- default header name is X-CSRF-TOKEN -->
        <meta name="_csrf_header" content="${_csrf.headerName}"/>

        <!-- Variables for Stylesheets and Scripts -->
        <c:url value="/css/jquery/jquery-ui.min.css" var="jqueryCss" />
        <c:url value="/css/assystx2-styles/component-styles/shorten.min.css" var="shortenCss" />
        <c:url value="/css/assystx2-styles/component-styles/datatables.css" var="dataTablesCss" />
        <c:url value="/css/assystx2-styles/manage-faculty-style.css" var="mainCss" />
        <c:url value="/scripts/extension-scripts/jquery/jquery-3.3.1.min.js" var="minJquery" />
        <c:url value="/scripts/extension-scripts/jquery/jquery-ui.min.js" var="jqueryUI" />
        <c:url value="/scripts/extension-scripts/jquery-shorten.min.js" var="shortenExt" />
        <c:url value="/scripts/main-scripts/faculty-page-script.js" var="mainScript" />
        <c:url value="/scripts/main-scripts/header-user-script.js" var="userScript" />
        <c:url value="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js" var="dataTablesExt" />
        <c:url value="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js" var="modalScriptExt" />
        <c:url value="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" var="modalCssExt" />

        <link rel="stylesheet" type="text/css" href="${jqueryCss}" />
        <link rel="stylesheet" type="text/css" href="${dataTablesCss}">
        <link rel="stylesheet" type="text/css" href="${shortenCss}">
        <link rel="stylesheet" type="text/css" href="${modalCssExt}">
        <link rel="stylesheet" type="text/css" href="${mainCss}">
    </head>
    <body>
        <div id="assystx-container">
            <!-- Header -->
            <%@ include file="screens/main-header-screen.jsp" %>

            <!-- Select Faculty Table -->
            <section id="faculty-profiles-list">
                <!-- Faculty Profiles List -->
                <section id="faculty-profiles-list-container">
                    <p class="datatables-title">
                        CCS Faculty Profiles
                    </p>
                    <div id="faculty-profiles-list-box">
                        <!-- Faculty Profiles Table -->
                        <table id="faculty-list-table" class="hover row-border order-column">
                            <thead>
                                <tr>
                                    <th>Faculty Name</th>
                                    <th>Type</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    <th>Total Load</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </section>
            </section>

            <!-- Right Partition-->
            <section id="collab-sidebar">
                <%@include file="screens/recent-changes-screen.jsp"%>
            </section>

            <!-- Selected Faculty
            <section id="selected-faculty">
                <!-- Faculty Information
                <section id="selected-faculty-container">
                    <div id="selected-faculty-box">
                        <p class="section-header-text">Faculty Profile</p>
                        <hr class="section-header-border" />

                        <!-- Faculty Profile
                        <table id="selected-faculty-info-table" class="selected-faculty-tables">
                            <tr>
                                <td colspan="3">
                                    <img src="images/black-icons/user-avatar.png" id="selected-faculty-img"
                                         alt="Selected Faculty's Image" />
                                </td>
                            </tr>
                            <tr>
                                <th colspan="3" id="selected-faculty-name">
                                    DEJA, JORDAN

                                </th>
                            </tr>
                            <tr class="selected-faculty-info-header">
                                <td>
                                    Type
                                </td>
                                <td>
                                    Dept.
                                </td>
                                <td>
                                    Active
                                </td>
                            </tr>
                            <tr class="selected-faculty-info-row">
                                <td id="selected-faculty-type">Full-Time</td>
                                <td id="selected-faculty-dept">Software Technology</td>
                                <td id="selected-faculty-active" class="active-faculty">Yes</td>
                            </tr>
                        </table>

                        <!-- Faculty Load Profile
                        <table id="selected-faculty-load-table" class="selected-faculty-tables">
                            <tr class="faculty-load-header-row">
                                <td>Teaching Load: </td>
                                <td>9</td>
                            </tr>
                            <tr class="faculty-load-row">
                                <td>HCIFACE S17</td>
                                <td>3</td>
                            </tr>
                            <tr class="faculty-load-row">
                                <td>HCIFACE S17</td>
                                <td>3</td>
                            </tr>
                            <tr class="faculty-load-row">
                                <td>HCIFACE S17</td>
                                <td>3</td>
                            </tr>
                            <tr class="faculty-load-header-row">
                                <td>Research Load: </td>
                                <td>0</td>
                            </tr>
                            <tr class="faculty-load-row">
                                <td>None</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr class="faculty-load-header-row">
                                <td>Administrative Load: </td>
                                <td>3</td>
                            </tr>
                            <tr class="faculty-load-row">
                                <td>Practicum Coordinator</td>
                                <td>3</td>
                            </tr>
                            <tr class="faculty-load-footer-row">
                                <td colspan=2>
                                    <hr class="selected-faculty-border" />
                                </td>
                            </tr>
                            <tr class="faculty-load-footer-row">
                                <td>
                                    <button id="faculty-load-deload-btn" type="button">Deload</button>
                                    <span>Total:</span>
                                </td>
                                <td>
                                    12
                                </td>
                            </tr>
                        </table>
                    </div>
                </section>
            </section>-->
        </div>

        <!-- Feedback Messages -->
        <%@include file="screens/feedback-message-screen.jsp" %>

        <!-- Modals -->
        <%@include file="screens/modals-screen.jsp" %>

        <script src="${minJquery}"></script>
        <script src="${jqueryUI}"></script>
        <script src="${shortenExt}"></script>
        <script src="${modalScriptExt}"></script>
        <script src="${dataTablesExt}"></script>
        <script src="${userScript}"></script>
        <script src="${mainScript}"></script>
    </body>
</html>