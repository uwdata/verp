function  [xy, verp] = simtrackpts(imfile)
%
%
% File  : simtrackpts.m
% Author: Cagatay Demiralp (cagatay)
% Desc  : Specify 'eye tracking' points on a given image. 
%
% 	Input  :
%
% 	Output :
%
% 	Example: 
%
% Date    : Mon Aug 18 11:26:25 2014
% Modified: $Id$
%
%
if (nargin < 1) 
  error('simtrackpts:ArgChk','Insufficient number of input arguments!');
end

h = imshow(imfile);
[x,y] = getpts(gcf);
n = size(x,1); 
time = (0:n-1)';
frame = zeros(n,1); 
xy = [time x y frame]; 
s.eye = xy; 
jsonwrite('testverp.json', s); 


