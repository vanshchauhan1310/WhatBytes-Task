    # gunicorn.conf.py
workers = 2          # adjust for available RAM/CPU
threads = 2
timeout = 120        # increase from default 30s
bind = "0.0.0.0:8000"
