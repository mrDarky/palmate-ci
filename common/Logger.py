import logging
import colorlog

class Logger:
    def __init__(self, name='', fname='', level='INFO'):
        if fname:
            try:
                self.fout = open(fname, 'w')
            except IOError:
                print('[ERROR] Failed to open %s for writing'%fname)
                self.fout = None
        else:
            self.fout = None

        self.logger = logging.getLogger(name)
        self.handler = colorlog.StreamHandler()
        self.handler.setFormatter(colorlog.ColoredFormatter(
                '%(log_color)s%(asctime)s %(levelname)s:%(name)s:%(message)s%(reset)s',
                log_colors={
                    'INFO': 'green',
                    'WARNING': 'yellow',
                    'ERROR': 'red'
                    }))
        self.logger.addHandler(self.handler)
        self.setLevel(level)

    def setLevel(self, level):
        if level == 'INFO':
            self.logger.setLevel(logging.INFO)
        elif level == 'WARNING':
            self.logger.setLevel(logging.WARNING)
        elif level == 'ERROR':
            self.logger.setLevel(logging.ERROR)

    def info(self, message):
        self.logger.info(message)
        if self.fout is not None:
            self.fout.println('[INFO] %s' % message)

    def warn(self, message):
        self.logger.warning(message)
        if self.fout is not None:
            self.fout.println('[WARNING] %s' % message)

    def error(self, message):
        self.logger.error(message)
        if self.fout is not None:
            self.fout.println('[ERROR] %s' % message)

