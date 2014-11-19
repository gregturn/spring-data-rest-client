#!/bin/bash

kill -9 $(cat .test-harness.pid)
/bin/rm -f .test-harness.pid
