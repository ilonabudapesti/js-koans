var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {                          // missing var here! why? seems like bad practice
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {   // missing here too...
               if (products[i].ingredients[j] === "mushrooms") { 
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      function noNuts (product) {
        return product.containsNuts === false;
      }

      function noMushrooms (product) {
        return _.all( product.ingredients, function (ingredient) {
         return ingredient !== "mushrooms" }
        )}

      productsICanEat.push( _(products).chain()
          .filter(noNuts)
          .filter(noMushrooms)
          .value()
      )

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    /* try chaining range() and reduce() */

    var sum = _( _.range(1,1000) ).chain()                
      .filter( function (val) { return val % 3 === 0 || val % 5 === 0 } )
      .reduce( function (memo, val) { return memo + val } )
      .value()
      ;

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {                          // missing var...
        for (j = 0; j < products[i].ingredients.length; j+=1) {       // missing var...
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    _(products).chain()
      .map( function (v,k) { return products[k].ingredients } )
      .flatten()
      .reduce( function (mem,v,k,ar) { ingredientCount[v] = (ingredientCount[v] || 0) + 1 } )

      // from what I understand, this is a terrible use of reduce (causing side effects), but I 
      // couldn't figure out a direct solution, and the code provides us with ingredientCount,
      // which seems to suggest it's seeking an answer like the one I've provided.

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {

    function largestPrimeFactor (inputNumber) {
      var testNumber = inputNumber;
      while (testNumber > 1) {
        testNumber --;
        if (inputNumber % testNumber === 0) {
          // it's a factor! but is it prime?
          for (var i = testNumber - 1; i > 1; i--) {
            if (testNumber % i === 0) break; // not prime
            if (i === 2) return testNumber; // the answer!
          }
        }
      }
      return 'Invalid input. Composite numbers only.';
    }
    
    expect(largestPrimeFactor(12345)).toBe(823);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    function largestPalindrome () {
      var palindromes = [];

      for (var i = 999; i > 900; i--) {     // did I make it any clearer this way? or should
        findPalindromesForMultiplier(i);    // I have just nested for loops... hrmm...
      }                                     

      function findPalindromesForMultiplier (staticMultiplier) {
        for (var n = 999; n > 900; n--) {
          if ( isPalindrome(staticMultiplier * n) ) palindromes.push(staticMultiplier * n);
        }
      }

      function isPalindrome (inputNumber) {
        return inputNumber === parseInt( inputNumber.toString().split('').reverse().join('') );
      }

      return Math.max.apply(Math, palindromes);
    }

    expect( largestPalindrome() ).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    
    function smallestNumberDivisible() {    // slow! causes koans page to lag :(
      for (var num = 21; ; num ++) {
        if ( isDivisible(num) ) return num;
      }

      function isDivisible (inputNumber) {
        for (var i = 1; i <= 20; i++) {
          if (inputNumber % i !== 0) return false;
        }
        return true;

      }
    }

    expect( smallestNumberDivisible() ).toBe( 232792560 );
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    function differenceBetweenSummedSquaresAndSquaredSums (inputArray) {

      var summedSquares = _(inputArray).chain()
        .map( function (num) { return Math.pow(num, 2); } )
        .reduce( function (memo, num) { return memo + num; } )
        .value()

      // tried to use a .chain() for readability below, but could not find a way to continue it after the reduce()
      var squaredSums = Math.pow(  _(inputArray).reduce( function (memo, num) { return memo + num; } ), 2 );
      
      return Math.abs( squaredSums - summedSquares );
     
    }

    expect( differenceBetweenSummedSquaresAndSquaredSums( _.range(1,11) ) ).toBe( 2640 );
  });

  it("should find the 10001st prime", function () {

    expect(answer).toBe(FILL_ME_IN);
  });
  
});
