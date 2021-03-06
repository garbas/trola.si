#!/bin/bash
# to install: $ ln -s ../../pre-commit-check.sh .git/hooks/pre-commit

#echo '====== Running tests ========='
#bin/nosetests -s --with-coverage --cover-package=trolasi --cover-tests

echo '====== flake8 ======'
flake8 setup.py
flake8 app.py

echo '====== jshint ======'
jshint app/js

exit 0
