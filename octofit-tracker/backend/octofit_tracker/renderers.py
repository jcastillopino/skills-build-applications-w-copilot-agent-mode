from rest_framework.renderers import JSONRenderer
from django.core.serializers.json import DjangoJSONEncoder
from bson import ObjectId
import json

class MongoJSONEncoder(DjangoJSONEncoder):
    """
    JSONEncoder subclass that knows how to encode MongoDB ObjectId and set objects.
    """
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        elif isinstance(obj, set):
            return list(obj)
        return super().default(obj)

class BSONRenderer(JSONRenderer):
    """
    Renderer which handles MongoDB BSON objects, especially ObjectId.
    """
    encoder_class = MongoJSONEncoder
