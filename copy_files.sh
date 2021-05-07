screeps_path="/Users/philipp/Library/Application\ Support/Screeps/scripts/screeps.com/screeps"
modules=`find src -name "*.js"`
for eachfile in $modules
do
    filename=$(basename $eachfile)
    full_path="$screeps_path/$filename"
    echo $eachfile
    echo $full_path
    eval cp $eachfile $full_path
done
