/*
File: test.js
This file is to test what happens at the end of a game with little tiles remaining
Cornelius (C.J.) Sheehan, UMass Lowell Computer Science, cornelius_sheehan@student.uml.edu
Copyright (c) 2022 by C.J. 
All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated on December 21st, 2022 at 10PM

sources:  https://jqueryui.com/droppable/
          https://jqueryui.com/draggable/
          https://www.w3schools.com/
*/
export var tiles = [
{ "letter" : "A", value : 1,  "remaining" : 1 , "img" : "Scrabble_Tile_A.jpg", onboard : false } ,
{ "letter" : "B", value : 3,  "remaining" : 1 , "img" : "Scrabble_Tile_B.jpg", onboard : false } ,
{ "letter" : "C", value : 3,  "remaining" : 1 , "img" : "Scrabble_Tile_C.jpg", onboard : false } ,
{ "letter" : "D", value : 2,  "remaining" : 1 , "img" : "Scrabble_Tile_D.jpg", onboard : false } ,
{ "letter" : "E", value : 1,  "remaining" : 1, "img" : "Scrabble_Tile_E.jpg", onboard : false } ,
{ "letter" : "F", value : 4,  "remaining" : 1 , "img" : "Scrabble_Tile_F.jpg", onboard : false } ,
{ "letter" : "G", value : 2,  "remaining" : 1 , "img" : "Scrabble_Tile_G.jpg", onboard : false } ,
{ "letter" : "H", value : 4,  "remaining" : 1 , "img" : "Scrabble_Tile_H.jpg", onboard : false } ,
{ "letter" : "I", value : 1,  "remaining" : 1 , "img" : "Scrabble_Tile_I.jpg", onboard : false } ,
{ "letter" : "J", value : 8,  "remaining" : 0 , "img" : "Scrabble_Tile_J.jpg", onboard : false } ,
{ "letter" : "K", value : 5,  "remaining" : 0 , "img" : "Scrabble_Tile_K.jpg", onboard : false } ,
{ "letter" : "L", value : 1,  "remaining" : 0 , "img" : "Scrabble_Tile_L.jpg", onboard : false } ,
{ "letter" : "M", value : 3,  "remaining" : 0 , "img" : "Scrabble_Tile_M.jpg", onboard : false } ,
{ "letter" : "N", value : 1,  "remaining" : 0 , "img" : "Scrabble_Tile_N.jpg", onboard : false } ,
{ "letter" : "O", value : 1,  "remaining" : 0 , "img" : "Scrabble_Tile_O.jpg", onboard : false } ,
{ "letter" : "P", value : 3,  "remaining" : 0 , "img" : "Scrabble_Tile_P.jpg", onboard : false } ,
{ "letter" : "Q", value : 10, "remaining" : 0 , "img" : "Scrabble_Tile_Q.jpg", onboard : false } ,
{ "letter" : "R", value : 1,  "remaining" : 0 , "img" : "Scrabble_Tile_R.jpg", onboard : false } ,
{ "letter" : "S", value : 1,  "remaining" : 0 , "img" : "Scrabble_Tile_S.jpg", onboard : false } ,
{ "letter" : "T", value : 1,  "remaining" : 0 , "img" : "Scrabble_Tile_T.jpg", onboard : false } ,
{ "letter" : "U", value : 1,  "remaining" : 0 , "img" : "Scrabble_Tile_U.jpg", onboard : false } ,
{ "letter" : "V", value : 4,  "remaining" : 0 , "img" : "Scrabble_Tile_V.jpg", onboard : false } ,
{ "letter" : "W", value : 4,  "remaining" : 0 , "img" : "Scrabble_Tile_W.jpg", onboard : false } ,
{ "letter" : "X", value : 8,  "remaining" : 0 , "img" : "Scrabble_Tile_X.jpg", onboard : false } ,
{ "letter" : "Y", value : 4,  "remaining" : 0 , "img" : "Scrabble_Tile_Y.jpg", onboard : false } ,
{ "letter" : "Z", value : 10, "remaining" : 0 , "img" : "Scrabble_Tile_Z.jpg", onboard : false } ,
{ "letter" : "_", value : 0,  "remaining" : 0 , "img" : "Scrabble_Tile_Blank.jpg", onboard : false } ];
