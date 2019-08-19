from datetime import datetime, timedelta, timezone
from django import template

register = template.Library()

def convert_timedelta(duration):
    days, seconds = duration.days, duration.seconds
    hours = days * 24 + seconds // 3600
    minutes = (seconds % 3600) // 60
    seconds = (seconds % 60)
    return hours, minutes, seconds

@register.filter
def calc_spand(date):
    duration = datetime.now(timezone.utc) - date
    hours, minutes, seconds = convert_timedelta(duration)
    if duration.days > 0:
        return '%i일 전' % duration.days
    elif hours > 0:
        return '%i시간 전' % hours
    elif minutes > 0:
        return '%i분 전' % minutes
    else:
        return '%i초 전' % seconds