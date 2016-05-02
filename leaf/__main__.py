import yaml
import sys, os
import threading
import time
import common.Logger as Logger
import json
import urllib.request
import urllib.error

from flask import Flask
from flask_restful import Api

import leaf.Info as Info

# Dirty hack
def appThread(app, port):
    app.run(host='0.0.0.0', port=port, threaded=True)
    print('asd')


# TODO: refactor
class LeafService:
    def __init__(self, configRoot=os.path.expanduser('~')):
        self.__configDir = configRoot+'/.leafd/'
        self.__configFname = self.__configDir+'config.yaml'
        self.logger = Logger.Logger('LeafService')
        if not os.path.exists(self.__configDir):
            os.makedirs(self.__configDir)
        try:
            self.__configure()
        except:
            self.logger.error('Failed to configure, aborting')
            sys.exit(1)
        self.service = Flask('Leaf')
        self.api = Api(self.service)

        self.api.add_resource(Info.Config, '/config')
        t = threading.Thread(name='Leaf service', target=appThread, 
                args=(self.service,self.__port))
        t.start()
        time.sleep(1)
        self.__register()
        t.join()

    def __configure(self):
        if not os.path.exists(self.__configDir):
            os.makedirs(self.__configDir)

        config = dict()
        self.logger.info('Configuring from %s' % self.__configFname)
        try:
            with open(self.__configFname, 'r') as f:
                config = yaml.load(f.read())
        except IOError:
            self.logger.error('Failed to configure from %s' % self.__configFname)
            raise Exception

        if not config:
            self.logger.error('Failed to load config from %s' % self.__configFname)
            raise Exception

        if 'port' in config:
            self.__port = config['port']
        else:
            self.__port = 9876 # default port for Leaf service

        # currently, no service discovery is supported
        if 'executor' in config:
            self.__executorHost = config['executor']['host']
            self.__executorPort = config['executor']['port']
        else:
            self.logger.error('No executor service found')
            raise Exception


        self.logger.info('Configuring complete')
        self.logger.info('Going to register on port %d in Executor %s:%d' %
                         (self.__port, self.__executorHost, self.__executorPort))

    def __register(self):
        try:
            url = 'http://'+self.__executorHost+':'+str(self.__executorPort)+'/leaves/register'
            data = urllib.parse.urlencode({'port':self.__port})
            data = data.encode('ascii')
            req = urllib.request.Request(url, data)
            response = urllib.request.urlopen(req)
        except urllib.error.URLError as e:
            self.logger.error('URLError: %s' % e.reason)


if __name__ == "__main__":
    if len(sys.argv) == 2:
        service = LeafService(sys.argv[1])
    else:
        service = LeafService()

