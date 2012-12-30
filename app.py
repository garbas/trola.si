# -*- coding: utf8 -*-

import os
from pyramid.config import Configurator
from pyramid.static import static_view
from pyramid.scripts import pserve
from cornice import Service

from lpp import LPP_STATIONS


app = static_view(
    os.path.join(os.path.dirname(__file__), 'app'),
    use_subpath=True)

api_items = Service(name='api', path='/api/items')


@api_items.get()
def get_items(request):
    """ """
    return LPP_STATIONS


def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include("cornice")
    config.add_cornice_service(api_items)
    config.add_view(app, route_name='app')
    config.add_route('app', '/*subpath')
    return config.make_wsgi_app()


if __name__ == '__main__':
    pserve.main()
