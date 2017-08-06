# -*- coding: utf-8 -*-

from rest_framework import routers

from apps.news.views import NewsViewSet

router = routers.DefaultRouter()
router.register('', NewsViewSet, base_name='news')

urlpatterns = []
urlpatterns += router.urls
