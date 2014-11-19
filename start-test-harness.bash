#!/bin/bash

/bin/rm -f ./test-harness.pid
mvn spring-boot:run &
echo $! > .test-harness.pid
