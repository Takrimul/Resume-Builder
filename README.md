## Getting Started

Run backend server:

1. Go to backend folder and create venv if you want.
2. Add database settings in backend/settings.py
3. Check your ipv4 address and add it in settings/allowed_hosts
4. Make sure you are in the backend directory and run bellow commands

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

Now, run the frontend server:

```bash
npm i
npm run dev
```


## Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Video demonstration
[![Watch the video](https://img.youtube.com/vi/1Q1Q1Q1Q1Q1Q/0.jpg)](https://youtu.be/ePz7fBrN4KQ)
