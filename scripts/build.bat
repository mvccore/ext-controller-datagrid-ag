@cd ..

@if exist .\assets\build (
	@rmdir .\assets\build /s /q
)

call npm update --include=dev
@timeout 1

@cd .\node_modules\@mvccore\ext-controller-datagrid-ag-js
call npm update --include=dev
@timeout 1

@if exist ..\..\..\assets\build (
	@rmdir ..\..\..\assets\build /s /q
)
@if exist ..\..\..\assets\declarations (
	@rmdir ..\..\..\assets\declarations /s /q
)

call npm run build
@timeout 1

@cd ..
@call xcopy /E /I .\ext-controller-datagrid-ag\assets\build ..\..\assets\build
@call xcopy /E /I .\ext-controller-datagrid-ag\assets\declarations ..\..\assets\declarations

@cd ..\..
@rmdir .\assets\ag-grid-community /s /q
@call xcopy /E /I .\node_modules\@mvccore\ext-controller-datagrid-ag-js\node_modules\ag-grid-community\dist .\assets\ag-grid-community
@del /S .\assets\ag-grid-community\*.scss
@del /S .\assets\ag-grid-community\*.hbs

@rmdir .\assets\moment /s /q
@call xcopy /E /I .\node_modules\@mvccore\ext-controller-datagrid-ag-js\node_modules\moment\min .\assets\moment
@call xcopy /E /I .\node_modules\@mvccore\ext-controller-datagrid-ag-js\node_modules\moment\locale .\assets\moment\locale

@rmdir .\assets\ajax-min /s /q
@call xcopy /E /I .\node_modules\@mvccore\ext-controller-datagrid-ag-js\node_modules\ajax-min\builds\latest .\assets\ajax-min

@rmdir .\node_modules /s /q
@del /S .\package-lock.json

@cd .\scripts

@echo.
@echo Building finished.
@echo.

@pause