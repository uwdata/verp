
f = 'cos'; 
fn = @cos; 
n = 300; 

x = 1:n; y = round((100*fn(0.085*(x)))+100);

plot(x,y); 
 a = 200*ones(300,300);
for i = 1:300
a(y(i)+50,x(i))= 0;
end
figure; 

imagesc(a); 
colormap(gray); 

% save 
pos =  [x' y'+50];
value = y; 
frmid = zeros(1,n);
time = (0:n-1); 

s = struct('pos', pos, 'value', value, 'time', time, 'frmid', frmid);

jsonwrite(s, ['../' f '.json']); 
imwrite(a, ['../' f '.scn/frm-0.png'], 'png');