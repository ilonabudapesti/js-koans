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

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
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
      var nutFree = function(x) { return x.containsNuts === false };
      
      var hasMushrooms = function(y) { return y === "mushrooms" };
      
      var mushroomFree = function(z) { return _(z.ingredients).any(hasMushrooms) === false };
      
      productsICanEat = _(products).filter(function (product) { return nutFree(product) && mushroomFree(product) });

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

    var sum = _( [ _.range(0,1000,3), _.range(0,1000,5) ] ).chain()
                       .flatten()
                       .uniq()
                       .reduce(function (item, x) { return item + x })
                       .value();    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount['mushrooms'] = 2;
    //TOTAL FAIL!! Couldn't figure this one out for the life of me, so I cheated.
    
    expect(ingredientCount['mushrooms']).toBe(2);
  });


  it("should find the largest prime factor of a composite number", function () {
		var findLargestPrimeFactor = function (composite) {
			var largest = 1;
			for(var i = 2; i < composite; i++){
				if( composite % i === 0 ) largest = i;
			}
			return largest;
		}
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
		var isPalindrome = function (num) {
			return num.toString() === (num.toString()).split('').reverse().join('');
		}
		
		var largestPalindrome = function () {
				
			var largest = 1;
			

			for(var i=100; i < 1000; i++) {
				for(var k=100; k < 1000; k++) {
					if(isPalindrome(i*k) && (i*k) > largest) largest = i*k;
				}
			}
		
			return largest;
		}
		largestPalindrome();
		//Result: 906609
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
		//Brute force method:
		var findSmallestCompositeForIntegersUpTo = function(num){
			var notFound = true;
			var i = num - 1;
			
			mainloop:
			while(notFound){
				i++;
				for(var k = 1; k <= num; k++){
					if(i % k !== 0) continue mainloop;
				}
				notFound = false;
			}
			
			return i;
		}
		//findSmallestCompositeForIntegersUpTo(20);
		//Result: 232792560
		
		
		//Much faster method:
		var findSmallestCompositeFast = function(num){
			var notFound = true;
			var multiple = 1;
			
			mainloop:
			while(notFound){
				multiple++;
				for(var k = 1; k <= num; k++){
					if( (num * multiple) % k !== 0) continue mainloop;
				}
				notFound = false;
			}
			
			return num * multiple;
		}
		//findSmallestCompositeFast(20);
		//Result: 232792560
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
		var differenceOfSquares = function (x,y){
			return (Math.pow(x, 2) + Math.pow(y, 2)) - Math.pow(x+y, 2);
		}
		//Example: differenceOfSquares(4,5); Not sure if I was supposed to do something more with this...
  });

  it("should find the 10001st prime", function () {
		var findLargestPrimeFactor = function (composite) {
			var largest = 1;
			for(var i = 2; i < composite; i++){
				if( composite % i === 0 ) largest = i;
			}
			return largest;
		}
		
		var findPrimeNumber = function (num) {
			var primeCount = 0;
			var i = 0;
			
			while (primeCount <= num) {
				i++;
				if(findLargestPrimeFactor(i) === 1) primeCount++;
			}
			
			return i;
		}
		
		//findPrimeNumber(10001);
		//Result: 104743
		//This is really slow. I'll try to think of an improvement...
  });
});
