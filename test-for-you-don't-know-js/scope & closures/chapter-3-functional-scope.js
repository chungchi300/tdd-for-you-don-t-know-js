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
  it('iife global', () => {});
  it('anonymous function scope', () => {});
  it('block scope ,let', () => {});
  it('block scope ,const', () => {});
  it('try catch scope', () => {});
  it('garbage collection', () => {});
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
