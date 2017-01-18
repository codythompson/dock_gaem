oname=shader_strings.js

echo "(function (scope) {" > $oname
echo "var vert = {};" >> $oname
echo "var frag = {};" >> $oname

for fnm in *.vs
do
  name=$( basename $fnm )
  # taken from http://stackoverflow.com/a/965072
  name="${name%.*}"
  echo "vert['$name'] = ''" >> $oname

  while read ln
  do
    echo "+ '$ln'" >> $oname
  done < $fnm
  echo ";" >> $oname
done

for fnm in *.fs
do
  name=$( basename $fnm )
  # taken from http://stackoverflow.com/a/965072
  name="${name%.*}"
  echo "frag['$name'] = ''" >> $oname

  while read ln
  do
    echo "+ '$ln'" >> $oname
  done < $fnm
  echo ";" >> $oname
done

scope_path=$1
if [ -z "$scope_path" ] 
then
  scope_path="\$dock.render"
fi
echo "scope.$scope_path.shader_sources = {vert: vert, frag: frag };" >> $oname

echo "})(this);\n" >> $oname
