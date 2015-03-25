#!/usr/bin/env bash
#
# File  : pair.sh
# Author: Cagatay Demiralp (cagatay)
# Desc  : 
#
#
# Date  : Thu Mar 19 04:24:36 2015
#

P="01 02 03 04 05 06 07 08 09 10 11 12"

imgdir=images

let cnt=0

for p in $P
do
	cd p$p;

	idf=`ls *.idf`

	for f in $idf 
	do

		ext="${f##*.}"
		name="${f%.*}"

		echo $name

		img=../$imgdir/$name.png 

		if [ ! -f $img ]; then
			echo "$img not found!" 
			cnt=cnt+1
	  else 
			if [ ! -d $name ]; then 
				mkdir $name 
			fi
			mv $f $name/ 
			cp $img $name/ 
		fi

	done

	cd ..;

done

echo $cnt
