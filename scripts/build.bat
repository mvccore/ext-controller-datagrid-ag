@setlocal EnableDelayedExpansion
@set currentDir=%cd%

@cd ..

@rmdir .\assets\build /s /q

call npm update --dev
@timeout 1

@cd .\node_modules\@mvccore\ext-controller-datagrid-ag-js
call npm update --dev
@timeout 1

call npm run build
@timeout 1

@cd ..\..\..
@rmdir .\assets\ag-grid-community /s /q
@call xcopy /E /I .\node_modules\ag-grid-community\dist .\assets\ag-grid-community
@del /S .\assets\ag-grid-community\*.scss
@del /S .\assets\ag-grid-community\*.hbs

@echo.
@echo Building finished.
@echo.

@pause