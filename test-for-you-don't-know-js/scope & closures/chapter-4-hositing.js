describe('Var hosting', () => {
  it('hosting example1', () => {
    a = 2;

    var a;

    expect(a).toBe(2);
  });
  it('hosting example1 reality', () => {
    //Tokenization move
    var a;
    a = 2;
    //execucated,the JIT compiler already ask scope to prepare the var a when Tokenization
    //var a;

    expect(a).toBe(2);
  });
  it('hosting example2', () => {
    expect(a).toBe(undefined);

    var a = 2;
  });
  it('hosting example2 reality', () => {
    //Tokenization move
    var a;
    expect(a).toBe(undefined);

    a = 2;
    //execucated,the JIT compiler already ask scope to prepare the var a when Tokenization
  });
});
describe('Function hositing', () => {
  it('hosting included expression example1', () => {
    foo();

    function foo() {
      expect(a).toBe(undefined);

      var a = 2;
    }
  });
  it('hosting  included expression example1 reality', () => {
    //it host the function name foo,and function expression so it is executable
    function foo() {
      expect(a).toBe(undefined);

      var a = 2;
    }
    foo();
  });
  it('hosting without expression example1', () => {
    try {
      foo();
      expect(true).toBe(false);
    } catch (e) {
      expect(e instanceof TypeError);
    }

    var foo = function() {
      expect(a).toBe(undefined);

      var a = 2;
    };
  });
  it('hosting  without expression example1 reality', () => {
    //it host the function name foo,and function expression so it is executable
    var foo;
    try {
      foo();
      expect(true).toBe(false);
    } catch (e) {
      expect(e instanceof TypeError);
    }

    foo = function() {
      expect(a).toBe(undefined);

      var a = 2;
    };
  });
  /*
    Ref hosting example extreme
    foo(); // TypeError
bar(); // ReferenceError

var foo = function bar() {
	// ...
};
This snippet is more accurately interpreted (with hoisting) as:

var foo;

foo(); // TypeError
bar(); // ReferenceError

foo = function() {
	var bar = ...self...
	// ...
}

  */
});
describe('Function hositing occur before variable hosting', () => {});
