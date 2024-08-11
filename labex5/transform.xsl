<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.gymmanagement.com/gyms">
    <xsl:template match="/gyms">
        <html>
            <head>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                        font-size: 16px;
                        text-align: left;
                    }
                    th, td {
                        border: 1px solid #dddddd;
                        padding: 8px;
                    }
                    th {
                        background-color: #f2f2f2;
                        color: #333;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    tr:hover {
                        background-color: #f1f1f1;
                    }
                    h1,h2,h3,h4 {
                        font-family: Arial, sans-serif;
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <h1>Domain Name: Gym Management</h1>
                <table border="1">
                    <tr>
                        <th>Branch ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Opening Hours</th>
                        <th>Facilities</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                    </tr>
                    <xsl:for-each select="gym">
                        <tr>
                            <td><xsl:value-of select="@id"/></td>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="phone"/></td>
                            <td><xsl:value-of select="email"/></td>
                            <td><xsl:value-of select="address"/></td>
                            <td><xsl:value-of select="openingHours"/></td>
                            <td><xsl:value-of select="facilities"/></td>
                            <td><xsl:value-of select="longitude"/></td>
                            <td><xsl:value-of select="latitude"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
                <xsl:for-each select="gym">
                    <h2>Gym Name : <xsl:value-of select="name"/></h2>
                    <h3>Facilities : <xsl:value-of select="facilities"/></h3>
                    <h4>Address : <xsl:value-of select="address"/></h4>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
