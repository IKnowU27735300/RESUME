@echo off
copy /Y "s:\CLG\Projects\RESUME-main\Certificates\*.png" "s:\CLG\Projects\RESUME-main\public\"
dir "s:\CLG\Projects\RESUME-main\public" > result_certs.txt
