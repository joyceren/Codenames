// Here is where im going to put all my thoughts about:

// how the components should look, and how/where they are called
// whether we should even give them a state
// things on state


// what exactly i would put in each of the components




//check current players
//check how many spymasters
//

//set player = for determingin the number of players

-------------------

'/' => mainPage
  renders the image and
  button that links to = "/home" -- HomePage(currently named start)

-------------------

'/home' => HomePage (currently named Start)
  current props = {user, auth}
  (wrapped withAuth)
  Login and Create account
  Rules

-------------------

'/home'(when signed in) => UserHome
  JOIN GAME button =>  links to = "/lobby" -- Lobby
  NEW GAME button  =>  links to = "/:game_id"

-------------------

'/:gameId'  => Game ( GameProvider ( Board ) )
  current props = {user, auth}
  has Sidebar component

---------------------------

'/:gameId' (persistent component) => Sidebar
  Players, Game Status,





-------------------
