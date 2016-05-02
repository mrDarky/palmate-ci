from flask_restful import Resource

class Config(Resource):
    def get(self):
        # TODO
        return {'name':'fake', 'maxJobs':42, 'host':'fake', 'port':1337}

