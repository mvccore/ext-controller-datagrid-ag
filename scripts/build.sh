cd ..

rm -r ./assets/build

npm update --dev
sleep 1

cd ./node_modules/@mvccore/ext-controller-datagrid-ag-js
npm update --dev
sleep 1

npm run build
sleep 1

cd ../../..
rm -r ./assets/ag-grid-community
mv ./node_modules/ag-grid-community/dist ./assets/ag-grid-community
find ./assets/ag-grid-community -name "*.scss" -type f -delete
find ./assets/ag-grid-community -name "*.hbs" -type f -delete

echo "
Building finished.
"

read -n1 -r -p "Press any key to continue..." key