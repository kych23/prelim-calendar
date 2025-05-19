#!/usr/bin/env bash
# Make sure you’ve activated your virtualenv
uvicorn src.backend:app --host 127.0.0.1 --port 8000 --reload
