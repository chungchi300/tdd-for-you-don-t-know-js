'use strict';

import _ from 'lodash';

describe('Lexical scope-Javascript Scope Model', () => {
  it('scope depend on the structure(due to var hositng),and not accessable from outside', () => {
    function foo(a) {
      var b = 2;

      // some code

      function bar() {
        // ...
      }

      // more code

      var c = 3;
    }
    try {
      bar(); // fails
    } catch (e) {
      //because foo is still undefined
      expect(e instanceof ReferenceError).toBe(true);
    }
    try {
      console.log(a, b, c); // all 3 fail
    } catch (e) {
      //because foo is still undefined
      expect(e instanceof ReferenceError).toBe(true);
    }
  });
  it('encapsulate well,the global scope only see the do something function,instead of private function operation', () => {
    function doSomething(a) {
      function privateOperation(a) {
        return a * 2 - 1;
      }

      var b;

      b = a + privateOperation(a);

      return b * 3;
    }

    expect(doSomething(2)).toBe(15); // 15
  });
  it('collision example in function', () => {
    /*
    function foo() {
      function bar(a) {
        i = 3; // changing the `i` in the enclosing scope's for-loop,because they all belongs to  bar function scope
        console.log(a + i);
      }

      for (var i = 0; i < 10; i++) {
        bar(i * 2); // oops, infinite loop ahead!
      }
    }

    foo();
    */
  });
  it('collision example in library', () => {
    /*
    lib 1
    */
    var a = 10;
    function lib1work() {
      return a;
    }
    /*
    lib 2
     */
    var a = 20;
    function lib2work() {
      return b;
    }
    //if lib1 along it should be 10
    expect(lib1work()).toBe(20);
  });
  it('module management,current module dont pollute the global scope , kept in private, non-collision-susceptible scopes,it is applicatable by dependency managemer and convention ', () => {});
  it('function writing not only have the var,it also defined', () => {
    expect(foo(2)).toBe(4);
    function foo(a) {
      var b = a * 2;
      return b;
    }
  });
  it('iife do not pollute global scope', () => {
    var a = 42;

    (function IIFE() {
      a = 10;
      expect(a).toBe(10);
    })();
    expect(a).toBe(10);
    try {
      console.log(IIFE);
    } catch (e) {
      expect(e instanceof ReferenceError).toBe(true);
    }
  });
  it('iife do not pollute global scope', () => {
    var a = 42;
    //if function has (,it is and function expression,not function declaration
    (function IIFE() {
      a = 10;
      expect(a).toBe(10);
    })();
    expect(a).toBe(10);
    try {
      console.log(IIFE);
    } catch (e) {
      expect(e instanceof ReferenceError).toBe(true);
    }
  });
  it('iife with params', () => {
    var a = 42;
    //if function has (,it is and function expression,not function declaration
    (function IIFE(name) {
      a = 10;
      expect(a).toBe(10);
      expect(name).toBe('jeffchung');
    })('jeffchung');
    expect(a).toBe(10);
    try {
      console.log(IIFE);
    } catch (e) {
      expect(e instanceof ReferenceError).toBe(true);
    }
  });
  it('iife scope  ', () => {
    var a = 42;
    //if function has (,it is and function expression,not function declaration
    (function IIFE() {
      //Global of IIFE is global
      expect(a).toBe(42);
    })();

    try {
      console.log(IIFE);
    } catch (e) {
      expect(e instanceof ReferenceError).toBe(true);
    }
  });
  it('iife access global in prettier way ', () => {
    global.a = 42;
    //if function has (,it is and function expression,not function declaration
    (function IIFE(global) {
      //Global of IIFE is global
      expect(global.a).toBe(42);
    })(global);

    try {
      console.log(IIFE);
    } catch (e) {
      expect(e instanceof ReferenceError).toBe(true);
    }
  });
  it('iife ensure the undefined safe by param ', () => {
    /*
    //Javascript it is read only in safe mode,window
    undefined = true; // setting a land-mine for other code! avoid!

    (function IIFE(undefined) {
      var a;
      expect(a).toBe(undefined);
    })();
    */
  });
  it('iife invert the execution order of function(this pattern used in UMD module )', () => {
    global.a = 2;

    (function IIFE(def) {
      def(global);
    })(function def(global) {
      //var hosting
      expect(a).toBe(undefined);
      //don't effect global scope too
      expect(global.a).toBe(2);
      var a = 3;
      expect(a).toBe(3);
    });
  });
  it('anonymous function scope,also do not pollute global scope', () => {
    setTimeout(function() {
      console.log('I waited 1 second!');
    }, 1000);
    /*
      1. No name in stack trace for debug
      2. Cannot refernce itself ,it need to use deprecated arguments.callee to do recursion
      3. Missing the name reduce the readability of code
    */
  });
  it('block scope ,let belongs to nearest block{} scope', () => {
    function func1() {
      var foo = 2;

      if (foo) {
        let bar = foo * 2;
      }
      try {
        console.log(bar); // ReferenceError
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ReferenceError).toBe(true);
      }
    }
    func1();
    // console.log(bar); // ReferenceError
  });
  it('block scope ,let belongs to nearest block{} scope,it can be function or global too', () => {
    function func1() {
      var foo = 2;
      let bar;
      if (foo) {
        bar = foo * 2;
      }

      expect(bar).toBe(4);
    }
    func1();
  });
  it('block scope ,const', () => {
    function func1() {
      var foo = 2;

      if (foo) {
        const bar = foo * 2;
      }
      try {
        console.log(bar); // ReferenceError
        expect(true).toBe(false);
      } catch (err) {
        expect(err instanceof ReferenceError).toBe(true);
      }
    }
    func1();
  });
  it('try catch scope', () => {
    try {
      undefined(); // illegal operation to force an exception!
    } catch (err) {
      expect(err instanceof Error).toBe(true);
    }

    //console.log( err ); // ReferenceError: `err` not found
  });
  it('garbage collection when function execute done ', () => {
    /*
    function process(data) {
    	// do something interesting
    }

    var someReallyBigData = { .. };

    process( someReallyBigData );

    var btn = document.getElementById( "my_button" );

    btn.addEventListener( "click", function click(evt){
    	console.log("button clicked");
    }, false );
    //no garbage collection on someReallyBigData because the click function still have the reference
    */
    /*

    function process(data) {
    	// do something interesting
    }

    // anything declared inside this block can go away after!
    {
    	let/var someReallyBigData = { .. };

    	process( someReallyBigData );
    }

    var btn = document.getElementById( "my_button" );

    btn.addEventListener( "click", function click(evt){
    	console.log("button clicked");
    }, false);
    //have garbage collection on someReallyBigData
    */
  });
  it('function writing not only have the var,it also defined', () => {
    try {
      expect(foo(2)).toBe(4);
    } catch (e) {
      //because foo is still undefined
      expect(e instanceof TypeError).toBe(true);
    }

    var foo = function(a) {
      var b = a * 2;
      return b;
    };
  });
});
