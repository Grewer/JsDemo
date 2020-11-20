console.log('Hello World from your main file!');
const foo: {
  bar: () => void
} = {
  bar: () => {
    alert(1)
  }
}

const foo2 = Object.create(foo)

foo2.bar()
