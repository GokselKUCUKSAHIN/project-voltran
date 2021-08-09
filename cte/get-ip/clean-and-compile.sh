date +"%T"
echo "Cleaning..."
rm -rf ./js
echo "Compiling..."
tsc
echo "Done!"
date +"%T"