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

arr=($name $url)
echo ${arr[1]}

arr=($name $url)
echo ${arr[@]}


length=${#arr[@]}

echo $length

if [ $name == "foo" ]
then
  echo "name 是 foo"
fi

if [ $name != "foo" ]
then
  echo "name 是 foo"
else
  echo "不符合"
fi


if [ $name == "bar" ] ;then
  echo "name 是 bar"
elif [ $name == "foo" ]; then
  echo "name 是 foo"
else
  echo "不符合"
fi


for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done

int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done


GrewerFn(){
    echo "这是我的第一个 shell 函数!"
}

GrewerFn

GrewerFn(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "打印所有参数 $@ !"
}

GrewerFn 1 "qwer" "zxc"
