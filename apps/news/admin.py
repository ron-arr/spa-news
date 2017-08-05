from django import forms
from django.contrib import admin
from redactor.widgets import RedactorEditor

from apps.news.models import News


class NewsAdminForm(forms.ModelForm):
    class Meta:
        widgets = {'content': RedactorEditor()}


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    form = NewsAdminForm
    prepopulated_fields = {'slug': ('name',)}
    list_display = ('name', 'slug',)
