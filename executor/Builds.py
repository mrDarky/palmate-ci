from flask_restful import Resource, reqparse
import pymongo as mongo

class BuildDTO:
    def __init__(self, timestamp, projectId, leafId, artifactId):
        self.timestamp = timestamp
        self.projectId = projectId
        self.leafId = leafId
        self.artifactId = artifactId

    def serialize(self):
        return {
            "timestamp":self.timestamp,
            "leafId":self.leafId,
            "artifactId":self.artifactId
        }

class BuildDAO:
    def __init__(self, mongoDb):
        self.__builds = dict()
        self.__currentId = 1
        self.__mongoCollection = mongoDb['builds']
        self.__numRecentBuilds = 20

    def addBuild(self, build):
        if self.checkBuild(build):
            # TODO: add MongoDB autoincrementing field
            build['buildId'] = self.__currentId
            self.__currentId+=1
            self.__mongoCollection.insert_one(build)

    def getBuildIds(self):
        return self.__mongoCollection.distinct("buildId")

    def getBuild(self, buildId):
        ret = list(self.__mongoCollection.find({'buildId':buildId}))
        for r in ret:
            del r['_id']
        return ret

    def getBuildByProject(self, projectId):
        ret = list(self.__mongoCollection.find({'projectId':projectId}))
        for r in ret:
            del r['_id']
        return ret

    def getRecentBuilds(self, projectId=-1):
        cursor = None
        if projectId == -1:
            cursor = self.__mongoCollection.find().limit(self.__numRecentBuilds)
        else:
            cursor = self.__mongoCollection.find({'projectId':projectId}).limit(self.__numRecentBuilds)
        ret = list(cursor.sort([('timestamp', mongo.DESCENDING)]))
        for r in ret:
            del r['_id']
        return ret

    def checkBuild(self, build):
        # TODO
        return True

storage = None

class BuildIndex(Resource):
    def __init__(self):
        self.__parser = reqparse.RequestParser()
        self.__parser.add_argument('projectId',required=True, type=int)

    def get(self):
        args = self.__parser.parse_args()
        ids = storage.getBuildByProject(args['projectId'])
        return {"builds":ids}

class BuildRecentIndex(Resource):
    def __init__(self):
        self.__parser = reqparse.RequestParser()
        self.__parser.add_argument('projectId',required=False, type=int)

    def get(self):
        args = self.__parser.parse_args()
        if args['projectId'] is not None:
            return storage.getRecentBuilds(args['projectId'])
        else:
            return storage.getRecentBuilds()

class BuildResource(Resource):
    def get(self, buildId):
        build = storage.getBuild(buildId)
        if build is not None:
            return build.serialize()
        else:
            return {"error":"Build with id %d does not exist" %buildId}, 404

