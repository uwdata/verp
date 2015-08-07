The VERP Explorer 
=================

The VERP (Visualization of Eye movements with Recurrence Plots) Explorer is a visual
analysis tool for exploring eye movements during visual-cognitive tasks. The 
VERP Explorer couples several spatial visualizations of eye movements with recurrence 
plots that reveal patterns of revisitation over time. 

Until we prepare a proper documentation, please refer to this [draft](http://www.cs.stanford.edu/~cagatay/projects/verp/draft.pdf) for more details.  

## Run 
+ The VERP Explorer is a web application. You can run a deployed copy from [here](http://www.cs.stanford.edu/~cagatay/projects/verp/) 
  * Two synthetic datasets, [data/lorenz](data/lorenz) and [data/sin](data/sin), in the repo should 
    help you jump start.  Also, check out this short [video](http://www.cs.stanford.edu/~cagatay/projects/verp/lorenz.mov).

+ The VERP Explorer is research prototype and only tested on Chrome.    

## Build & Develop 

+ Get a local copy of the repo either by using `git clone`
  or downloading the zipped folder.

+ In order to build the VERP Explorer you need to have  
  * [node.js](nodejs.org) and [bower](bower.io) installed.  

+ Once you have the above, you can build the VERP Explorer by running :  
  * `npm install` 
  * `bower install`

+ Run `grunt serve` for preview. 

