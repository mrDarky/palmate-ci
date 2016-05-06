from common.Leaf import LeafConfig
import common.Logger as Logger
from flask_restful import Resource, reqparse
from flask import request
import urllib.request
import json

class LeafStorage:
    """ Stores list of leaves and their configuration.

    """

    def __init__(self, leaves):
        """ Initialises storage with leaves array

        """
        self.__leaves = dict()
        self.__currentId = 1
        self.__logger = Logger.Logger('LeafStorage')
        for leaf in leaves:
            self.addLeaf(leaf)

    def getLeaf(self, id):
        return self.__leaves.get(id)

    def addLeaf(self, leaf):
        """ Tries to register new leaf and adds it on successful registering

        """
        registeredLeaf = self.registerLeaf(leaf)
        if registeredLeaf == None:
            self.__logger.error("Failed to register leaf: {}" % leaf)
            raise
        else:
            self.__leaves[self.__currentId] = registeredLeaf
            self.__currentId += 1
            self.__logger.info('Registered new Leaf %r' % registeredLeaf.serialize())

    def numLeaves(self):
        return len(self.__leaves)

    def getLeafIds(self):
        return list(self.__leaves.keys())

    def registerLeaf(self, leaf):
        """ Checks if leaf is not registered yet, retrieves leaf configuration.

        """
        port = int(leaf['port'])
        host = leaf['host']
        for l in self.__leaves:
            if l.host == host and l.port == port:
                return None
        url = 'http://%s:%d/config' % (host, port)
        resp = None
        try:
            resp = urllib.request.urlopen(url)
            resp = json.loads(resp.read().decode('ascii'))
        except urllib.error.URLError as e:
            self.__logger.error('Error getting config for leaf %s:%d' % (host, port))
            return None
        return LeafConfig(name=resp['name'],host=host, port=port, maxJobs=resp['maxJobs'])

storage = LeafStorage([])

class LeafIndex(Resource):
    def get(self):
        return {"leaves":storage.getLeafIds()}

class LeafResource(Resource):
    def get(self, leafId):
        leaf = storage.getLeaf(leafId)
        if leaf == None:
            return {"error": "Leaf with id %d does not exist" % int(leafId)}, 404
        else:
            return leaf.serialize()

class LeafRegister(Resource):
    def __init__(self):
        self.__parser = reqparse.RequestParser()
        self.__parser.add_argument('port',required=True, type=int)

    def post(self):
        args = self.__parser.parse_args()
        try:
            storage.addLeaf({'port':args['port'], 'host':request.remote_addr})
        # TODO: map different exceptions to return codes
        except:
            raise
            return None, 409

