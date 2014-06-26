  var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
  var ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];

  function Deck()
  {
    this.cards = [];
    this.count = function()
    {
      return this.cards.length;
    }
    this.init = function()
    {
      for (s=1; s<5; s++)
      {
        for (r=1; r<14; r++)
        {
          this.cards.push(new Card(r, s));
        }
      }
    }
    this.shuffle = function ()
    {
      var m = this.cards.length, t, rand, swap;
      while (m > 0)
      {
        rand = Math.floor(Math.random() * m--);
        swap = this.cards[m];
        this.cards[m] = this.cards[rand];
        this.cards[rand] = swap;
      }
      alert("Shuffling...");
    }
    this.listCards = function ()  //Debugging function. Posts to the console all the cards in the deck.
    {
      var m = this.count();
      for (i=0; i<m; i++)
      {
        console.log(this.cards[i].show());
      }
    }
  }

  function Card(rank, suit)
  {
    this.rank = ranks[rank-1];
    this.suit = suits[suit-1];
    this.show = function ()
    {
      return this.rank + " of " + this.suit;
    }
  }

  function highLowGame (deck)
  {
    this.discard = new Deck();

    this.randomCard = function (deck)
    {
      var randSelect, randCard;
      randSelect = Math.floor(Math.random() * (deck.count() - 1));
      randCard = deck.cards[randSelect];
      deck.cards.splice(randSelect, 1);
      this.discard.cards.push(randCard);
      return randCard;
    }

    this.highCard = function (next, last)
    {
      if (ranks.indexOf(next.rank) > ranks.indexOf(last.rank))
      {
        return "h";
      }
      else if (ranks.indexOf(next.rank) < ranks.indexOf(last.rank))
      {
        return "l";
      }
      else
      {
        if (suits.indexOf(next.suit) > suits.indexOf(last.suit))
        {
          return "h";
        }
        else
        {
          return "l";
        }
      }
    }

    this.thisOrThat = function (input, first, second)
    {
      var output = input.toLowerCase();
      first = first.toLowerCase();
      second = second.toLowerCase();
      while (output != first && output != second) //keeps re-asking you if you don't say Y or N
      {
        input = prompt("No, silly. Type '" + first + "'' or '" + second + ".'");
        output = input.toLowerCase();
      }
      return output;
    }

    this.gameLoop = function (deck)
    {
      var playAgain, rightTimes, wrongTimes, firstCard, nextCard, guess;


      playAgain = "no";
      rightTimes = 0;
      wrongTimes = 0;

      firstCard = this.randomCard(deck);

      do {
        nextCard = this.randomCard(deck);
        guess = prompt("The first card is " + firstCard.show() + ". Do you think the next card will be higher or lower? (Type 'h' or 'l').");
        guess = this.thisOrThat(guess, "h", "l");

        if (this.highCard(nextCard, firstCard) == guess)
        {
          alert("The next card is " + nextCard.show() + ". You were right!");
          rightTimes++;
        }
        else
        {
          alert("The next card is " + nextCard.show() + ". You were wrong!");
          wrongTimes++;
        }
        if (deck.count() == 0) //If the last card is drawn, shuffles the discard pile back in
        {
          this.discard.shuffle();
          deck = this.discard;
          this.discard = [];
        }
        playAgain = prompt("Continue? (Type 'y' or 'n'.)");
        playAgain = this.thisOrThat(playAgain, "y", "n");
        firstCard = nextCard;
      } while (playAgain == "y");

      alert("Thanks for playing! You guessed right " + rightTimes + " time(s), and you guessed wrong " + wrongTimes + " time(s).");
    }
  }

  var d = new Deck();
  d.init();
  d.shuffle();

  var newGame = new highLowGame(d);

  newGame.gameLoop(d);

  d.listCards();  //For debugging purposes. Just want to see what's in my deck.
