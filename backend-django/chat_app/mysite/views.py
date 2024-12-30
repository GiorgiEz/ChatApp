from django.http import HttpResponse
import datetime


def home(request):
    now = datetime.datetime.now()
    html = '<html lang="en"><body>Hello, It is now %s.</body></html>' % now
    return HttpResponse(html)
