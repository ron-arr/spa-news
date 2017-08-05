# -*- coding: utf-8 -*-
from rest_framework import serializers

from apps.news.models import News


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ('title', 'name', 'slug', 'title',)
