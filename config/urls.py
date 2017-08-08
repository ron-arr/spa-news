from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView

api = [
    url(r'^news/', include('apps.news.urls')),
]

main = [
    url(r'^admin/', admin.site.urls),
    url(r'^redactor/', include('redactor.urls')),
    url(r'^', TemplateView.as_view(template_name='base.html'), name='index')
]

urlpatterns = [
    url(r'^api/', include(api)),
    url(r'^', include(main)),
]
