from flask import Blueprint

shop = Blueprint('shop', __name__, template_folder='social_templates')


from . import routes