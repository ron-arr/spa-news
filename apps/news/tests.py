from datetime import timedelta

from django.conf import settings
from django.test import TestCase
from django.utils.text import slugify
from django.utils.timezone import now

from apps.news.models import News


class NewsTestCase(TestCase):
    def setUp(self):
        news_count = 30
        for i in range(1, news_count + 1):
            name = 'Test name for news #{}'.format(i)
            n = News.objects.create(
                name=name,
                slug=slugify(name),
                title='Test Title For News #{}'.format(i),
                date=now() - timedelta(days=news_count - i),
                content='<h2>Content here</h2>',
            )
            print('{} created'.format(n))

    def test_news_actual(self):
        for n in News.objects.actual():
            self.assertTrue(
                n.date >= now().date() - timedelta(days=settings.NEWS_FRESHNESS_DAYS))
