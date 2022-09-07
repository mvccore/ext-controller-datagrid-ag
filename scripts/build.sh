cd ..

rm -r ./assets/build

npm update --dev
sleep 1

cd ./node_modules/@mvccore/ext-controller-datagrid-ag-js
npm update --dev
sleep 1

rm -r ../../../assets/build
rm -r ../../../assets/declarations

npm run build
sleep 1

cd ../../..
rm -r ./assets/ag-grid-community
cp ./node_modules/@mvccore/ext-controller-datagrid-ag-js/node_modules/ag-grid-community/dist ./assets/ag-grid-community
find ./assets/ag-grid-community -name "*.scss" -type f -delete
find ./assets/ag-grid-community -name "*.hbs" -type f -delete

rm -r ./assets/moment
cp ./node_modules/@mvccore/ext-controller-datagrid-ag-js/node_modules/moment/min ./assets/moment
cp ./node_modules/@mvccore/ext-controller-datagrid-ag-js/node_modules/moment/locale ./assets/moment/locale

rm -r ./assets/ajax-min
cp ./node_modules/@mvccore/ext-controller-datagrid-ag-js/node_modules/ajax-min/builds/latest ./assets/ajax-min

echo "
Building finished.
"

read -n1 -r -p "Press any key to continue..." key