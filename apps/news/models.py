from django.conf import settings
from django.db import models

from apps.utils.dates import days_ago


class NewsManager(models.Manager):
    """ Менеджер новостей """

    def actual(self):
        """ Свежие новости """
        return self.filter(
            date__gt=days_ago(settings.NEWS_FRESHNESS_DAYS)
        )

    def random(self):
        """ Случайные новости """
        return self.actual().order_by('?')


class News(models.Model):
    """ Новости """
    name = models.CharField(
        verbose_name='Название для ссылки',
        max_length=255,
    )
    title = models.CharField(
        verbose_name='Заголовок',
        max_length=255,
    )
    slug = models.SlugField(verbose_name='Короткий URL')
    date = models.DateField(verbose_name='Дата')
    content = models.TextField(
        verbose_name='Содержание',
        blank=True,
    )

    objects = NewsManager()

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'
        ordering = ['-date']

    def __unicode__(self):
        return self.name
