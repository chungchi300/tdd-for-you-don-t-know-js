describe('closure is ability that inner function can continue to access function variable according to scope(lexical scope it was defined in at author-time.) even once the function has finished running ', () => {
  it('It is working because closure,Module pattern is implementated by the variable inside the constructor function variable & scope', () => {
    function User() {
      var username = '';
      var password = '';
      function addScretMessage() {
        return 'jeff';
      }
      function doLogin(user, pw) {
        //can still access outer scope,username ,password
        username = user;
        password = pw;

        // do the rest of the login work
        password = addScretMessage() + pw;
      }
      function getUsernameAndPassword() {
        return username + password;
      }
      //create an object with function
      var publicAPI = {
        login: doLogin,
        getUsernameAndPassword: getUsernameAndPassword,
      };

      return publicAPI;
    }

    // create a `User` module instance
    var fred = User();
    expect(fred.getUsernameAndPassword()).toBe('');
    fred.login('fred', '12Battery34!');
    //A Skill to utilize closure property & scope model to create object that have hide implementation(e.g addScretMessage,username,password,they are stored at the outer.scope.object)
    //A good way to mimick private and public property
    expect(fred.getUsernameAndPassword()).toBe('fredjeff12Battery34!');
  });
  it('It is no closure because no reference,and garbage collection also executed after fred is created', () => {
    function User() {
      var username = '';
      var password = '';
      function addScretMessage() {
        return 'jeff';
      }
      function doLogin(user, pw) {
        //can still access outer scope,username ,password
        username = user;
        password = pw;

        // do the rest of the login work
        password = addScretMessage() + pw;
      }
      function getUsernameAndPassword() {
        return username + password;
      }
    }

    // create a `User` module instance
    var fred = User();
  });
  it('indirect scope ', () => {
    var fn;
    var a = 100;
    function foo() {
      var a = 2;

      function baz() {
        return a;
      }

      fn = baz; // assign `baz` to global variable,so it has global reference,just like return function
    }

    function bar() {
      return fn(); // look ma, I saw closure!
    }

    foo();
    //scope written according to author time closure
    expect(bar()).toBe(2); // 2
  });
  it('timer closure', async () => {
    function wait(message) {
      return new Promise(function(resolve, reject) {
        setTimeout(
          () => {
            expect(message).toBe('Hello, closure!');
            resolve();
          },
          1000,
          message
        );
      });
    }
    var word = 'Hello, closure!';
    let timeout = await wait(word);

    word = 'Bye closure';
    expect(word).toBe('Bye closure');
    /**
    PS.
      In java,there is no such thing called closure,once function is done,it is garbage collected,so it create an anonymous object to hold the final temp variable
    **/
  });
  it('Loops + Closure', async () => {});
  it('Block Scoping Revisited', async () => {});
  it('Modules', async () => {});
  it('Modern Modules', async () => {});
  it('Future Modules', async () => {});
});
