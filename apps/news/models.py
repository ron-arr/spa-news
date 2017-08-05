from django.db import models


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

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'

    def __unicode__(self):
        return self.name
