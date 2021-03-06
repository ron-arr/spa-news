from django.conf import settings
from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from apps.news.models import News
from apps.news.serializers import NewsSerializer, NewsListSerializer


class NewsPageNumberPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 100


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    """ Представление новостей """
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    pagination_class = NewsPageNumberPagination
    lookup_field = 'slug'

    @list_route()
    def actual(self, request):
        """ Свежие новости """
        serializer = self.get_serializer(News.objects.actual(), many=True)
        return Response(serializer.data)

    @list_route()
    def archived(self, request):
        """ Новости в архиве """
        page = self.paginate_queryset(News.objects.all())
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @list_route()
    def recent(self, request):
        """ Последние новости """
        serializer = self.get_serializer(
            News.objects.actual()[:settings.RECENT_NEWS_COUNT],
            many=True)
        return Response(serializer.data)

    @list_route()
    def random(self, request):
        """ Случайные новости """
        serializer = self.get_serializer(
            News.objects.random()[:settings.FOOTER_NEWS_COUNT],
            many=True)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            serializer = NewsSerializer
        else:
            serializer = NewsListSerializer
        return serializer
