/*
File: myScript.js
GUI HW5: Create a scrabble game with data structure implementing jquery UI draggable and droppable
Cornelius (C.J.) Sheehan, UMass Lowell Computer Science, cornelius_sheehan@student.uml.edu
Copyright (c) 2022 by C.J. 
All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated on December 21st, 2022 at 10PM

sources:  https://jqueryui.com/droppable/
          https://jqueryui.com/draggable/
          https://www.w3schools.com/
*/
import { tiles } from "/graphics_data/tiles.js";
//import { tiles } from "/graphics_data/test.js";

var points = 0;
var runningTotal = 0;
var reset;
var ranNum;
var lettersOnBoard = [];
var doubleSelected = false;
var twoDoubleSelected = false;
var squarePosition;
var word;
var board = [ ['sq1', []], ['sq2', []], ['sq3', []], ['sq4', []], ['sq5', []], ['sq6', []], ['sq7', []]];
// function to get totalRemaining tiles
var totalRemaining = function(){
  let total = 0;
  for(let i = 0; i < tiles.length; i++){
    total += tiles[i].remaining;
  }
  return total;
}
// function to populate the dock with new pieces
function populate(lettersOnBoard){
  var newIds = [];
  var letters = [];
  doubleSelected = false;
  twoDoubleSelected = false;
  $('#runningtotal').text(runningTotal);
  points = 0;
  $("#points").text(0);
  // new letters needed to put in dock
  let newLettersNeeded = lettersOnBoard.length;  
  // if there are letters on the board, get their ID's, store in newIds array
  // otherwise, give the id's 1-7
  if(lettersOnBoard.length > 0){    
    for(let x = 0; x < lettersOnBoard.length; x++){
      newIds.push(lettersOnBoard[x].id.slice(3));      
    }
  }
  else{
    newLettersNeeded = 7;
    newIds = [1,2,3,4,5,6,7];
  }
  lettersOnBoard = [];
  // loop to get new tiles, amount depending on how many are needed
  for(let i = 0; i < newLettersNeeded; i++){
    ranNum = Math.floor(Math.random() * 27);
    if(tiles[ranNum].remaining == 0){
      while(tiles[ranNum].remaining <= 0){
        ranNum = Math.floor(Math.random() * 27);
      }
      // updates the tiles.js file and stores new letters in letters array
      letters[i] = tiles[ranNum];
      tiles[ranNum].remaining -= 1;
    }
    else{
      letters[i] = tiles[ranNum];
      tiles[ranNum].remaining -= 1;
    }
  }
  // populates the dock with the new tiles
  for(let i = 0; i < newLettersNeeded; i++){  
    $('#dockDiv').append("<img id='ltr" + newIds[i] + "' class='letter' src='graphics_data/" + letters[i].img + "'></img>");
  }
  $('#tr').text(totalRemaining());
  // sets new tiles to be draggables
  $(".letter").draggable({
    containment: "document",
    revert: "invalid",
    revertDuration: 200,
    zIndex: 1,
    opacity: 0.75  
  });
  lettersOnBoard = []; 
}
// call to initially populate the dock with letters
populate(lettersOnBoard);
// instantiate the draggables to have the class of letters
$(".letter").draggable({
  containment: "document",
  revert: "invalid",
  revertDuration: 200,
  zIndex: 1,
  opacity: 0.75  
});
// I dont think I ended up using this but I'm afraid to delete it
$(".inPlace").draggable({
  containment: "document",
  revert: "invalid",
  revertDuration: 200,
  zIndex: 1,
  opacity: 0.75
});
// droppabe for the dock that holds the tiles
$("#dockDiv").droppable({
  accept: ".letter",
  drop: function(e, ui){            
    var curValue;
    // updates the key pair values with tiles paired with the square its on
    board.find(function(tile){
      if(ui.draggable[0] == tile[1]){        
        tile[1] = [];
        let tempSqId = tile[0];
        $('#' + tempSqId).droppable('enable');

      }
    });    
    // find current tile in the tiles.js
    var curTile = tiles.find(function(tile){      
      if((tile.img == ui.draggable[0].src.slice(36)) && tile.onboard == true){             
        curValue = tile.value;      
        if(doubleSelected == true && twoDoubleSelected == false){          
          doubleSelected = false;          
        }
        else if(doubleSelected == true && twoDoubleSelected == true){        
          twoDoubleSelected = false;          
        }
        points = points - curValue;                   
        tile.onboard = false; 
        return true;
      }      
    });    
    // when tile wasn't found in tiles.js
    if(curTile != undefined){
      $("#points").text(points);      
    }
    if(board[1][1].length != 0 && board[5][1].length == 0){
      $("#points").text(points*2);
      
    }
    else if(board[1][1].length == 0 && board[5][1].length != 0){
      $("#points").text(points*2);
    }
    else if(board[1][1].length != 0 && board[5][1].length != 0){
      $("#points").text(points*4);
    }
    // img source for the current tile   
    var newSrc = ui.draggable[0].src;
    //creating new img element which is copy of tile  
    var newE = $("<img src='" + newSrc + "'/>");     
    $(newE).addClass("letter");
    $(newE).attr('id', ui.draggable[0].id);
    $(newE).draggable({
      containment: "document",
      revert: "invalid",
      revertDuration: 200,
      zIndex: 1,
    });
    // add new element into the tile dock
    $("#dockDiv").append(newE);
    var dockElements = [];
    // updates the lettersOnBoard if one was placed back into dock
    for(let i = 0; i < lettersOnBoard.length; i++){
      if((ui.draggable[0].id != lettersOnBoard[i].id)){       
        dockElements.push(lettersOnBoard[i]);
        
      }
    }    
    lettersOnBoard = dockElements;   
    var dockElements = [];
    // removed original element, since the copy is placed back    
    $(ui.draggable[0]).draggable("destroy");
    $(ui.draggable[0]).remove(); 
  }
});
// droppable for the board with each square having the 'board' class
$(".board").droppable({
  accept: ".letter",
  disabled: false,
  drop: function(e, ui){    
    // resets the game
    if(reset){
      lettersOnBoard = [];
      reset = false;
    }  
     // lettersOnBoard holds an array of all the current letters placed on the board
    lettersOnBoard.push(ui.draggable[0]);  
    // updates board
    board.find(function(sq){
      if(e.target.id == sq[0]){        
        sq[1] = ui.draggable[0];
      }
    });
    // get position of square that tile will be placed on
    squarePosition = $(this).position();    
    $(ui.draggable[0]).css({
      'left': squarePosition.left + 'px',
      'top' : squarePosition.top + 'px',      
      'position' : 'absolute'      
    }); 
    // finds current tile in the tiles.js
    var curTile = tiles.find(function(tile){          
      if(tile.img == ui.draggable[0].src.slice(36)){      
        var className = $(e.target).attr('class');           
        if(className.includes(' double ') && doubleSelected == false && twoDoubleSelected == false){
          doubleSelected = true;      
        }
        else if(className.includes(' double ') && doubleSelected == true && twoDoubleSelected == false){        
          twoDoubleSelected = true;            
        }
        var count = 0;
        for(let i = 0; i < board.length; i++){          
          if(board[i][1].id == ui.draggable[0].id){
            count++;
          }
        }
        
        // updates board when tile is moved from one sq to another sq
        // the nested if statements are to set or unset the bool as to how many double word squares are selected
        if(count > 1){          
          for(let i = 0; i < board.length; i++){
            if(board[i][1].id == ui.draggable[0].id && e.target.id != board[i][0]){
              lettersOnBoard.pop();             
              let tempSqId = board[i][0];
              $('#' + tempSqId).droppable('enable');     
              board[i][1] = [];
              points = points - tile.value; 
              if(board[i][0] == 'sq2' && twoDoubleSelected == false){               
                doubleSelected = false;
              }
              else if(board[i][0] == 'sq6' && twoDoubleSelected == false){                               
                doubleSelected = false;
              }
              if(board[i][0] == 'sq2' && twoDoubleSelected == true){
                twoDoubleSelected = false;
              }
              if(board[i][0] == 'sq6' && twoDoubleSelected == true){
                twoDoubleSelected = false;
              }
              if(board[i][0] == 'sq6' && e.target.id == 'sq2'){                                
                twoDoubleSelected = false;
              }
              if(board[i][0] == 'sq2' && e.target.id == 'sq6'){               
                twoDoubleSelected = false;
              }             
            }
          }
        }       
        points = points + tile.value;           
        return true;
      }          
    });   
    // curTile has the corresponding obj in the tiles.js
    curTile.onboard = true;    
    // double or quadruple the poitns depending on how many double squares are active
    if(doubleSelected){
      $("#points").text(points*2);
      if(twoDoubleSelected){
        $("#points").text(points*4);
      }
    }    
    else{
      $("#points").text(points);
    }    
    $(ui.draggable[0]).css('padding-left', '0px');  
    $(e.target).droppable("option", "disabled", true);  
    word = [];
    // this for-loop getting the word to put onto the webpage to see the current word you have
    for(let i = 0; i < board.length; i++){
      var temp = tiles.find(function(tile){
        if(board[i][1].src != undefined){
          if(tile.img == board[i][1].src.slice(36)){                    
            return true;            
          }        
        }              
      });
      if(temp != undefined){
        word.push(String(temp.letter));    
      }    
    }
    var newWord = "";
    for(let i = 0; i < word.length; i++){
      newWord += word[i];
    }
    console.log(newWord);
    $('#word').text(newWord);   
  }
});
// when you click the 'Accept word' button to move onto next word and tally points
$("#acceptWord").on("click", function(){ 
  var lettersOnBoardCount = 0;
  $('#word').text('');
  for(let i = 0; i < lettersOnBoard.length; i++){    
    lettersOnBoardCount++;
    lettersOnBoard[i].remove();
  }
  //enable all the squares
  $("#sq1").droppable("enable");
  $("#sq2").droppable("enable");
  $("#sq3").droppable("enable");
  $("#sq4").droppable("enable");
  $("#sq5").droppable("enable");
  $("#sq6").droppable("enable");
  $("#sq7").droppable("enable");
  let boardCount = 0;
  for(let i = 0; i < board.length; i++){
    if(board[i][1].length != 0){
      boardCount++;
    }    
  }
  // alorithm for when its towards the end of game and there are no tiles left
  if(boardCount > 0){
    $('#tr').text(totalRemaining());
    reset = true;
    //set board to zero
    for(let i = 0; i < board.length; i++){
      board[i][1] = [];
    }  
    runningTotal += parseInt($('#points').text());      
    if((totalRemaining()-lettersOnBoardCount) >= 0){
      populate(lettersOnBoard);
    }
    else{
      let dockElements = $('#dockDiv').children();      
      if(dockElements.length <= 0){
        $('#gameOverp').html("GAME OVER - Final Score: <span>" + runningTotal + "</span>");
        
      }
      else{
        if(totalRemaining() <= 0){          
          $('#runningtotal').text(runningTotal);
          points = 0;
          $("#points").text(0);
        }
        else{
          for(let i = 1; i < totalRemaining(); i++){
            lettersOnBoard.pop();
          }         
          populate(lettersOnBoard);
        }
      }        
    }
  }
});
// when you click the reset button
$("#restartBtn").on("click", function(){     
  runningTotal = 0;  
  points = 0;
  $('#word').text('');
  // set the data structure back to normal
  tiles[0].remaining = 9;
  tiles[1].remaining = 2;
  tiles[2].remaining = 2;
  tiles[3].remaining = 4;
  tiles[4].remaining = 12;
  tiles[5].remaining = 2;
  tiles[6].remaining = 3;
  tiles[7].remaining = 2;
  tiles[8].remaining = 9;
  tiles[9].remaining = 1;
  tiles[10].remaining = 1;
  tiles[11].remaining = 4;
  tiles[12].remaining = 2;
  tiles[13].remaining = 6;
  tiles[14].remaining = 8;
  tiles[15].remaining = 2;
  tiles[16].remaining = 1;
  tiles[17].remaining = 6;
  tiles[18].remaining = 4;
  tiles[19].remaining = 6;
  tiles[20].remaining = 4;
  tiles[21].remaining = 2;
  tiles[22].remaining = 2;
  tiles[23].remaining = 1;
  tiles[24].remaining = 2;
  tiles[25].remaining = 1;
  tiles[26].remaining = 2;
  for(let i = 0; i < tiles.length; i++){
    tiles[i].onboard = false;
  }
  // destroy all draggables currently on the board
  $("#ltr1").draggable("destroy");
  $("#ltr2").draggable("destroy");
  $("#ltr3").draggable("destroy");
  $("#ltr4").draggable("destroy");
  $("#ltr5").draggable("destroy");
  $("#ltr6").draggable("destroy");
  $("#ltr7").draggable("destroy");
  $("#ltr1").remove();
  $("#ltr2").remove();
  $("#ltr3").remove();
  $("#ltr4").remove();
  $("#ltr5").remove();
  $("#ltr6").remove();
  $("#ltr7").remove(); 
  $("#sq1").droppable("enable");
  $("#sq2").droppable("enable");
  $("#sq3").droppable("enable");
  $("#sq4").droppable("enable");
  $("#sq5").droppable("enable");
  $("#sq6").droppable("enable");
  $("#sq7").droppable("enable");
  lettersOnBoard = [];
  for(let i = 0; i < board.length; i++){
    if(board[i][1].length != 0){
      board[i][1] = [];
    }
  }
  $('#gameOverp').html("");  
  populate(lettersOnBoard);
});
