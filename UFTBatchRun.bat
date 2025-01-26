@echo off
SET UFT_PATH="C:\Program Files (x86)\OpenText\UFT One"
SET TEST_PATH="C:\Users\80012664\Documents\AutomationProject\QAutomationUFT\QAutomationUFT\EtqJiraDefectMgt"

echo Running UFTBatchRunnerCMD.exe... > UFTExecution.log
%UFT_PATH%\bin\UFTBatchRunnerCMD.exe -source %TEST_PATH% >> UFTExecution.log 2>&1
IF ERRORLEVEL 1 (
    echo "UFTBatchRunnerCMD.exe failed with error code %ERRORLEVEL%" >> UFTExecution.log
    type UFTExecution.log
    exit /b %ERRORLEVEL%
)

echo UFT test execution completed! >> UFTExecution.log
pause