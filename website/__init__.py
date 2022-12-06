from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "sundaya2021"

    from .views import views
    from .api.core import api

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(api)

    return app
