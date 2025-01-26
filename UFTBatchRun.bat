@echo off
REM Set the path to UFT installation folder
SET UFT_PATH="C:\Program Files (x86)\OpenText\UFT One"

REM Set the path to the UFT test folder
SET TEST_PATH="C:\Users\80012664\Documents\AutomationProject\QAutomationUFT\QAutomationUFT\EtqJiraDefectMgt"

REM Run the UFT test using the Batch Runner
%UFT_PATH%\bin\UFTBatchRunnerCMD.exe -run -test %TEST_PATH%

REM Or, run the UFT test using the MicTest command
%UFT_PATH%\bin\MicTest.exe %TEST_PATH%

REM Print completion message
echo UFT test execution completed!
pause