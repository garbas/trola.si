import os
from pyramid.config import Configurator
from pyramid.static import static_view
from pyramid.scripts import pserve
from cornice import Service


app = static_view(
    os.path.join(os.path.dirname(__file__), 'app'),
    use_subpath=True)

api = Service(
    name='api',
    path='/api')


@api.get()
def get_info(request):
    """Returns Hello in JSON."""
    return {'Hello': 'World'}


def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include("cornice")
    config.add_route('api', '/api')
    config.add_route('app', '/*subpath')
    config.add_cornice_service(api)
    return config.make_wsgi_app()


if __name__ == '__main__':
    pserve.main()
