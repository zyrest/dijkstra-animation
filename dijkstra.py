from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/advanced')
def advanced():
    return render_template('advanced.html')


@app.route('/advanced')
def algorithm():
    return render_template('algorithm.html')


@app.route('/advanced')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
