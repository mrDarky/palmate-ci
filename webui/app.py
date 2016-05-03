from flask import Flask, render_template
app = Flask(__name__)
app.debug = True

@app.route("/projects", methods=['POST'])
def projects():
    return render_template('projects.html')
    
@app.route('/leaves', methods=['POST'])
def leaves():
    return render_template('leaves.html')
    
@app.route('/builds', methods = ['POST'])
def builds():
    return render_template('builds.html')
  
@app.route("/")
def main():
    return render_template('index.html')
  
if __name__ == "__main__":
    app.run()