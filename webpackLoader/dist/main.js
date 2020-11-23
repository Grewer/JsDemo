(() => {
  console.log("Hello World from your main file!");
  var o = {bar: function () {alert(1)}};
  Object.create(o).bar()
})();
