#!/usr/bin/env bash
#
# File  : chopall.sh
# Author: Cagatay Demiralp (cagatay)
# Desc  : 
#
#
# Date  : Tue Mar 17 13:00:12 2015
#

P="01 02 04 05 06 07 08 09 10 11 12"
chopper=chopper/bin/chopper
for p in $P
do
	#$chopper P$p"-eye_data Samples.txt" p$p/
	echo "$chopper P$p-eye_data Samples.txt p$p/" 
done
