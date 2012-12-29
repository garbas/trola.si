from setuptools import setup

setup(
    name='trolasi',
    version='0.1',
    description='',
    long_description=open('README.rst').read(),
    keywords="web services",
    author=u'Domen Kozar',
    author_email='domen@dev.si',
    url='http://www.trola.si/',
    include_package_data=True,
    zip_safe=False,
    install_requires=['cornice', 'waitress'],
    entry_points="""\
    [paste.app_factory]
    main = app:main
    """,
)
