<%--
  Created by IntelliJ IDEA.
  User: yuqy
  Date: 2017/4/3
  Time: 16:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
    <title>测试</title>
    <link rel="icon" type="static/x-icon" href="/images/favicon.ico">
    <meta itemprop="name" content="哈哈"/>
    <meta itemprop="image" content="http://ozgx9rumd.bkt.clouddn.com/aa.jpg" />
    <meta name="description" itemprop="description" content="主任最帅" />
</head>
<body>
    <table border="1">
        <thead>
            <td>编号</td>
            <td>内容</td>
        </thead>
        <tbody>
            <c:forEach items="${test}" var="itemA" varStatus="status">
             <tr>
                 <td>${itemA.id}</td>
                 <td>${itemA.value}</td>
             </tr>
            </c:forEach>
        </tbody>
    </table>
</body>
</html>
