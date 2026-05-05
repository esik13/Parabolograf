from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/graph')
def graph():
    return render_template('graph.html')

@app.route('/theory')
def theory():
    return render_template('theory.html')

@app.route('/formulas')
def formulas():
    return render_template('formulas.html')

@app.route('/practice')
def practice():
    return render_template('practice.html')

@app.route('/interesting')
def interesting():
    return render_template('interesting.html')

@app.route('/robots.txt')
def robots():
    return send_from_directory('static', 'robots.txt')

@app.route('/sitemap.xml')
def sitemap():
    return send_from_directory('static', 'sitemap.xml')

if __name__ == '__main__':
    app.run(debug=True)