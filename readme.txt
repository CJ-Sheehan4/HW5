C.J. Sheehan
HW5
note: if you want to test what happens when remaining tiles runs out, you 
can uncomment "import { tiles } from "/graphics_data/test.js";" in myScript.js
and then comment out "import { tiles } from "/graphics_data/tiles.js";".

I believe I was able to achieve most of this assignment. Here is what I 
believe I accomplished:

• create an algorithm to select random letters from the data structure
depending on which were remaining. I used Math.random() for this.

• Letters can be draggable from board to tile and tile to board. 
This dynamically updates the score as well. 

• There is an object I frequently used named ‘board’ that had the 
current key-pair values for which letters were placed on which squares. I used 
this throughout most of the program to accomplish things such as getting 
the ‘word’ to display on the webpage. 

• I have included two bonus squares, being the ‘double word score’ tiles.

• The score always tallies up correctly and dynamically. When moved from 
a regular square to a ‘double word score’ square, the score dynamically 
updates and visa versa. 

• Any number of words can be played. When you have a word and 
click ‘Accept word’ button, the score will be added to the running total 
score, and the score for the current word is set to zero. The tiles are 
removed from the board, and the dock holding the tiles is updated. 
Once All tiles deplete, there is an end of game message with a final 
score displayed. 

• After clicking the ‘accept word’ button, only the number of tiles 
needed, are populated on the dock. The tiles, not used in previous round, 
remain on dock. The new tiles go though the populate function to randomly 
select new tiles depending on which are remaining. 

• Tiles can only be dragged from the board to the rack and from the 
rack to the board. They will bounce back to place otherwise. 

• Tiles can be moved back to rack once they have been on the board. 
The initial instance of the tile is destroyed and a copy is made to put into 
the rack. The score will update dynamically as well. 

• Users can always restart the game. 


Things I wasn’t able to accomplish:
• Except for the first letter, all sub-subsequent letters must be placed 
directly next to or below another letter with no space. Else, they will bounce 
back to the “rack”.

Because I wasn’t able to accomplish this, tiles can be placed anywhere 
on the board, even if they are not side by side. I was able to get it working 
with the first tile placed. Once that was placed, no tiles could be placed 
anywhere except to the left or right of the first tile. But once the second 
tile was placed, I wasn’t able to update it so that the second tile was able 
to have a tile next to it as well. 
