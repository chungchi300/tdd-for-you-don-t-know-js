import _ from 'lodash';
function returnNothing() {
  let d = 1;
}
describe('values&primitive types', () => {
  it('primitive types&object', () => {
    //KNOWLEDGE:javascript a dynamic type language that variable can hold different type values
    //declare variable without assignment is undefined
    var a;
    expect(typeof a).toBe('undefined');

    a = 'hello world';
    expect(typeof a).toBe('string');

    a = 42;
    expect(typeof a).toBe('number');

    a = true;
    expect(typeof a).toBe('boolean');
    // "object" -- weird, bug
    a = null;
    expect(typeof a).toBe('object');

    a = undefined;
    expect(typeof a).toBe('undefined');
    a = { b: 'c' };
    expect(typeof a).toBe('object');
    a = returnNothing();
    expect(typeof a).toBe('undefined');
    //TODO test void operator in future
  });
});
describe('object', () => {
  it('basic', () => {
    //object is a compound values that has properties(A Safe pointer you can said)
    var obj = {
      a: 'hello world',
      b: 42,
      c: true,
    };
    expect(obj.a).toBe('hello world');
    expect(obj.b).toBe(42);
    expect(obj.c).toBe(true);
  });
  it('access properties by notation', () => {
    //object is a compound values that has properties(A Safe pointer you can said)
    var obj = {
      a: 'hello world',
      b: 42,
      c: true,
    };
    expect(obj['a']).toBe('hello world');
    expect(obj['b']).toBe(42);
    expect(obj['c']).toBe(true);
    //Notation can dynamic assign and get special character properties
    obj['special-character-property'] = 'dorime';
    expect(obj['special-character-property']).toBe('dorime');
    //Notatation it mean call object variable by string name(Mirror term in Java)
    let mirrorProperty = 'special-character-property';
    expect(obj[mirrorProperty]).toBe('dorime');
  });
});
describe('array - just an object,but not hold named properties but numerically indexed position', () => {
  it('basic', () => {
    var arr = ['hello world', 42, true];
    expect(arr[0]).toBe('hello world');
    expect(arr[1]).toBe(42);
    expect(arr[2]).toBe(true);
    expect(arr.length).toBe(3);
    expect(typeof arr).toBe('object');
  });
  it('object nature but avoid use it like this for inproper usage', () => {
    var arr = ['hello world', 42, true];
    expect(arr[0]).toBe('hello world');
    expect(arr[1]).toBe(42);
    expect(arr[2]).toBe(true);
    arr['special-character-property'] = 'dorime';
    expect(arr.length).toBe(3);
    expect(arr['special-character-property']).toBe('dorime');

    expect(typeof arr).toBe('object');
    //The best and most natural approach is to use arrays for numerically positioned values and use objects for named properties.
  });
});
describe('function - subtype of object but executable', () => {
  it('basic', () => {
    function foo() {
      return 42;
    }

    foo.bar = 'hello world';

    expect(typeof foo).toBe('function');
    expect(typeof foo()).toBe('number');
    expect(typeof foo.bar).toBe('string');
    //TODO  typically will only use function object properties (like foo.bar) in limited cases.
  });
});
describe('built in primitive types methods', () => {
  it('basic', () => {
    var a = 'hello world';
    var b = 3.14159;

    expect(a.length).toBe(11); // 11
    expect(a.toUpperCase()).toBe('HELLO WORLD'); // "HELLO WORLD"
    expect(b.toFixed(4)).toBe('3.1416'); // "3.1416"
  });
  it('the truth basic that primitive types value being boxed ', () => {
    var a = 'hello world';
    var b = 3.14159;

    expect(String(a).length).toBe(11); // 11
    expect(String(a).toUpperCase()).toBe('HELLO WORLD'); // "HELLO WORLD"
    expect(Number(b).toFixed(4)).toBe('3.1416'); // "3.1416"
  });
});
describe('coercion & compare values', () => {
  it('explicit', () => {
    var a = '42';

    var b = Number(a);

    expect(a).toBe('42'); // "42"
    expect(b).toBe(42); // 42 -- the number!
  });

  it('implicit', () => {
    //KNOWLEDGE:javascript allow implicit coercion so that it is weak type programming language
    var a = '42';

    var b = a * 1;

    expect(a).toBe('42'); // "42"
    expect(b).toBe(42); // 42 -- the number!
  });
  it('falsy', () => {
    //KNOWLEDGE:  The result of any comparison is a strictly boolean value (true or false), regardless of what value types are compared.
    expect(Boolean('')).toBe(false);
    expect(Boolean(0)).toBe(false);
    expect(Boolean(-0)).toBe(false);
    expect(Boolean(NaN)).toBe(false);
    expect(Boolean(null)).toBe(false);
    expect(Boolean(undefined)).toBe(false);
    expect(Boolean(false)).toBe(false);
  });
  it('truthy', () => {
    function foo() {
      return 42;
    }

    //KNOWLEDGE:  The result of any comparison is a strictly boolean value (true or false), regardless of what value types are compared.
    expect(Boolean('hellow')).toBe(true);
    expect(Boolean(42)).toBe(true);
    expect(Boolean(-42)).toBe(true);
    expect(Boolean([])).toBe(true);
    expect(Boolean([1, '2', 3])).toBe(true);
    expect(Boolean({})).toBe(true);
    expect(Boolean({ a: 'dd' })).toBe(true);
    expect(Boolean(foo)).toBe(true);
  });
  it('equality', () => {
    //== checks for value equality with coercion(implicit) allowed, and === checks for value equality without allowing coercion; === is often called "strict equality" for this reason.
    var a = '42';
    var b = 42;
    // In the a == b comparison, JS notices that the types do not match, so it goes through an ordered series of steps to coerce one or both values to a different type until the types match, where then a simple value equality can be checked.
    // therefore a == b do more calculation,become it try more way to get possitive
    //and the '42' turn to 42  for the checking
    expect(a == b).toBe(true);

    expect(a === b).toBe(false);
  });
  it('use equality and strict equality properly', () => {
    //cound be boolean,0,"",[] , use strict equality
    let born = false;
    let age = 0;
    let brithday = [];
    let name = '';
    expect(born === false).toBe(true);
    expect(age === 0).toBe(true);
    expect([] !== []).toBe(true);
    expect(name === '').toBe(true);
    //other use safe
  });
  it('equality on object,all of them are reference', () => {
    var a = [1, 2, 3];
    var c = a;
    var b = [1, 2, 3];
    expect(a == b).toBe(false);
    expect(a == c).toBe(true);
    expect(a === c).toBe(true);
  });
  it('coercion of array', () => {
    var a = [1, 2, 3];
    var c = '1,2,3';
    expect(a == c).toBe(true);
  });
  it('coercion of array', () => {
    var a = [1, 2, 3];

    expect(a + '').toBe('1,2,3');
  });
  it('no coercion of array', () => {
    var a = [1, 2, 3];
    var c = '1,2,3';
    expect(a === c).toBe(false);
  });
  it('inequality,also do coercion  and do not have strict mode', () => {
    var a = 41;
    var b = '42';
    var c = '43';
    //they try their best to be true
    expect(a < b).toBe(true);
    expect(b < c).toBe(true);
  });
  it('inequality ,do not have strict rule,and do not throw exception', () => {
    var a = 41;
    var b = 'foo';

    expect(a < b).toBe(false); // false
    expect(a > b).toBe(false); // false
    expect(a == b).toBe(false); // false
  });
});
describe('variable', () => {});
describe('conditional', () => {});
describe('strict mode', () => {});
describe('Functions As Values', () => {});
describe('this Identifier', () => {});
describe('Prototypes', () => {});
describe('Polyfilling', () => {});
describe('Transpiling', () => {});