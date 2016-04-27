from flask import Flask, render_template
app = Flask(__name__)


@app.route('/leaves')
def leaves():
    return render_template('leaves.html')
    
@app.route('/artifacts')
def artifacts():
    return render_template('artifacts.html')

@app.route("/projects")
def projects():
    return render_template('projects.html')
    
@app.route("/")
def main():
    return render_template('projects.html')
    
if __name__ == "__main__":
    app.run()