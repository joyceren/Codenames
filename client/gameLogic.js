//Making the board happens how?

/*
Current Issues with the legend at the moment are that we can't get the board in a random order right now
We need to assign colors randomly, and the words randomly as well.
colors? = no    words? = yes

//Assigning users to roles = player/spy or spymaster


//Who should go first? 
	That is decided by the number of red or blue cards in the legend. 
	If the number of red cards is equal to 9 then redTeam is first, and vise versa - ternary

//Allow the spymaster for the first team (isSpyMaster && team = currentTeam) to go
	Should allow spymaster to input a clue, and submit it
	Should allow spymaster to input a number, and submit it
	Once Submitted, the spymaster button should deactivate, 
	Spy Masters team should be allowed to go
		FUN!
			make a history component, so that people can see the previous clues they were given?

//Allow the spy/spies from the right team (isSpy && team = currentTeam) to go 
	Should allow the spy to choose a card
	Should be allowed to choose the number of cards that the spymaster specifies
		Should I try to allow the numbers to stack up? 
	If the number of guesses they have is > 0 and the cards they pick are == their team color
	allow them to continue, else change turn 

	Also:
		If they choose a card, that should decrease 1 from the cards remaining depending
			on the color of the card, indiscriminate to whose turn it is.
		And also should decrease the number of turns they can take by one


	//changeTurn or end Turn
		if currentplayer is spy && team == blue ? red : blue and set currentplayer to spymaster
		else change turn to spy ad dont change teams
		if currentplayer is spy && color = black, end game and team of current player loses







//Overarching User Experience: LOL unneccessary bullshit

	Should allow for two computers to be enough - this can be done by disabling the onClicks 
	for the spymaster and spy, and simply saying whose turn it is? 
	And whoever touches it, well...its touched? 

	Should scale to size well -IDC -NOT NOW


//







*/
