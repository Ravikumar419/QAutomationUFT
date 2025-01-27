
' Define variables
Dim excelApp, excelWorkbook, excelSheet, defectID, lastRow
' Create an instance of Excel
Set excelApp = CreateObject("Excel.Application")
excelApp.Visible = True
Set excelWorkbook = excelApp.Workbooks.Open("C:\Users\80012664\Documents\JiraDefectDetails.xlsx") ' Open existing workbook
Set excelSheet = excelWorkbook.Sheets(1)

' Open Jira in the browser
SystemUtil.Run "chrome.exe", "https://jira.maybank.com.my/"

' Wait for the page to load
Wait 5
'Login to jira
Browser("name:=System Dashboard - Maybank JIRA").Page("title:=System Dashboard - Maybank JIRA").WebEdit("name:=os_username").Set "80012664"
Browser("name:=System Dashboard - Maybank JIRA").Page("title:=System Dashboard - Maybank JIRA").WebEdit("name:=os_password").Set "Etiqa123#"
Browser("name:=System Dashboard - Maybank JIRA").Page("title:=System Dashboard - Maybank JIRA").WebButton("name:=Log In").Click

Wait 5
' Click on the "Create" button to open the defect creation form
Browser("name:=System Dashboard - Maybank JIRA").Page("title:=System Dashboard - Maybank JIRA").Link("name:=Create").Click

' Wait for the form to load
Wait 3

' Fill out the defect form
Browser("name:=Create Issue - Maybank JIRA").Page("title:=Create Issue - Maybank JIRA").WebEdit("html id:=project-field").Set "ETQ - IT Etiqa - Test Management (ITETQTM)"
Wait 3
Browser("name:=Create Issue - Maybank JIRA").Page("title:=Create Issue - Maybank JIRA").WebEdit("html id:=issuetype-field").Set "Bug"
Wait 3
Browser("name:=Create Issue - Maybank JIRA").Page("title:=Create Issue - Maybank JIRA").WebEdit("html id:=summary").Set "Automation Test"

Browser("name:=Create Issue - Maybank JIRA").Page("title:=Create Issue - Maybank JIRA").WebButton("xpath:=(//*[contains(text(),'Text')])[5]").Click
Wait 2
Browser("name:=Create Issue - Maybank JIRA").Page("title:=Create Issue - Maybank JIRA").WebEdit("html id:=description").Set "test"
Browser("name:=Create Issue - Maybank JIRA").Page("title:=Create Issue - Maybank JIRA").WebList("name:=customfield_10017").Select("3 - Medium")
Browser("name:=Create Issue - Maybank JIRA").Page("title:=Create Issue - Maybank JIRA").WebButton("innertext:=Assign to me").Click
Browser("name:=Create Issue - Maybank JIRA").Page("title:=Create Issue - Maybank JIRA").WebEdit("acc_name:=Priority").Set "Low"
Browser("name:=Create Issue - Maybank JIRA").Page("title:=Create Issue - Maybank JIRA").WebList("name:=customfield_11815").Select "UAT"

Browser("System Dashboard - Maybank").Page("System Dashboard - Maybank").WebElement("WebElement").Click

Browser("name:=Create Issue - Maybank JIRA").Page("title:=Create Issue - Maybank JIRA").WebButton("name:=Create").Click

' Wait for the defect to be created
If Browser("name:=System Dashboard - Maybank JIRA").Page("title:=System Dashboard - Maybank JIRA").WebElement("class:=aui-message closeable aui-message-success aui-will-close").Exist(6) Then
    defectID = Browser("name:=System Dashboard - Maybank JIRA").Page("title:=System Dashboard - Maybank JIRA").WebElement("class:=aui-message closeable aui-message-success aui-will-close").GetROProperty("innertext")
End If

' Capture the defect ID from the confirmation message
print defectID

Browser("name:=System Dashboard - Maybank JIRA").Page("title:=System Dashboard - Maybank JIRA").WebElement("html id:=header-details-user-fullname").Click
Browser("name:=System Dashboard - Maybank JIRA").Page("title:=System Dashboard - Maybank JIRA").Link("innertext:=Log Out").Click


' Find the last used row in the Excel sheet
lastRow = excelSheet.Cells(excelSheet.Rows.Count, 1).End(-4162).Row ' -4162 is equivalent to xlUp

' Write the defect ID to the next available row
excelSheet.Cells(lastRow + 1, 1).Value = defectID

' Save the Excel file
excelWorkbook.Save
excelWorkbook.Close
excelApp.Quit
