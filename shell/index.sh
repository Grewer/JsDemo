set -e

name="foo"

echo $name


echo "I am good at ${name}Script"
echo "I am good at $name Script"

url="mo.fish"
readonly url

#unset url
#unset name
#echo $name

echo $name $url

echo ${#name}

echo ${url:1:3}
