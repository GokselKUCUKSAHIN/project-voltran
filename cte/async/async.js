function say(str) {
  console.log(str);
}

function sayAsync(str) {
  setTimeout(function () {
    say(str);
  }, 0);
}

(_ => {
  say('a');
  say('b');
  sayAsync('c');
  say('d');
})();