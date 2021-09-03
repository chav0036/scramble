/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */

function shuffle (src) {
  const copy = [...src]
  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**
 * help()
 * Displays the game instructions.
 * @Return: String
 */

function help () {
  return `Welcome to Scramble. 
The game where you unscramble letters to make words.

Once you start the game, you will be given a scrambled word.
If you correctly guess the word, you will receive a point.
If you guess incorrectly you will receive a strike.
You can also pass on a word. 

To start a new game use start().
To make guess use guess('word').
To skip a word use pass().
To show these instructions again use help().`
}

// Displays the instructions when the page loads.
console.log(help())

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

let words = ['CHOCOLATE', 'PUMPKIN', 'YELLOW', 'BROWN', 'BLACK', 'PANTHER', 'CHIPMUNK', 'FROZEN', 'SNOWMAN', 'CHRISTMAS']

let game = {
  status: false,
  randomlist: [],
  currentword: '',
  currentscrambled: '',
  strikes: 0,
  points: 0,
  maxStrikes: 3,
  passes: 0,
  maxPasses: 3
}

function scramble () {
  const a = game.randomlist[Math.floor(Math.random() * game.randomlist.length)]
  const b = a
  const c = shuffle(b)
  game.currentword = b
  game.currentscrambled = c
  return (c)
}

function start () {
  if (game.status === false) {
    game.status = true
    game.randomlist = shuffle((words.slice()))
    game.strikes = 0
    game.points = 0
    game.passes = 0
    return scramble()
  } else {
    console.warn('You have an active game. Cannot start a new game!')
    return (`Current word: \n\n ${game.currentscrambled}`)
  }
}

function guess (word) {
  if (game.status === true) {
    (game.randomlist).splice((game.randomlist).indexOf(game.currentword), 1)
    // console.log(game.randomlist)
    if (word.toUpperCase() === game.currentword) {
      game.points++
      if ((game.randomlist).length === 0) {
        console.warn(`You have guessed all the words correctly. \n Final Score: ${game.points}`)
        game.status = false
        return 'Please use start() to start a new game.'
      }
      console.warn(`Correct!Current Score: ${game.points}`)
      return `Next word: \n\n ${scramble()}`
    } else if (word.toUpperCase() !== game.currentword) {
      game.strikes++
      if (game.strikes === game.maxStrikes) {
        console.warn(`You are out of strikes. Game over. \n Final Score: ${game.points}`)
        game.status = false
        return 'Please use start() to start a new game.'
      }
      console.warn(`Wrong! You have ${game.maxStrikes - game.strikes} strike left`)
      return (`Current word: \n\n ${game.currentscrambled}`)
    }
  } else {
    console.warn(`There is no current game`)
    return 'Please use start() to start a new game.'
  }
}

function pass () {
  if (game.status === true) {
    game.passes++
    (game.randomlist).splice((game.randomlist).indexOf(game.currentword), 1)
    if (game.passes === game.maxPasses) {
      console.log('You have no passes left')
      console.log(`Final Score: ${game.points}`)
      game.status = false
      return 'Please use start() to start a new game.'
    }
    console.log(`You have only ${game.maxPasses - game.passes} pass left`)
    return `Next word: \n\n ` + scramble()
  } else {
    console.warn(`There is no current game`)
    return 'Please use start() to start a new game.'
  }
}
