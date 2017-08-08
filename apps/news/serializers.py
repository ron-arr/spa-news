# -*- coding: utf-8 -*-
from rest_framework import serializers

from apps.news.models import News


class NewsListSerializer(serializers.ModelSerializer):
    """ Сериализатор списка новостей """

    class Meta:
        model = News
        fields = ('id', 'title', 'name', 'slug', 'title', 'date', )


class NewsSerializer(serializers.ModelSerializer):
    """ Сериализатор новостей """

    class Meta:
        model = News
        fields = ('id', 'title', 'name', 'slug', 'title', 'date', 'content',)
