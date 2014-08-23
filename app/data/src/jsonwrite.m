function  jsonwrite(s, filename)
%
% File  : jsonwrite.m
% Author: Cagatay Demiralp (cagatay)
% Desc  : Saves a Matlab struct variable in json format.
%
% 	Input  :
%
% 	Output :
%
% 	Example:
%
% Date    : Tue Jul 29 11:43:33 2014
% Modified: $Id$

if (nargin < 2 )
    error('jsonwrite:ArgChk','Insufficient number of input arguments!');
end

if(~isstruct(s))
    error('Cannot save a non-struct variable in json!')
end

fid = fopen(filename, 'w');

jsonify(fid,s);

fclose(fid);

end

function jsonify(fid,s)
if(~isstruct(s))
    jsonprint(fid,s);
    return;
end

fields = fieldnames(s);
n = numel(fields);

    fprintf(fid,'{\n');
    
    for i=1:n
        fprintf(fid,'"%s":',fields{i});
        jsonify(fid, s.(fields{i}));
        if(i < n)
            fprintf(fid,',\n');
        else
            fprintf(fid,'\n}');
        end
    end
    
end


function jsonprint(fid, v)
if(ischar(v))
    fprintf(fid,'"%s"', v);
elseif(isnumeric(v))
    [m,n] = size(v);
    if(m+n == 2)
        fprintf(fid,'%g', v);
    else
        printNumericArray(fid, v);
    end
end
end

function printNumericArray(fid,v)

[m,n] = size(v);

f = ~( m == 1 || n == 1 );
format = ['[' repmat('%g,', [1 n-1]) '%g]'];

if(f)
    fprintf(fid,'[\n');
end

for i=1:m
    fprintf(fid,format,v(i,:));
    if(i < m)
        fprintf(fid,',\n');
    end
    
end

if(f)
    fprintf(fid,'\n]');
end

end

